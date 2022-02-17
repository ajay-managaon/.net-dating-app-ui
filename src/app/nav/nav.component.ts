import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};
  isLoggedIn = false;
  constructor(private accountservice : AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountservice.login(this.model).subscribe({
      next : (response : any) => {
        console.log(response);
        this.isLoggedIn = true;
      },
      error: (error: any) =>{
        console.log(error);
      }
    })
  }

  logout(){
    this.isLoggedIn = false;
  }
}
