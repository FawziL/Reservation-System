export interface Notification {
    id: number;
    message: string;
    reservationId: number;
    userId: number;
    isRead?: boolean;
};

export interface NotificationsProps {
    userId: number;
};
