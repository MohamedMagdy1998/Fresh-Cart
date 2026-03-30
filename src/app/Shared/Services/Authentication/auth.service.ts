import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SignUpData, SignUpSuccessResponse } from '../../Interfaces/sign-up-data';
import { Environment } from '../../../Enviroment/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignInData, SignInSuccessResponse } from '../../Interfaces/SignInData';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { VerifyTokenSuccessResponse } from '../../Interfaces/VerifyTokenResponse';
import { ForgetPasswordData, ForgetPasswordResponse } from '../../Interfaces/forget-password';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : BehaviorSubject<null | JwtPayload > = new BehaviorSubject<null | JwtPayload>(null);

  constructor(private _HttpClient:HttpClient , @Inject(PLATFORM_ID) id : object , private router:Router) 
   {
      
      if(isPlatformBrowser(id))
      {
          if(localStorage.getItem('token'))
          {
                  this.verifyToken().subscribe({
                    next : (res:VerifyTokenSuccessResponse) => {
                        this.decodeToken();
                    },
                    error : (err:VerifyTokenSuccessResponse) => {
                      //1- remove token from local storage
                      //2- set userData to null
                      //3- navigate to login page
                        this.logOut();
                    }
                });
          }
      }


   }

   SignUp(userData:SignUpData):Observable<SignUpSuccessResponse>
   {
      return this._HttpClient.post<SignUpSuccessResponse>(`${Environment.BaseUrl}/api/v1/auth/signup`,userData);
    }

    signIn(signInData: SignInData): Observable<SignInSuccessResponse> 
    {
      return this._HttpClient.post<SignInSuccessResponse>(`${Environment.BaseUrl}/api/v1/auth/signin`, signInData);
    }


    decodeToken()
    {
      const token = localStorage.getItem('token');
        
        if (token)
          this.userData.next(jwtDecode(token));

        console.log(this.userData.value);

    }

    logOut()
    {
      localStorage.removeItem('token');
      this.userData.next(null);
      this.router.navigate(['/login']);
    }

    verifyToken() : Observable<VerifyTokenSuccessResponse> 
    {
      return this._HttpClient.get<VerifyTokenSuccessResponse>(`${Environment.BaseUrl}/api/v1/auth/verifyToken`,
          {
              headers : {
                        token : localStorage.getItem('token') || ''
                        }
          }
      );
    
    }


    forgetPassword(data: ForgetPasswordData) : Observable<ForgetPasswordResponse>
    {
      return this._HttpClient.post<ForgetPasswordResponse>(`${Environment.BaseUrl}/api/v1/auth/forgotPasswords`,data);
    }



resetCodeApi(data:object):Observable<any>
    {
      return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/auth/verifyResetCode`,data);
    }


    resetPasswordApi(data:object):Observable<any>
    {

      return this._HttpClient.put(`${Environment.BaseUrl}/api/v1/auth/resetPassword`,data)

    }





}
