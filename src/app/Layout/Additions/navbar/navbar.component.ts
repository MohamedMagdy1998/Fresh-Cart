import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../Shared/Services/Flowbite/Flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Shared/Services/Authentication/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLoggedIn : boolean = false; 
  constructor(private flowbiteService: FlowbiteService,public authService:AuthService) {}

  ngOnInit(): void {

    this.authService.userData.subscribe((data) => 
          {  
            if (data)
           this.isLoggedIn = true;
            else
              {
                this.isLoggedIn = false;
              }
        });
    
   






    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}