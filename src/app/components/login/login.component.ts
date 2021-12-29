import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService, private storageService: StorageService) { 
    this.formGroup = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    var isLoggedIn = this.storageService.isLoggedIn();
    if(isLoggedIn) this.router.navigate(['']);
  }

  get f(){
    return this.formGroup.controls;
  }

  loginUser(){
    this.submitted = true;
   this.loginService.login(this.formGroup.value)
   .subscribe(res => {
     alert("Login successfull")
    this.storageService.saveLoginInfo(res.data);
    console.log(res.data);
    
    this.router.navigate(['']);
   }, err => {
     alert("Login Failed")
     console.log(err);
     this.router.navigate(['login']);
   })
  }


}

