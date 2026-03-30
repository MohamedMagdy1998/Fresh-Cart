import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Shared/Services/Authentication/auth.service';
import { Router } from '@angular/router';
import { SignUpData, SignUpErrorResponse, SignUpSuccessResponse } from '../../../Shared/Interfaces/sign-up-data';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService:AuthService,private router:Router)
  {

  }
  
isLoading :boolean=false;
invalidFormMessage !: string ;


  registerForm = new FormGroup({

    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:this.ConfirmPassword});


 

  SubmitData()
  {

    if(this.registerForm.valid)
    {
      this.isLoading=true;
    this.authService.SignUp(this.registerForm.value as SignUpData).subscribe({
      next: (res: SignUpSuccessResponse) => {
        this.isLoading = false;

        localStorage.setItem('token', res.token);
          this.authService.decodeToken();

        setTimeout(() => {
        
        this.router.navigate(['/home']);
        
        
       }, 500);
      },

          error: (err:HttpErrorResponse) => {
            this.isLoading = false;

            const errorMessage = err.error as SignUpErrorResponse;

            this.invalidFormMessage = errorMessage.message;
          }
    });

  }
  else
  {
    this.invalidFormMessage = 'Please fill out the form correctly.';
  }

}







  ConfirmPassword(form:AbstractControl)
  {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('rePassword')?.value;
    if (password !== confirmPassword)
       {
       return ({ mismatch: true });
      }
     else
       {
       return null;
       }


  }




}
