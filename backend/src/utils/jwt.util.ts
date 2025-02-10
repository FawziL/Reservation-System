import * as jwt from 'jsonwebtoken';

export class JwtUtil {
    static generateConfirmationToken(reservationId: number): string {
        return jwt.sign({ reservationId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
}
