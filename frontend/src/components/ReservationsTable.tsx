"use client";
import { Reservation } from "@/types/reservation"; // Asegúrate de definir estos tipos en un archivo compartido
import { useRouter } from "next/navigation";

interface ReservationTableProps {
    reservations: Reservation[];
    isAdmin?: boolean;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, isAdmin = false, onDelete, onEdit }) => {
    const router = useRouter();

    return (
        <div className="overflow-x-auto min-h-64">
            <table className="w-full bg-gray-800 shadow-md rounded-md overflow-hidden">
                <thead className="text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">User</th>
                        <th className="py-2 px-4 text-left">Reservation Date</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Table Name</th>
                        <th className="py-2 px-4 text-left">Seats</th>
                        {isAdmin && <th className="py-2 px-4 text-left">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {reservations.slice(0, 10).map((reservation, index) => (
                        <tr key={reservation.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                            <td className="py-2 px-4 text-gray-700">{reservation.user.username}</td>
                            <td className="py-2 px-4 text-gray-700">{new Date(reservation.reservationDate).toLocaleString()}</td>
                            <td className="py-2 px-4 text-gray-700">{reservation.status}</td>
                            <td className="py-2 px-4 text-gray-700">{reservation.table.tableName}</td>
                            <td className="py-2 px-4 text-gray-700">{reservation.table.seats}</td>
                            {isAdmin && (
                                <td className="py-2 px-4 text-gray-700 flex space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                        onClick={() => onEdit && onEdit(reservation.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                        onClick={() => onDelete && onDelete(reservation.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationTable;
