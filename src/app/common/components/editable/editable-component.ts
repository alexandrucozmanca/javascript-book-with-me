import { Input, Output, EventEmitter, OnChanges} from '@angular/core';

export class EditableComponent implements OnChanges {
  @Input() entity: any;
  @Input() set field (entityField: string) {
    this.entityField = entityField;
    this.setOriginalValue();
  }
  @Input() className: string;
  @Input() style: any;
  @Output() entityUpdated = new EventEmitter();
  isActiveInput = false;
  public originalValue: any;
  public entityField: string;

  constructor() { }

  ngOnChanges() {
    this.setOriginalValue();
    this.isActiveInput = false;
  }

  updateEntity() {
    const entityValue =  this.entity[this.entityField];
    if (entityValue !== this.originalValue) {
      this.entityUpdated.emit({[this.entityField] : this.entity[this.entityField]});
      this.setOriginalValue();
    }
    this.isActiveInput = false;
  }

  cancelUpdate() {
    this.isActiveInput = false;
    this.entity[this.entityField] = this.originalValue;
  }

  setOriginalValue() {
    this.originalValue = this.entity[this.entityField];
  }
}
