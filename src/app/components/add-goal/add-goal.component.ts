import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { GoalService } from 'src/app/services/goal.service';
import { PictureService } from 'src/app/services/picture.service';

// interface Theme {
//   value: string,
//   picture?: string
// }

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {
//TODO: make a model file for goals

  // themes: Theme[];

  goal: Goal = {
    name: '',
    description: '',
    targetAmount: null,
    targetDate: null,
    currentAmount: null,
    theme: ''
  };
  submitted = false;
  minDate: Date; //add min date for the datepicker in the form

  constructor(private goalService: GoalService,
    private pictureService: PictureService) {
    //make the min date the current date
    this.minDate = new Date();
  }

  ngOnInit() {
    // this.themes = this.pictureService.getAllPictures();
    // console.log(this.themes);
  }

  saveGoal(): void {
    const data = {
      name: this.goal.name,
      description: this.goal.description,
      targetAmount: this.goal.targetAmount,
      targetDate: this.goal.targetDate,
      currentAmount: this.goal.currentAmount,
      theme: this.goal.theme
    };

    this.goalService.create(data).subscribe(
      response => {
        console.log(response);
        this.submitted=true;
      },
      error => {
        console.log(error);
      });
  }

  newGoal(): void {
    this.submitted = false;
//TODO: if you make the model file, update the data types here (targetAmount is a numeric value or a string?)
    this.goal = {
      name: '',
      description: '',
      targetAmount: 0,
      targetDate: null,
      currentAmount: 0,
      theme: ''
    }
  }
}
