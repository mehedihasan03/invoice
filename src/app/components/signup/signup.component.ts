import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User()

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  saveUser(){
    if (this.user.password == this.user.repassword) {
      const headers = { 'content-type': 'application/json' };
      this.http.post<any>("http://localhost:9988/user/save", JSON.stringify(this.user), { headers: headers })
        .subscribe(data => {
        alert("Registrtion successfull")
        this.user = new User();
        
        },err =>{
          alert(err.error.text)
       }
        )
    } 
  }
}
