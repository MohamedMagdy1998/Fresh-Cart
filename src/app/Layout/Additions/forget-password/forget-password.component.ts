import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Shared/Services/Authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly authenticationService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading:boolean = false;

  step: number = 1;

  verifyEmail! : FormGroup ;
  verifyCode !: FormGroup ;
  resetPassword !: FormGroup ;

  validEmail():void
  {
    this.verifyEmail = this.formBuilder.group({

      email:[null,[Validators.required,Validators.email]],
  
  
     })
  }


  validCode():void
  {

    this.verifyCode = this.formBuilder.group({

      resetCode:[null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)]]
    })

  }


  validPassword():void
  {

    this.resetPassword = this.formBuilder.group({

      email:[null,[Validators.required,Validators.email]],

      newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
      
    })

  }


  ngOnInit(): void
   {

    this.validEmail();
    this.validCode();
    this.validPassword();




   

  }


  submitEmail(): void {
  this.isLoading = true;

  this.authenticationService.forgetPassword(this.verifyEmail.value).subscribe({
    next: (response) => {
      console.log(response);

      if (response.statusMsg === 'success') {
        this.step = 2;
      }

      this.isLoading = false;
    },
    error: (err) => {
      console.log(err);
      this.isLoading = false;
    }
  });
}

  submitCode():void
  {
    
    this.authenticationService.resetCodeApi(this.verifyCode.value).subscribe({
     
      next:(response)=>
      {
        console.log(response);
        if (response.status=='Success') {
          this.isLoading = true;
          this.step = 3;
          
        }
        this.isLoading = false;
        
      },
      error:(err)=> {
      console.log(err);


    }
    })
  }

submitAccount(): void {
  this.isLoading = true;

  this.authenticationService.resetPasswordApi(this.resetPassword.value).subscribe({
    next: (response) => {
      console.log(response);

      // ✅ Check token instead of statusMsg
      if (response.token) {

        localStorage.setItem('token', response.token);
        this.authenticationService.decodeToken();

        this.router.navigate(['/home']);
      }

      this.isLoading = false;
    },
    error: (err) => {
      console.log(err);
      this.isLoading = false;
    }
  });
} 



}
