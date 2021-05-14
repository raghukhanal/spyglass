import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {

  currentGoal = null;
  message = '';

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

 
  ngOnInit() {
    this.message = '';
    this.getGoal(this.route.snapshot.paramMap.get('id'));
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

  updatePublished(status) {
    const data = {
      title: this.currentGoal.title,
      description: this.currentGoal.description,
      published: status
    };

    this.goalService.update(this.currentGoal.id, data)
      .subscribe(
        response => {
          this.currentGoal.published = status;
          console.log(response);
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
