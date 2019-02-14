import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditableInputComponent } from './editable-input/editable-input.component';
import { EditableTextAreaComponent } from './editable-text-area/editable-text-area.component';
import { EditableSelectComponent } from './editable-select/editable-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EditableInputComponent,
    EditableTextAreaComponent,
    EditableSelectComponent
  ],
  declarations: [
    EditableInputComponent,
    EditableTextAreaComponent,
    EditableSelectComponent
  ]
})
export class EditableModule {
}
