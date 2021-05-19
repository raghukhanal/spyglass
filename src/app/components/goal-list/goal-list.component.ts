import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  totalMonthsLeft = 0;
  recommendedAmountPerMonth = 0;
  message = '';
  //for getting recommended amount to be funded per month
  targetAmount: number;
  targetDate: Date;
  currentAmount: number;
  todaysDate: Date = new Date();
  //Need a method to calculate percent of goal acheived 
  percentage = 0;

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.retrieveGoals();
    //this.recommendedMonthlyPayment();
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
  deleteGoal() {
    this.goalService.delete(this.currentGoal.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/goals']);
        },
        error => {
          console.log(error);
        });
  }
recommendedMonthlyPayment(id) {
  //totalAmount - currentAmount / totalMonthsLeft
  this.goalService.get(id)
    .subscribe(
      data => {
        this.currentGoal = data;
       // console.log(data);
        var now = new Date();
        var target = new Date(data.targetDate);
      //  console.log("Target: " + target);
      //calculate the total number of months in the goal, then calculate the number of months left
        var yearsLeftWithMonth = (target.getFullYear() - now.getFullYear()) * 12;
        var monthsLeft = target.getMonth() - now.getMonth();
        this.totalMonthsLeft = monthsLeft + yearsLeftWithMonth;
      //  console.log("Months left: "+ this.totalMonthsLeft);
        //error check before calculating the recommended payment
        if(this.totalMonthsLeft == 0) {
          this.recommendedAmountPerMonth = data.targetAmount - data.currentAmount;
        } else if(this.totalMonthsLeft < 0) {
          this.recommendedAmountPerMonth = 0;
          this.message="Past due date";
        } else {
          this.recommendedAmountPerMonth = (data.targetAmount - data.currentAmount)/this.totalMonthsLeft;
        }
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
  this.recommendedMonthlyPayment(goal.id);
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


