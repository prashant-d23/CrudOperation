import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private http:SharedService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute){}

  registrationForm!:FormGroup;
  dataSource: any[] = [];
  selectedId : string | null = ''

  ngOnInit(){
      this.createForm();
      this.selectedId = this.route.snapshot.queryParamMap.get('id');
      console.log(this.selectedId)

      if(this.selectedId){
        this.getDataForUpdate()
      }
  }
  createForm(){
    this.registrationForm = this.fb.group({
      "name" : ['',[Validators.required, Validators.minLength(4)]],
      "userName" : ['',[Validators.required, Validators.minLength(4)]],
      "password" : ['',[Validators.required,Validators.minLength(4)]],
    })
  }

  get name(){
    return this.registrationForm.get('name')
  };

  get userName(){
    return this.registrationForm.get('userName')
  };

  get password(){
    return this.registrationForm.get('password')
  };

  signUp(){
    console.log(this.registrationForm.value);
    if(this.selectedId == null){
      this.postData();
    }else{
      this.updateData();
    }
    this.router.navigate(['/user-list'])
  }

  postData(){
    this.http.postDataToServer('users',this.registrationForm.value).subscribe((response:any)=>{

    })
  }

  getDataForUpdate(){
    const url = "users/" + this.selectedId
    this.http.getDataFromServer(url).subscribe((response:any)=>{
      this.registrationForm.patchValue(response)
    })
  }

  updateData(){
    const url = 'users/' + this.selectedId;
    this.http.updateDataToServer(url,this.registrationForm.value).subscribe((response:any)=>{

    })


  }
}
