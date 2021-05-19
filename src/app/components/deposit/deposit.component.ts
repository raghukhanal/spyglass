import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Goal } from 'src/app/models/goal.model';
import { GoalService } from 'src/app/services/goal.service';



@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
 
  currentGoal: Goal = {
    name: '',
    description: '',
    targetAmount: 0,
    targetDate: new Date(),
    currentAmount: 0,
    theme: ''
  };
  submitted = false;
  zeroDeposited = false;
  message = '';
  totalMonthsLeft = 0;
  recommendedAmountPerMonth = 0;
  customAmount = 0;

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    this.getGoal(this.route.snapshot.params.id);
    this.recommendedMonthlyPayment();
  }
 
   makeDefaultPayment(){
    this.currentGoal.currentAmount += this.recommendedAmountPerMonth;
    this.updateGoal();
    this.submitted=true;
  }

  makeCustomPayment(){
    this.currentGoal.currentAmount += this.customAmount;
    if(this.customAmount > 0) {
      this.updateGoal();
      this.submitted=true;
    }
    if(this.customAmount == 0) {
      this.zeroDeposited = true;
    }
  }
  recommendedMonthlyPayment() {
   // console.log(id);
    //totalAmount - currentAmount / totalMonthsLeft
    this.goalService.get(this.route.snapshot.params.id)
      .subscribe(
        data => {
          this.currentGoal = data;
          console.log(data);
          var now = new Date();
          var target = new Date(data.targetDate);
          var yearsLeftWithMonth = (target.getFullYear() - now.getFullYear()) * 12;
          var monthsLeft = target.getMonth() - now.getMonth();
          this.totalMonthsLeft = monthsLeft + yearsLeftWithMonth;
          console.log("Months left: "+ this.totalMonthsLeft);
          
          if(this.totalMonthsLeft == 0) {
            this.recommendedAmountPerMonth = data.targetAmount - data.currentAmount;
          } else if(this.totalMonthsLeft < 0) {
            this.recommendedAmountPerMonth = 0;
            this.message="Past due date";
          } else {
            this.recommendedAmountPerMonth = (data.targetAmount - data.currentAmount)/this.totalMonthsLeft;
          }
         

          console.log("$$$$: "+ this.recommendedAmountPerMonth);
        },
        error => {
          console.log(error);
        });
  
  }

  updateGoal() {
    this.goalService.update(this.currentGoal.id, this.currentGoal)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The goal was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }
  getGoal(id) {
    this.goalService.get(id)
      .subscribe(
        data => {
          this.currentGoal = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  } 

  
}
