import { Injectable } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import * as moment from 'moment';
import { formatDate } from '@angular/common';


@Injectable()
export class HelperService {
    private getRangeOfDates(startAt, endAt, dateFormat) {
        const tempDates = [];
        const momentEndAt = moment(endAt);
        let momentStartAt = moment(startAt);

        while(momentStartAt <= momentEndAt){
            tempDates.push(momentStartAt.format(dateFormat));
            momentStartAt = momentStartAt.add(1, 'day');
        }

        return tempDates;
    }

    private formatDate(date, dateFormat){
        return moment(date).format(dateFormat);
    }

    public formatBookingDate(date){
        return this.formatDate(date, Booking.DATA_FORMAT);
    }

    public getBookingRangeOfDates(startAt, endAt){
        return this.getRangeOfDates(startAt, endAt, Booking.DATA_FORMAT);
    }
}