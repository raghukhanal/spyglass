import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddGoalComponent } from './components/add-goal/add-goal.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';
import { GoalListComponent } from './components/goal-list/goal-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddGoalComponent,
    GoalDetailsComponent,
    GoalListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
