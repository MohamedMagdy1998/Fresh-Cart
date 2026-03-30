import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/Authentication/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  let auth : AuthService = inject(AuthService); 
  let router : Router = inject(Router);
  if(auth.userData.getValue() !== null)
  {
    return true;
  } 

  router.navigate(['/login']);
  return false;
};
