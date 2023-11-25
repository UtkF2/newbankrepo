import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formValue!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: ApiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this._formBuilder.group({
      firstName: ['', Validators.required],
      code: ['', Validators.required],
    });

    // Reset the form to ensure fields are empty on page load/refresh
    this.formValue.reset();
  }

  get firstName() {
    return this.formValue.get('firstName');
  }

  get code() {
    return this.formValue.get('code');
  }

  login() {
    this._commonService.getEmployee().subscribe({
      next: (res: any) => {
        const user = res.find((tempvariable: any) => {
          return (
            tempvariable.firstName.toLowerCase() ===
              this.formValue.value.firstName.toLowerCase() &&
            tempvariable.code === this.formValue.value.code
          );
        });
        if (user) {
          this._router.navigate(['/dashboard']);
        } else {
          alert('Wrong login information');
        }
      },
    });
  }
}
