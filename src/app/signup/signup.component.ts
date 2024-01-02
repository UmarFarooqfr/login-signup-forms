import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  showPassword: boolean = true;
  confirmPassword: boolean = true;
  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(){}

  onSubmit() {
    this.markFormGroupTouched(this.signUpForm);
    if (this.signUpForm.valid) {
      console.log("Form is valid.", this.signUpForm.value);
    } else {
      console.log("Form is invalid. Please fix the errors.");
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (passwordControl?.value === confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors(null);
    } else {
      confirmPasswordControl?.setErrors({ 'passwordMismatch': true });
    }

    if (!confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ 'required': true });

    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  togglePassword(value: string) {
    if (value === 'password') {
      this.showPassword = !this.showPassword;
    } else if (value === 'confirmPassword') {
      this.confirmPassword = !this.confirmPassword;
    }
  }

}