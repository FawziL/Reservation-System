import { User } from "./user";
import { Table } from "./table";

export interface Reservation {
    id: number;
    reservationDate: string;
    status: string;
    user: User;
    table: Table;
}