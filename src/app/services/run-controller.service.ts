import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  //estadoModoManual : EstadoEjecucionM = {estadoVariables:[],codPasoRealizar:0};

  /**
   * Constructor del servicio.
   * 
   * @param arrServ Servicio que nos ofrece funcionalidades para realizar el control el array a visualizar
   * y ejercer cambios sobre el mismo
   */
  constructor() { 
    this.running = false;
    this.runObs = new BehaviorSubject<boolean>(this.running);
    this.runningModeObs = new BehaviorSubject<RunMode>(this.runningMode)
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

  /**
   * Realiza el siguiente paso siempre y cuando el modo de ejecucion sea manual y asigna
   * el siguiente estado a la variable de clase 'estadoModoManual' para en el siguiente
   * llamado saber que enviar.
   * 
   */
  async runManualSortingStep(){

  }

  /**
   * Detiene la ejecucion del programa y actualiza el observable de la variable
   * booleane 'running' con el valor false.
   */
  stopProgram(){
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
