import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Goal } from 'src/app/models/goal.model';
import { GoalService } from 'src/app/services/goal.service';
//import { GoalDetailsComponent } from '../goal-details/goal-details.component';


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
  message = '';
  recommendedAmountPerMonth = 0;
  customAmount = 0;
 // goalDetailsComponent: GoalDetailsComponent;

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    //this.goalDetailsComponent.getGoal(this.route.snapshot.params.id);
    this.getGoal(this.route.snapshot.params.id);
  }
 
   makeDefaultPayment(){
    this.currentGoal.currentAmount += this.recommendedAmountPerMonth;
   // this.goalDetailsComponent.updateGoal();
   this.updateGoal();
  }

  makeCustomPayment(){
    this.currentGoal.currentAmount += this.customAmount;
 //   this.goalDetailsComponent.updateGoal();
 this.updateGoal();
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
