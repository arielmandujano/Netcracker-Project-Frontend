import { Car } from "./car.model";
import { User } from "./user.model";

export interface Reservation {
    reservationId: number | null;
    carId: Car | undefined;
    userId: User;
    reservationDate: string;
    startDate: string;
    endDate: string;
    totalAmount: number | null;
    formatOfPayment: string;
    returned: boolean;
}
