import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Problem } from '../model/problems-alg/Problem';
import { CombinationSum } from '../model/problems-alg/CombinationSum';
import { Fibonacci } from '../model/problems-alg/Fibonacci';
import { HouseRobber } from '../model/problems-alg/HouseRobber';
import { TargetSum } from '../model/problems-alg/TargetSum';
import { UniquePaths } from '../model/problems-alg/UniquePaths';
import { RunMode } from '../model/run/RunMode';
import { RunParams } from '../model/run/RunParams';
import { RunControllerService } from './run-controller.service';
import { CodeBgService } from './code-bg.service';
import { TableManagerService } from './table-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemControllerService {
  selectedProblem : Problem;
  selecProblemObs : BehaviorSubject<Problem>;
  dpMode : boolean;
  dpModeObs : BehaviorSubject<boolean>

  constructor(private runServ : RunControllerService,
             private codeBg : CodeBgService,
             private tableServ : TableManagerService) { 
    this.selectedProblem = new Fibonacci(codeBg,tableServ);
    this.selecProblemObs = new BehaviorSubject<Problem>(this.selectedProblem);
    this.dpMode = false;
    this.dpModeObs = new BehaviorSubject<boolean>(this.dpMode);
  }

  setSelectedProblem(problem : string) {
    switch(problem){
      case("Fibonacci"):
        this.selectedProblem = new Fibonacci(this.codeBg,this.tableServ);
        break;
      case("TargetSum"):
        this.selectedProblem = new TargetSum(this.codeBg,this.tableServ);
        break;
      case("CombSum"):
        this.selectedProblem = new CombinationSum(this.codeBg,this.tableServ);
        break;
      case("HouseRobber"):
        this.selectedProblem = new HouseRobber(this.codeBg,this.tableServ);
        break;
      case("UniquePaths"):
        this.selectedProblem = new UniquePaths(this.codeBg,this.tableServ);
        break;
    }
    this.selectedProblem.setDpDesired(this.dpMode);
    this.updateObs();
  }

  updateObs(){
    this.selecProblemObs.next(this.selectedProblem);
  }

  executeProblem(runParams : RunParams){
    this.selectedProblem.adjustProblemConfig(runParams);
    this.runServ.runProgram(runParams.runMode, this.selectedProblem);
  }

  setDPMode(dpMode : boolean){
    this.dpMode = dpMode;
    this.selectedProblem.setDpDesired(this.dpMode);
    this.dpModeObs.next(this.dpMode);
  }
}
