import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inititlizeForm();
  }

  inititlizeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        this.matchPassword('password'),
      ]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmpassword'].updateValueAndValidity();
    });
  }

  register() {
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      this.accountService.register(this.model).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
      });
    }
  }

  matchPassword(password: string): ValidatorFn {
    return (confirmCasswordControl: AbstractControl) => {
      const passwordControl = confirmCasswordControl?.parent?.controls as {
        [key: string]: AbstractControl;
      };
      return passwordControl &&
        confirmCasswordControl?.value === passwordControl[password]?.value
        ? null
        : { isMatching: true };
    };
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
