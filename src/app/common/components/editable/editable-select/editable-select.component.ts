import {Component, Input, OnInit} from '@angular/core';
import {EditableComponent} from '../editable-component';

@Component({
  selector: 'bwm-editable-select',
  templateUrl: './editable-select.component.html',
  styleUrls: ['./editable-select.component.css']
})
export class EditableSelectComponent extends EditableComponent {
  @Input() public selectOptions: any[];
}

