
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user';
import { CommonService } from '../services/common.service';



@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent implements OnInit {
  users:User[]= [];
  users$:BehaviorSubject<User[]> = new BehaviorSubject([]);
  userCount = 0;
  userForm = {
    name:'',
    email:''
  }
  isUserEdit = false;
  editIndex:any = null;

  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const user:User = {
      name: this.userForm.name,
      email:this.userForm.email,
      roles:[{
        id:1,
        name:'admin'
      }]
    }
   
    
    if(this.editIndex !=null && this.isUserEdit){
      // this.users[this.editIndex]['roles'][0].name='user';
      this.users[this.editIndex] = user;
    }else{
    
      this.users.push(user);
    }
    this.editIndex = null;
    this.isUserEdit =false;
    this.userCount = this.users.length;
    console.log('onSubmit', this.users)
    this.commonService.setUser(user);
    this.users$.next(this.users);
  }

  onEdit(user:User){
    this.editIndex = this.users.findIndex(x=>x.name === user.name);
    this.isUserEdit = true;
    this.userForm.name = user.name
    this.userForm.email = user.email
  }


  search(search:any){
    console.log('search', search);
    this.commonService.search(of(search)).subscribe(data=>{
      console.log('data', data);
    })
  }

}
