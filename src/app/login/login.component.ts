import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isValid : boolean = false;
  isNotValid :boolean = false;
  constructor(private fb:FormBuilder, private http:SharedService, private router:Router){ }

  ngOnInit(){
    this.createForm();
    this.getData();
  }

  createForm(){
    this.loginForm = this.fb.group({
      "userName" : ['',[Validators.required]],
      "password" : ['',[Validators.required, Validators.minLength(4)]]
     })
  };

  dataSource:any;
  getData(){
  this.http.getDataFromServer('users').subscribe((response:any)=>{
    if(response && response.length > 0){
      this.dataSource = response;
      // console.log(this.dataSource)
    }
  },
  error => {
    console.log(error)
  })
  }

  get userName(){
    return this.loginForm.get('userName');
  };
  get password(){
    return this.loginForm.get('password')
  };

  login(){
    // console.log(this.loginForm.value);
    const userName:string = this.loginForm.get('userName')?.value;
    const password:string = this.loginForm.get('password')?.value;

    for(const user of this.dataSource){
      if(userName == user.userName && password == user.password){
        this.isValid = true;
        sessionStorage.setItem("flag","true")
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        this.router.navigate(['/user-list'])
        return;
      }else{
        this.isNotValid = true
      }

    }
  }
}
