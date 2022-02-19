// importing the angular modules
import { Component, OnInit } from '@angular/core';

// connecting to the html doc
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

// managing the list or item in todo
export class TodosComponent implements OnInit {
  public todos = [];
  public countDownTimes = [];
  public intervals = []
  public todo = '';
  public time = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  // saving the todo list items
  saveTodo(){
    const todoObject = {
      id: this.todos.length + 1,
      name: this.todo,
      expectedDate: new Date(this.time),
      completed: false,
      // countdowntime: this.getCountDown(new Date(this.time)),
    }
    this.getCountDown(todoObject.expectedDate, this.todos.length)
    this.todos.push(todoObject);
    console.log(this.todos)
  }

  countDown(todo){

  }

  // managing the counter/timer
  getCountDown(todoTime, index) {
    this.intervals[index] = setInterval(() => {
      const now = new Date().getTime();
      const distance = todoTime.getTime() - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.countDownTimes[index]= {
        days,
        hours,
        minutes,
        seconds
      };
    }, 1000);
  }

  // for splicing the items
  removeTodo(index) {
    this.todos.splice(index,1)
    this.countDownTimes.splice(index,1)
    clearInterval(this.intervals[index]);
  }

  // changing the state of item based on checklist
  toggleTodoComplete(index) {
    const todo = this.todos[index];
    todo['completed'] = !todo['completed'];
    this.todos[index] = todo;
    clearInterval(this.intervals[index]);
  }
}
