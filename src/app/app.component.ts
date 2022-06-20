import { Component, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Dimensions } from './model/Dimensions';
import { Parameter } from './model/problem-components/Parameter';
import { RunMode } from './model/run/RunMode';
import { RunParams } from './model/run/RunParams';
import { ContainerSizeService } from './services/container-size-service.service';
import { ModalService } from './services/modal.service';
import { ProblemControllerService } from './services/problem-controller.service';
import { RunControllerService } from './services/run-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild("modalContainer", { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;

  title = 'recursivevisualizer';
  public scWidth: any;
  public scHeight: any;
  running : boolean;
  algoritmoElegido : string;
  modalWidth : number = 0;
  modalHeight : number = 0;
  configDimension : Dimensions = {width:0, height:0};
  execBodyDimension : Dimensions = {width:0, height:0};
  openModal : boolean = false;

  /**
   * Constructor del app component.
   * 
   * @param arrService Servicio que nos ofrece funcionalidades para realizar el control el array a visualizar
   * y ejercer cambios sobre el mismo
   * @param colorServ Servicio que ofrece funcionalidades para definir los colores de los indices de los
   * elementos del array.
   * @param colRefServ Servicio que nos ofrece funcionalidades para manejar las referencias propias a cada algoritmo
   * @param runServ Servicio a traves del cual podemos setear los parametros de ejecucion y realizar
   * la ejecucion ya sea manual o automatica del algoritmo elegido.
   * @param modalServ Servicio a traves del cual se muestran las diversas modal en pantalla.
   * @param auxServ Servicio que nos ofrece diversas funcionalidades para definir y alterar
   * variables auxiliares que son usadas por diversos algoritmos.
   */
  constructor(private runServ: RunControllerService,
              private modalServ: ModalService,
              private problemContServ : ProblemControllerService,
              private boxSizeServ: ContainerSizeService){
    this.running = false;
    this.algoritmoElegido = "Fibonacci";
    this.runServ.runObs.subscribe(newState => this.changeRunningState(newState));
  }

  /**
   * Funcion que corre en el 'init' que llamara a una funcion que actualizar el valor
   * de toda variabla dependiente del tamaño de la pantalla del usuario.
   */
  ngOnInit(): void {
    this.updateSizeDependantVar();
  }

  setCurrentProblem(algoritmoElegido : string){
    if(this.algoritmoElegido != algoritmoElegido){
        if(this.running){
          //this.runServ.stopProgram();
          this.problemContServ.killExecution()
        }
        this.algoritmoElegido = algoritmoElegido;
        this.problemContServ.setSelectedProblem(algoritmoElegido);
    }
  }

  /**
   * Cambia la variable local 'running' a true en los casos en donde el algoritmo este ejecutandose
   * y en false en casos contrarios. A su vez se desuscribe a la variable que se encarga de hacer un
   * recording del tiempo de ejecucion del algoritmo en el momento que el algoritmo pare su ejecucion.
   * @param newState Estado de ejecucion.
   */
  changeRunningState(newState: boolean){
    this.running = newState;
  }


  /**
   * Funcion que llama al a funcion que actualiza toda variable dependiente del tamaño de la pantalla del usuario
   * en el momento que existe un resize.
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.updateSizeDependantVar();
  }

  /**
   * Actualiza todas las variables dependientes del tamaño. Definimos a su vez
   * que el tamaño de width minimo de nuestra pagina sera de 1270 pixeles de largo
   * por 800 pixeles de alto.
   */
  updateSizeDependantVar(){
    this.scWidth = window.innerWidth < 1270 ? 1270 : window.innerWidth;
    this.scHeight = window.innerHeight < 850 ? 850 : window.innerHeight;
    this.modalServ.calculateModalSize(this.scWidth,this.scHeight);
    this.boxSizeServ.calculateContainersSize(this.scWidth,this.getBodyHeight());
    this.modalWidth = this.modalServ.modalSize.width;
    this.modalHeight = this.modalServ.modalSize.height;
    this.configDimension = this.boxSizeServ.configDimension;
    this.execBodyDimension = this.boxSizeServ.execBodyDimension;
  }

  /**
   * Devuelve la altura en pixeles del cuerpo de la pagina exceptuando la toolbar
   * que se encuentra por encima de ello.
   * @returns Altura de la seccion en donde se encontrara el cuerpo de la pagina. 
   */
  getBodyHeight(){
    let height = this.scHeight - 85;//75px de la nav bar
    return height < 850 ? 850 : height
  }

  /**
   * Devuelve la altura en pixeles de la lamina opaca en el background al abrir un modal
   * @returns Altura del background de la pagina sobre ejecucion del modal. 
   */
  getModalBackgroundHeight(){
    return this.getBodyHeight() + 85;
  }

  runProgram(runParams : RunParams){
    this.problemContServ.executeProblem(runParams);
  }

  /**
   * Llama al servicio que maneja la ejecucion del programa indicandole que detenga la ejecucion
   */
  killExecution(){
    this.runServ.stopProgram();
  }

  /**
   * Utiliza el servicio que maneja las modals para que haga un display de la explicación
   * del algoritmo actualmente elegido
   */
  displayExplanationModal(){
    this.openModal = true;
    this.modalServ.openExplanationModal(this.modalContainer, this.algoritmoElegido, "solucion")
                 .subscribe(() =>{
                   this.openModal = false;
                 })
  }

  displayEnunciadoEvent(){
    this.openModal = true;
    this.modalServ.openExplanationModal(this.modalContainer, this.algoritmoElegido, "enunciado")
                 .subscribe(() =>{
                   this.openModal = false;
                 })
  }

  changeExecMode(mode : RunMode){
    this.runServ.setRunningMode(mode);
  }

  setDPMode(dpDesired : boolean){
    this.problemContServ.setDPMode(dpDesired);
  }
  /**
   Utiliza el servicio que maneja las modals para indicarle que cierre la misma
   */
  closeModal(){
    this.modalServ.closeModal();
  }

  openParamModal(parameters : Parameter[]){
    this.openModal = true;
    this.modalServ.openParamModal(this.modalContainer, parameters)
                 .subscribe(() =>{
                   this.openModal = false;
                 })
  }
  
}