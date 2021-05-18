import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';
import { AddGoalComponent } from './components/add-goal/add-goal.component';
import { DepositComponent } from 'src/app/components/deposit/deposit.component';

const routes: Routes = [
  { path: '', redirectTo: 'goals', pathMatch: 'full' },
  { path: 'goals', component: GoalListComponent},
  { path: 'goals/:id', component: GoalDetailsComponent},
  { path: 'add', component: AddGoalComponent},
  { path: 'goals/:id/deposit', component: DepositComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
