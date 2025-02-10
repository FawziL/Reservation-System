"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useAuth } from "@/hooks/AuthContext";
import { toast } from "react-toastify";
import ReservationTable from "@/components/ReservationsTable";
import { Reservation } from "@/types/reservation";
import { useRouter } from "next/navigation";

const ReservationDashboard = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchReservations = async () => {
            if (user?.userID) {
                const token = localStorage.getItem("token");
                try {
                    const response = await api.get(`/reservations/${user.userID}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setReservations(Array.isArray(response.data) ? response.data : [response.data]);
                } catch (err: any) {
                    toast.error(`${err.response?.statusText}: ${err.message}`, { position: "top-right", autoClose: 3000 });
                }
            }
        };
        fetchReservations();
    }, [user?.userID]);

    return (
        <div className="p-6 min-h-90 text-black">
            <h1 className="text-2xl font-semibold text-start">Panel de Reservas</h1>
            <div className="mb-6 mt-4 flex justify-between items-center">
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" 
                        onClick={() => router.push("/reservations/create")}>
                        Crear Reserva
                    </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <span className="text-lg font-medium text-black">Reservas Totales: {reservations.length}</span>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-black">Últimas 10 Reservas</h3>
                <p className="text-gray-500 mb-4">A continuación se muestran las últimas 10 reservas realizadas en el sistema.</p>
                <div className="overflow-x-auto  min-h-64">
                    <ReservationTable reservations={reservations} />
                </div>
          </div>
        </div>
    );
};

export default ReservationDashboard;
