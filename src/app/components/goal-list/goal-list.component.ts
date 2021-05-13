import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';


@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  goals: any;
  currentGoal = null;
  currentIndex = -1;
  name = '';
  //Need a method to calculate percent of goal acheived 
  percentage = 0;


  constructor(private goalService: GoalService) {}

  ngOnInit() {
    this.retrieveGoals();
  }

  retrieveGoals() {
    this.goalService.getAll()
      .subscribe(
        data => {
          this.goals = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveGoals();
    this.currentGoal = null;
    this.currentIndex = -1;
  }

  setActiveGoal(goal, index) {
    this.currentGoal = goal;
    this.currentIndex = index;
  }

  removeAllGoals() {
    this.goalService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveGoals();
        },
        error => {
          console.log(error);
        });
    }

  }

