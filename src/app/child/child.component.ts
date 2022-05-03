import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit , OnChanges {
  @Input() users:User[] = [];
  @Input() userCount:number;
  @Output() userEmit = new EventEmitter();
  @Input() users$:Observable<User[]>;
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.users$.subscribe(users=>{
      // console.log('child users', users)
    });

    this.commonService.getUser().subscribe((user:User)=>{
      console.log('child Component', user)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
  }

  onEdit(user:User){
    this.userEmit.emit(user);
  }



}
