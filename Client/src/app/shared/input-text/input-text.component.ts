import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {

  @Input() abstractControl?: AbstractControl<any> | null;
  @Input() label: string = 'Column';
  @Input() type: 'text' | 'email' | 'password' | 'tel' | 'url' = 'text';
  @Input() passwordErrorMessage: string = 'Password should be complex enough';
  @Input() phoneNumberErrorMessage: string = 'Phone number should be valid';

  protected get formControl() {
    return this.abstractControl as FormControl<any>;
  }

  protected getValidationResultClass() {
    if (this.abstractControl?.touched) {
      return this.abstractControl?.valid ? 'is-valid' : 'is-invalid';
    }
    return null;
  }

  protected markAsTouched() {
    if (this.abstractControl?.untouched) {
      this.abstractControl?.markAsTouched();
    }
  }
}
