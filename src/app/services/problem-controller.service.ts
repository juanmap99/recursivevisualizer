import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Problem } from '../model/problem-components/Problem';
import { CombinationSum } from '../model/problems-alg/CombinationSum';
import { Fibonacci } from '../model/problems-alg/Fibonacci';
import { HouseRobber } from '../model/problems-alg/HouseRobber';
import { TargetSum } from '../model/problems-alg/TargetSum';
import { UniquePaths } from '../model/problems-alg/UniquePaths';
import { RunMode } from '../model/run/RunMode';
import { RunParams } from '../model/run/RunParams';
import { RunControllerService } from './run-controller.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemControllerService {
  selectedProblem : Problem;
  selecProblemObs : BehaviorSubject<Problem>;

  constructor(private runServ : RunControllerService) { 
    this.selectedProblem = new Fibonacci();
    this.selecProblemObs = new BehaviorSubject<Problem>(this.selectedProblem);
  }

  setSelectedProblem(problem : string) {
    switch(problem){
      case("Fibonacci"):
        this.selectedProblem = new Fibonacci();
        break;
      case("TargetSum"):
        this.selectedProblem = new TargetSum();
        break;
      case("CombSum"):
        this.selectedProblem = new CombinationSum();
        break;
      case("HouseRobber"):
        this.selectedProblem = new HouseRobber();
        break;
      case("UniquePaths"):
        this.selectedProblem = new UniquePaths();
        break;
    }
    this.updateObs();
  }

  updateObs(){
    this.selecProblemObs.next(this.selectedProblem);
  }

  executeProblem(runParams : RunParams){
    this.selectedProblem.adjustProblemConfig(runParams);
    this.runServ.runProgram(runParams.runMode);
  }

}
