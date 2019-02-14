import {Component, Input, OnInit} from '@angular/core';
import {EditableComponent} from '../editable-component';

@Component({
  selector: 'bwm-editable-text-area',
  templateUrl: './editable-text-area.component.html',
  styleUrls: ['./editable-text-area.component.css']
})
export class EditableTextAreaComponent extends EditableComponent {
  @Input() rows: any;
  @Input() cols: any;
}
