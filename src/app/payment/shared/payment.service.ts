import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  public getPendingPayments(): Observable<any> {
    return this.httpClient.get('/api/v1/payments');
  }

  public acceptPayment(payment: any): Observable<any> {
    return this.httpClient.post('/api/v1/payments/accept', payment);
  }

  public declinePayment(payment: any): Observable<any> {
    return this.httpClient.post('/api/v1/payments/decline', payment);
  }
}
