import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MaterialModule } from './material/material.module';
import { ConfigPanelComponent } from './config-panel/config-panel.component';
import { ExecutionBodyComponent } from './execution-body/execution-body.component';
import { FibProblemComponent } from './problems/fib-problem/fib-problem.component';
import { FibExplanationComponent } from './problems-explanation/fib-explanation/fib-explanation.component';
import { TargetSProblemComponent } from './problems/target-s-problem/target-s-problem.component';
import { TargetSExplanationComponent } from './problems-explanation/target-s-explanation/target-s-explanation.component';
import { UniquePathsProblemComponent } from './problems/unique-paths-problem/unique-paths-problem.component';
import { UniquePathsExplanationComponent } from './problems-explanation/unique-paths-explanation/unique-paths-explanation.component';
import { HouseRobberProblemComponent } from './problems/house-robber-problem/house-robber-problem.component';
import { HouseRobberExplanationComponent } from './problems-explanation/house-robber-explanation/house-robber-explanation.component';
import { CombSumProblemComponent } from './problems/comb-sum-problem/comb-sum-problem.component';
import { CombSumExplanationComponent } from './problems-explanation/comb-sum-explanation/comb-sum-explanation.component';
import { FibSolModalComponent } from './modals/solucion-modals/fib-sol-modal/fib-sol-modal.component';
import { TargetSSolModalComponent } from './modals/solucion-modals/target-ssol-modal/target-ssol-modal.component';
import { CombSumSolModalComponent } from './modals/solucion-modals/comb-sum-sol-modal/comb-sum-sol-modal.component';
import { HouseRobberSolModalComponent } from './modals/solucion-modals/house-robber-sol-modal/house-robber-sol-modal.component';
import { UniquePathsSolModalComponent } from './modals/solucion-modals/unique-paths-sol-modal/unique-paths-sol-modal.component';
import { CombSumEnunModalComponent } from './modals/enunciado-modals/comb-sum-enun-modal/comb-sum-enun-modal.component';
import { TargetSEnunModalComponent } from './modals/enunciado-modals/target-senun-modal/target-senun-modal.component';
import { FibEnunModalComponent } from './modals/enunciado-modals/fib-enun-modal/fib-enun-modal.component';
import { HouseRobberEnunModalComponent } from './modals/enunciado-modals/house-robber-enun-modal/house-robber-enun-modal.component';
import { UniquePathsEnunModalComponent } from './modals/enunciado-modals/unique-paths-enun-modal/unique-paths-enun-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigPanelComponent,
    ExecutionBodyComponent,
    FibProblemComponent,
    FibExplanationComponent,
    TargetSProblemComponent,
    TargetSExplanationComponent,
    UniquePathsProblemComponent,
    UniquePathsExplanationComponent,
    HouseRobberProblemComponent,
    HouseRobberExplanationComponent,
    CombSumProblemComponent,
    CombSumExplanationComponent,
    FibSolModalComponent,
    TargetSSolModalComponent,
    CombSumSolModalComponent,
    HouseRobberSolModalComponent,
    UniquePathsSolModalComponent,
    CombSumEnunModalComponent,
    TargetSEnunModalComponent,
    FibEnunModalComponent,
    HouseRobberEnunModalComponent,
    UniquePathsEnunModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }