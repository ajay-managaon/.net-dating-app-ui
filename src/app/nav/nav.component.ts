import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};
  constructor(public accountservice : AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountservice.login(this.model).subscribe({
      next : (response) => {
        console.log(response);
      },
      error: (error: any) =>{
        console.log(error);
      }
    })
  }

  logout(){
    this.accountservice.logout();
  }
}
