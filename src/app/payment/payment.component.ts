import {Component, OnDestroy, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {environment } from '../../environments/environment';

@Component({
  selector: 'bwm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  stripe: any;
  elements: any;
  @ViewChild('cardNumber') cardNumberRef;
  @ViewChild('cardExp') cardExpirationRef;
  @ViewChild('cardCVC') cardCVCRef;
  @Output() paymentConfirmed = new EventEmitter();

  cardNumber: any;
  cardExp: any;
  cardCVC: any;
  error: string = '';
  token: any;
  isValidatingCard = false;



  constructor() {
    this.stripe = Stripe(environment.STRIPE_PUBLISHABLE_KEY);
    this.elements = this.stripe.elements();
    this.onChange = this.onChange.bind(this);
  }

  ngOnInit() {
    const style = {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: 'Helvetica Neue',
        fontSize: '15px',

        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    };

    this.cardNumber = this.elements.create('cardNumber', {style});
    this.cardNumber.mount(this.cardNumberRef.nativeElement);

    this.cardExp = this.elements.create('cardExpiry', {style});
    this.cardExp.mount(this.cardExpirationRef.nativeElement);

    this.cardCVC = this.elements.create('cardCvc', {style});
    this.cardCVC.mount(this.cardCVCRef.nativeElement);

    this.cardNumber.addEventListener('change', this.onChange);
    this.cardExp.addEventListener('change', this.onChange);
    this.cardCVC.addEventListener('change', this.onChange);
  }

  ngOnDestroy () {
    this.cardNumber.removeEventListener('change');
    this.cardExp.removeEventListener('change');
    this.cardCVC.removeEventListener('change');
  }

  onChange(event) {

    if (event.error) {
      this.error = event.error.message;
    } else {
      this.error = '';
    }

  }

  async onSubmit() {
    this.isValidatingCard = true;
    const {token, error} = await this.stripe.createToken(this.cardNumber);
    if (error) {
      console.error(error);
    } else {
      this.token = token;
      this.paymentConfirmed.next(token);
    }

    this.isValidatingCard = false;
  }

  isCardValid(): boolean {
    return this.cardNumber._complete && this.cardExp._complete && this.cardCVC._complete;
  }
}
