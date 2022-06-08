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
import { DataTableComponent } from './data-table/data-table.component';
import { ParamModalComponent } from './modals/param-modal/param-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigPanelComponent,
    ExecutionBodyComponent,
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
    DataTableComponent,
    ParamModalComponent,
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