import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};
  constructor(
    public accountservice : AccountService, 
    private router : Router,
    private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountservice.login(this.model).subscribe({
      next : (response) => {
        this.router.navigateByUrl("/members");
        console.log(response);
      },error : error =>{
        if(error[0]){
          this.toastr.error(error[0]);
        }else if(error[1]){
          this.toastr.error(error[1]);
        }
      }
    })
  }

  logout(){
    this.accountservice.logout();
    this.router.navigateByUrl("/");
  }
}
