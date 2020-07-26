import { FormGroup } from '@angular/forms';
import { APP_CONFIG } from '../app.config';

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string) {
    const config = {
      required: 'This field is required',
      invalidEmailAddress: 'Invalid email address',
      minlength: 'This field is too short',
      maxlength: 'This field is too long',
      passwordMisMatch: 'The password doesnot match',
      invalidPassword: 'Entered Password do not match',
      invalidField: 'This field is invalid',
      invalidNumber: 'must be numeric',
      invalidUserName: 'This is not the valid Email Address',
      notValidNumber: 'Enter valid phone number. Eg:XXX-XXX-XXXX',
      invalidUsername: 'This is not a valid name',
      invalidName: 'should be Alphabetic.'
    };

    return config[validatorName];
  }

  static emptyValidation(control) {
    if (control.value) {
      return { requiredfield: false };
    } else {
      return { requiredfield: true };
    }
  }

  static emailValidator(control) {
    if (!control.value) {
      return null;
    }
    if (
      control.value.match(
        /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)?(\.[a-zA-Z]{2,6})$/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static nameValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[a-zA-Z ]+$/)) {
      return null;
    } else {
      return { invalidName: true };
    }
  }

  static numberValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]+$/)) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }

  static matchingPasswords(
    passwordKey: string,
    confirmPasswordKey: string
  ) {
    return (
      group: FormGroup
    ): {
      [key: string]: any;
    } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return { passwordMisMatch: true };
      }
      return null;
    };
  }

  static checkAllRequiredFieldsValidator(form, excludeControls = []) {
    let isRequired = true;
    for (const control of Object.keys(form.controls)) {
      if (
        !excludeControls.includes(control) &&
        form.controls[control].value
      ) {
        isRequired = false;
      }
    }
    if (isRequired) {
      return { invalidForm: true };
    } else {
      return null;
    }
  }

  /**
   * @method alphaNumericWithSpaceValidator
   * @description: method to match against alphanumeric with space
   * @param: control: form control
   * @returns: validation status
   */
  static alphaNumericWithSpaceValidator(
    control
  ): { invalidAlphaNumber: boolean } | null {
    if (!control.value) {
      return null;
    }
    if (control.value.match(APP_CONFIG.pattern.alphaNumericWithSpace)) {
      return null;
    } else {
      return { invalidAlphaNumber: true };
    }
  }

}
