import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ManualAlg } from '../model/manual-mode/ManualAlg';
import { ManualDirector } from '../model/manual-mode/ManualDirector';
import { Problem } from '../model/problems-alg/Problem';
import { RunMode } from '../model/run/RunMode';
import { RunParams } from '../model/run/RunParams';

@Injectable({
  providedIn: 'root'
})
export class RunControllerService {
  runningMode : RunMode = RunMode.MANUAL;
  running : boolean;
  runObs : BehaviorSubject<boolean>;
  runningModeObs : BehaviorSubject<RunMode>
  manualDirector : ManualDirector;
  modoManualDisabled : boolean;
  modoManualDisabledObs : BehaviorSubject<boolean>;

  /**
   * Constructor del servicio.
   * 
   * @param arrServ Servicio que nos ofrece funcionalidades para realizar el control el array a visualizar
   * y ejercer cambios sobre el mismo
   */
  constructor() { 
    this.running = false;
    this.modoManualDisabled = false;
    this.runObs = new BehaviorSubject<boolean>(this.running);
    this.runningModeObs = new BehaviorSubject<RunMode>(this.runningMode)
    this.manualDirector = new ManualDirector()
    this.modoManualDisabledObs = new BehaviorSubject<boolean>(this.modoManualDisabled);
  }

  modoManualOnHold(){
    this.modoManualDisabled = true;
    this.modoManualDisabledObs.next(this.modoManualDisabled);
  }

  unholdManualMode(){
    this.modoManualDisabled = false;
    this.modoManualDisabledObs.next(this.modoManualDisabled);
  }


  /**
   * Setea la variable de clase 'runningMode' con el valor otorgado por parametro.
   * 
   * @param runMode String que representa el modo de ejecucion
   */
  setRunningMode(runMode : RunMode){
    this.runningMode = runMode;
    this.runningModeObs.next(this.runningMode);
  }

  runProgram(runMode : RunMode, problem : Problem){
    this.runningMode = runMode;
    this.activateRunningMode()
    this.runningMode == RunMode.AUTOMATIC ? this.runAutomaticSorting(problem) :
                                            this.runManualSortingStep();
  }

  /**
   * Corre el programa en su modo de ejecucion automatico siempre y cuando
   * se hayan definido los parametros necesarios para realizar la ejecucion
   * 
   */
  async runAutomaticSorting(problem : Problem){
    await problem.runAutomatic()
    this.stopRunningMode()
  }


  delayBy(delay : number){
    return new Promise(resolve => {
        setTimeout(function() {
        resolve("Delay completado");
        }, delay);
    });
  }
  /**
   * Realiza el siguiente paso siempre y cuando el modo de ejecucion sea manual y asigna
   * el siguiente estado a la variable de clase 'estadoModoManual' para en el siguiente
   * llamado saber que enviar.
   * 
   */
  async runManualSortingStep(){
    let isOver : boolean = this.manualDirector.runNextStep();
    if(isOver){
      this.stopProgram();
    }
    this.modoManualOnHold();
    await this.delayBy(100);
    this.unholdManualMode();
  }
  
  setAlgorithm(alg : ManualAlg){
    this.manualDirector.setManualAlg(alg);
  }

  /**
   * Detiene la ejecucion del programa y actualiza el observable de la variable
   * booleane 'running' con el valor false.
   */
  stopProgram(){
    this.manualDirector.stopExecution();
    this.stopRunningMode();
  }

  /**
   * Cambia el valor de variable boolena 'running' a true indicando que inicio la ejecucion
   * del programa ya sea en modo manual o automatico y actaliza el obserbable.
   */
  private activateRunningMode(){
    this.running = true;
    this.runObs.next(this.running);
  }

  private stopRunningMode(){
    this.running = false;
    this.runObs.next(this.running);
  }

  /**
   * Devuelve el valor de la variable de clase 'running' que representa si el programa
   * esta siendo ejecutado o no.
   * 
   * @returns Variable booleana que representa si el programa esta corriendo.
   */
  isRunning(){
    return this.running;
  }
}
