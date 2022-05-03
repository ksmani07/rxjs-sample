import { Component, OnInit } from '@angular/core';
import { combineLatest, from, fromEvent, of, timer } from 'rxjs';
import { User } from './interfaces/user';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private commonService: CommonService){}
  title = 'angular-rxjs';

  ngOnInit(): void {
    this.commonService.getUser().subscribe((user:User)=>{
      //console.log('App Component', user)
    });

    // From Event
    //emit array as a sequence of values
    const arraySource = from([1, 2, 3, 4, 5]);
    //output: 1,2,3,4,5
    const subscribe = arraySource.subscribe(val => console.log(val));


    
//emit result of promise
const promiseSource = from(this.formPromise());
//output: 'Hello World'
const subscribeForm = promiseSource.subscribe(val => console.log(val));


    // Of 
    const arraySourceOf = of([1, 2, 3, 4, 5]);
    //output: 1,2,3,4,5
    const subscribeOf = arraySourceOf.subscribe(val => console.log(val));


    //The fromEvent() operator takes any DOM element and an event name as props and creates a new observable with it.

    const observable1 = fromEvent(document, 'click').subscribe(() =>
      console.log('You clicked the page!')
    );



// const timerOne$ = timer(1000, 4000);
// const timerTwo$ = timer(2000, 4000);

// combineLatest(
//   [timerOne$,
//   timerTwo$],
//   // combineLatest also takes an optional projection function
//   (one, two) => {
//     return `Timer One (Proj) Latest: ${one}, 
//               Timer Two (Proj) Latest: ${two}`;
//   }
// ).subscribe(console.log);


// Concat



  }

  formPromise(){
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve('Hello world')
      }, 4000);
    })
  }

}
