import {Component, Input, OnInit} from '@angular/core';
import {EditableComponent} from '../editable-component';


@Component({
  selector: 'bwm-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.css']
})
export class EditableInputComponent extends EditableComponent {
  @Input() type = 'text';
  @Input() transformView = function (value) {
    return value;
  };
}
