import { Rental } from 'src/app/rental/shared/rental.model';

export class Booking {

    static readonly DATA_FORMAT = 'YYYY-MM-DD';

    _id: string;
    startAt: string;
    endAt: string;
    createdAt: string;
    totalPrice: number;
    guests: number;
    days: number;
    rental : Rental; 
}