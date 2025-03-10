"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ReservationTable from "@/components/ReservationsTable";
import ConfirmModal from "@/components/ConfirmationModal"; 
import { Reservation } from "@/types/reservation";

const AdminReservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get("/reservations");
                setReservations(response.data);
            } catch (err: any) {
                toast.error(`${err.response.statusText}: ${err.message}`, { position: "top-right", autoClose: 3000 });
            }
        };
        fetchReservations();
    }, []);

    const handleDeleteClick = (id: number) => {
        setSelectedReservationId(id);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedReservationId === null) return;

        try {
            const response = await api.delete(`/reservations/${selectedReservationId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (response.status === 200) {
                toast.success(`Reserva eliminada con éxito!`, { position: "top-right", autoClose: 3000 });
                setReservations(reservations.filter((res) => res.id !== selectedReservationId));
            }
        } catch (err: any) {
            toast.error(`Error eliminando reserva: ${err.response.statusText}`, { position: "top-right", autoClose: 3000 });
        } finally {
            setModalOpen(false);
            setSelectedReservationId(null);
        }
    };

    return (
        <>
            <div className="reserv">
                <h1 className="text-2xl font-semibold text-start">Panel de Reservas</h1>
                <div className="mb-6 mt-4 flex justify-between items-center">
                    <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-md">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                            onClick={() => router.push("/reservations/create")}>
                            Crear Reserva
                        </button>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-md flex items-center justify-between">
                        <span className="text-lg font-medium text-black">Reservas Totales: {reservations.length}</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-black">Últimas 10 Reservas</h3>
                    <p className="text-gray-500 mb-4">A continuación se muestran las últimas 10 reservas realizadas en el sistema.</p>
                    <div className="overflow-x-auto  min-h-64">
                        <ReservationTable reservations={reservations} isAdmin onDelete={handleDeleteClick} onEdit={(id) => router.push(`/admin/reservations/${id}/edit`)} />
                    </div>
                </div>
            </div>
            
            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this reservation? This action cannot be undone."
            />
        </>
    );
};

export default AdminReservations;
