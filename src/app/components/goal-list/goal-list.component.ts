import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { GoalDetailsComponent } from '../goal-details/goal-details.component';


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
 

  //for getting recommended amount to be funded per month
  targetAmount: number;
  targetDate: Date;
  currentAmount: number;
  todaysDate: Date = new Date();

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



// ******************************* TO DO: ****************************************** //
  monthlyRecommendedAmount(id) {
    let theGoal =  this.goalService.get(id)
    .subscribe(
      data => {
        this.currentGoal = data;
        this.targetAmount = data.targetAmount;
        this.targetDate = data.targetDate;
        // this.todaysDate
        this.currentAmount = data.currentAmount;
        // let months = Math.floor((Date.now() - this.targetDate) / 30 / 24 / 3600 / 1000);
     
        // let months = this.targetDate - Date.now();

        console.log(data);
      },
      error => {
        console.log(error);
      });
    // targetAmount  

    //targetDate 
    //Today's date 
    // extract # of months left
  }

  // ********************************************************************************************** //


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

