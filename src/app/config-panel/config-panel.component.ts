import { Component, EventEmitter, Output} from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { faLinesLeaning } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { MatSliderChange } from '@angular/material/slider';
import { RunControllerService } from '../services/run-controller.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange} from '@angular/material/checkbox';
import { ProblemControllerService } from '../services/problem-controller.service';
import { Problem } from '../model/problems-alg/Problem';
import { Parameter } from '../model/problem-components/Parameter';
import { RunParams } from '../model/run/RunParams';
import { RunMode } from '../model/run/RunMode';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss']
})
export class ConfigPanelComponent{
  manual : boolean;
  atomIcon = faLinesLeaning;
  lbulbIcon = faLightbulb;
  playButton = faPlay;
  running : boolean;
  arrSize : number;
  runSpeed: number;
  timerDesired : boolean = false;
  DPDesired : boolean = false;
  algorithmParameters : Parameter[];
  @Output() sizeChange = new EventEmitter<number>();
  @Output() explEvent = new EventEmitter<string>();
  @Output() enunciadoEvent = new EventEmitter<string>();
  @Output() runEvent = new EventEmitter<RunParams>();
  @Output() execModeEvent = new EventEmitter<RunMode>()
  @Output() dpDesiredEvent = new EventEmitter<boolean>()
  
  userModeButtonActive: boolean = false;
  
  /**
   * Constructor del componente.
   * @param runServ Servicio que se encarga de manejar la ejecucion manual o automatica del programa
   * @param dialog Servicio que permite abrir una MatDialog. Se utiliza para solicitar al usuario
   * que seleccione ya sea el modo manual o automatico en caso que quiera correr el programa antes
   * de haber definido que tipo de ejecucion desea.
   */
  constructor(private runServ : RunControllerService, 
              private problemContServ : ProblemControllerService,
              private dialog : MatDialog) { 
    this.manual = false;
    this.arrSize = 4;
    this.runSpeed = 1;
    this.running = this.runServ.isRunning();
    this.runServ.runObs.subscribe((runState) => this.running=runState);
    this.algorithmParameters = [];
    this.problemContServ.selecProblemObs.subscribe((problem : Problem) => {
      this.algorithmParameters = problem.getProblemConfig().getParameters();
    });
  }

  /**
   * Funcion que emite el evento 'runEvent'(atrapado por 'RunControllerService') en donde
   * el valor emitido son las settings definidas por el usuario comprendidas en una variable
   * de tipo 'RunParams'. En caso que no se haya elegido un modo de uso se abre un MatDialog
   * con los contenidos del componente 'UserModeWarningComponent'.
   */
  runProgram(){
    let runParams : RunParams = {
      runMode : !this.manual ? RunMode.AUTOMATIC : RunMode.MANUAL,
      parameters : this.algorithmParameters,
      velocity : this.runSpeed,
      memorization : this.DPDesired
    }
    this.runEvent.emit(runParams);
  }

  /**
   * Setea la variable local 'runSpeed' al grado de velocidada definido por el usuario
   * en el MatSlider diseñado para regular la velocidad.
   * @param speedState Estado del valor actual del slide comprendido en el MatSliderChange de velocidad
   */
  adjustSpeed(speedState: MatSliderChange){
    if (speedState.value){
      this.runSpeed = speedState.value;
    }
  }

  /**
   * Setea la variable local 'arrSize' al tamaño del array definido por el usuario
   * en el MatSlider diseñado para regular el tamaño del array.
   * @param arrSizeState Estado del valor actual del tamaño del array comprendido en el MatSliderChange del array
   */
  adjustArrSize(arrSizeState: MatSliderChange){
    if (arrSizeState.value){
      this.arrSize = arrSizeState.value;
    }
    this.sizeChange.emit(this.arrSize);
  }

  /**
   * Cambia el valor de la variable local 'manual' a true si el usuario realizo un click
   * sobre el radio button que señala el modo manual, o false en caso contrario. A su vez
   * setea la variable local 'userModeButtonActive' a true, lo cual indica que el usuario
   * se decidio un modo de ejecucion. Esto ultimo implicara que el mat dialog que le dice
   * al usuario que eliga un modo antes de realizar la ejecucion ya no se vera trigereado.
   * 
   * @param valueChecked Instancia del MatRadioChange que contiene el tipo de uso deseado
   */
   recordExecModeInteraction(valueChecked: MatRadioChange){
    this.manual = valueChecked.value == "true" ? true : false;
    this.userModeButtonActive = true;
    this.execModeEvent.emit(this.manual ? RunMode.MANUAL : RunMode.AUTOMATIC);
  }

  /**
   * Evento emitido cuando el usuario realiza un click sobre el boton 'Explicacion'. El mismo
   * sera atrapado por el app.component que abrira el modal con la explicacion requerida.
   */
   emitSolucionDisplayEvent(){
    this.explEvent.emit();
  }

  /**
   * Evento emitido cuando el usuario realiza un click sobre el boton 'Codigo'. El mismo
   * sera atrapado por el app.component que abrira el modal con el codigo requerido.
   */
   emitEnunciadoDisplayEvent(){
    this.enunciadoEvent.emit();
  }

  /**
   * Setea el valor de 'timerDesired' en true o false en concordancia con el
   * estado 'checked' del checkbox.
   * @param event Valor que contiene el estado del MatChecbox destinado al timer
   */
  setTimerDesired(event : MatCheckboxChange){
    this.timerDesired = event.checked;
  }

  setDPDesired(event : MatCheckboxChange){
    this.DPDesired = event.checked;
    this.dpDesiredEvent.emit(this.DPDesired);
  }


}
