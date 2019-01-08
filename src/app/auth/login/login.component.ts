import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service'

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();

    this.activatedRoute.params.subscribe((params) =>
    { 
      if(params['registered'] === 'success'){
        debugger;
        this.notifyMessage = "Succesfuly subscribed, please log in!";
      } 
    })
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
      ]
    ],
      password: ['', Validators.required]
    });
  }

  isInvalidForm(fieldName) : boolean {
    return this.loginForm.controls[fieldName].invalid && (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }

  isRequired(fieldName) : boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {

    this.authService.login(this.loginForm.value).subscribe(
      (token) => {
        this.router.navigate(['/rentals']);
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    )
  }
}
