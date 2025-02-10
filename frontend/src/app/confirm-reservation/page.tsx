"use client";
import api from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ConfirmReservation = () => {
    const searchParams = useSearchParams();
    const [message, setMessage] = useState("Confirmando reserva...");
    
    useEffect(() => {
        const confirmReservation = async () => {
            const token = searchParams.get("token");
            if (!token) {
                setMessage("Token inválido o faltante.");
                return;
            }

            try {
                const response = await api.post("/reservations/confirm", {
                    token: token
                });
                if (response.status === 201) {
                    setMessage("¡Reserva confirmada con éxito!");
                    toast.success(
                        `Se ha confirmado tu reservación con éxito! 
                        Status: ${response.statusText}`,
                        {
                            position: "top-right",
                            autoClose: 3000,
                        }
                    );
                }
            } catch (err:any) {
                toast.error(`${err.response.statusText}: ${err.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                setMessage("Error de conexión con el servidor.");
            }
        };

        confirmReservation();
    }, [searchParams]);

    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default ConfirmReservation;

