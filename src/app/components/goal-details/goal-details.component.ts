import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {

  currentGoal: Goal = {
    name: '',
    description: '',
    targetAmount: 0,
    targetDate: null,
    currentAmount: 0
  };
  message = '';
  totalMonthsLeft = 0;
  recommendedAmountPerMonth = 0;
  
  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.message = '';
    this.getGoal(this.route.snapshot.params.id);
    this.recommendedMonthlyPayment();
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

  recommendedMonthlyPayment() {
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
          this.recommendedAmountPerMonth = (data.targetAmount - data.currentAmount)/this.totalMonthsLeft;
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

}
