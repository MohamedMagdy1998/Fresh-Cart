import { Component } from '@angular/core';
import { AuthService } from '../../../Shared/Services/Authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpData } from '../../../Shared/Interfaces/sign-up-data';
import { SignInErrorResponse, SignInSuccessResponse } from '../../../Shared/Interfaces/SignInData';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  isLoading : boolean = false;
 invalidMessage !: string ;

  constructor(private _AuthService:AuthService,private router:Router) 
   {

   }

   logInForm = new FormGroup({

    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
   });

   submitData()
   {
    if(this.logInForm.valid)
    {
      this.isLoading = true;
      this._AuthService.signIn(this.logInForm.value as SignUpData).subscribe({
        next:(response:SignInSuccessResponse)=>
        {
          this.isLoading = false;
          localStorage.setItem('token',response.token);
          this._AuthService.decodeToken();
          setTimeout(() => {
               
               this.router.navigate(['/home']);
               
               
              }, 500);
        },
        error:(err:HttpErrorResponse)=>
        {
          this.isLoading = false;
           
          const errorMessage = err.error as SignInErrorResponse;
          this.invalidMessage = errorMessage.message;
        }
    
     });
  }
  else
  {
    this.invalidMessage = "Please fill in all required fields correctly.";
  }

}








}