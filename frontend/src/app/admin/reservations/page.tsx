"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/ConfirmationModal"; // Asegúrate de tener el modal implementado

interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
}

interface Table {
    id: number;
    tableNumber: string;
    seats: number;
}

interface Reservation {
    id: number;
    reservationDate: string;
    status: string;
    user: User;
    table: Table;
}

const AdminReservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false); // Control del modal
    const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null); // Reserva seleccionada
    const router = useRouter();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get("/reservations");
                setReservations(response.data);
            } catch (err:any) {
                toast.error(`${err.response.statusText}: ${err.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                setError("Problem fetching reservations.");
            }
        };
        fetchReservations();
    }, []);

    const handleDeleteClick = (id: number) => {
        setSelectedReservationId(id);
        setModalOpen(true); // Abrir modal
    };

    const handleConfirmDelete = async () => {
        if (selectedReservationId === null) return;

        const token = localStorage.getItem("token");
        try {
            const response = await api.delete(`/reservations/${selectedReservationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success(`Reserva eliminada con éxito!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                setReservations(reservations.filter((reservation) => reservation.id !== selectedReservationId));
            }
        } catch (err: any) {
            toast.error(`Error eliminando reserva: ${err.response.statusText}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setError("Error eliminando reserva.");
        } finally {
            setModalOpen(false); // Cerrar modal
            setSelectedReservationId(null);
        }
    };

    const editReservation = (id: number) => {
        router.push(`/admin/reservations/${id}/edit`);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {reservations.length === 0 ? (
                <p className="text-2xl font-bold mb-4 text-center">
                    No reservations found.
                </p>
            ) : (
            <div className="p-6 min-h-90 text-black">
                <h1 className="text-2xl font-semibold text-start">Panel de Reservas</h1>
                <div className="mb-6 mt-4 flex justify-between items-center">
                    <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-md ">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => router.push("/reservations/create")}>
                            Crear Reserva
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                        <span className="text-lg font-medium text-black">Reservas Totales: </span>
                        <span className="text-xl font-semibold text-black">{reservations.length}</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-black">Últimas 10 Reservas</h3>
                    <p className="text-gray-500 mb-4">A continuación se muestran las últimas 10 reservas realizadas en el sistema.</p>
                    <div className="overflow-x-auto  min-h-64">
                        <table className="w-5/7 bg-gray-800 shadow-md rounded-lg overflow-hidden">
                            <thead className="text-white">
                                <tr>
                                    <th className="py-2 px-4 text-left">User</th>
                                    <th className="py-2 px-4 text-left">Reservation Date</th>
                                    <th className="py-2 px-4 text-left">Status</th>
                                    <th className="py-2 px-4 text-left">Table Number</th>
                                    <th className="py-2 px-4 text-left">Seats</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => (
                                    <tr
                                        key={reservation.id}
                                        className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                                    >
                                        <td className="py-2 px-4 text-gray-800">
                                            {reservation.user.username}
                                        </td>
                                        <td className="py-2 px-4 text-gray-800">
                                            {new Date(reservation.reservationDate).toLocaleString()}
                                        </td>
                                        <td className="py-2 px-4 text-gray-800">
                                            {reservation.status}
                                        </td>
                                        <td className="py-2 px-4 text-gray-800">
                                            {reservation.table.tableNumber}
                                        </td>
                                        <td className="py-2 px-4 text-gray-800">
                                            {reservation.table.seats}
                                        </td>
                                        <td className="py-2 px-4 flex gap-2">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                                onClick={() => editReservation(reservation.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                                onClick={() => handleDeleteClick(reservation.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
              </div>
            </div>
            )}

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
