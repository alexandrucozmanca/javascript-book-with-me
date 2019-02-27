import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bwm-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any;

  constructor() { }

  ngOnInit() {
  }
}
