import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CombSumEnunModalComponent } from '../modals/enunciado-modals/comb-sum-enun-modal/comb-sum-enun-modal.component';
import { FibEnunModalComponent } from '../modals/enunciado-modals/fib-enun-modal/fib-enun-modal.component';
import { HouseRobberEnunModalComponent } from '../modals/enunciado-modals/house-robber-enun-modal/house-robber-enun-modal.component';
import { TargetSEnunModalComponent } from '../modals/enunciado-modals/target-senun-modal/target-senun-modal.component';
import { UniquePathsEnunModalComponent } from '../modals/enunciado-modals/unique-paths-enun-modal/unique-paths-enun-modal.component';
import { ParamModalComponent } from '../modals/param-modal/param-modal.component';
import { CombSumSolModalComponent } from '../modals/solucion-modals/comb-sum-sol-modal/comb-sum-sol-modal.component';
import { FibSolModalComponent } from '../modals/solucion-modals/fib-sol-modal/fib-sol-modal.component';
import { HouseRobberSolModalComponent } from '../modals/solucion-modals/house-robber-sol-modal/house-robber-sol-modal.component';
import { TargetSSolModalComponent } from '../modals/solucion-modals/target-ssol-modal/target-ssol-modal.component';
import { UniquePathsSolModalComponent } from '../modals/solucion-modals/unique-paths-sol-modal/unique-paths-sol-modal.component';
import { Dimensions } from '../model/Dimensions';
import { Parameter } from '../model/problem-components/Parameter';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalInstance! : ComponentRef<any>//Holds de instance
  modalObserver! : Subject<string>;//We create a subject with random type, because we just want to notify the parent on destroy
  modalSize : Dimensions = {width:0, height:0};
  modalSizeObs : BehaviorSubject<Dimensions>;

  /**
   * Constructor del servicio.
   * @param factoryResolver Servicio utilizado para obtener la fabrica de un componente
   */
  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.modalSizeObs = new BehaviorSubject<Dimensions>(this.modalSize);
   }

  openParamModal(hostContainer : ViewContainerRef,parametros : Parameter[]){
    let modalFactory = this.factoryResolver.resolveComponentFactory(ParamModalComponent);
    this.modalInstance = hostContainer.createComponent(modalFactory);
    this.modalInstance.instance.parametros = parametros;
    this.modalInstance.instance.closeModalEvent.subscribe(() => this.closeModal());
    this.modalObserver = new Subject<string>();//Usamos subject porque no precisa instanciarlo con un valor.
    return this.modalObserver.asObservable();
  }

  /**
  * Abre el modal al cual referencia 'explId' insertandolo sobre 'hostContainer'.
  * 
  * @param hostContainer instancia de ViewContainerRef sobre la cual agregaremos la modal
  * @param explId String que representa la explicacion de que algoritmo se desea mostrar
  * @returns Observable del modal.
  */
  openExplanationModal(hostContainer : ViewContainerRef, explId: string, modalType: string){
    let modalFactory = this.getModalFactory(explId,modalType);//Trae la fabrica
    this.modalInstance = hostContainer.createComponent(modalFactory);//Crea el componente dentro del hostContainer
    this.modalInstance.instance.closeModalEvent.subscribe(() => this.closeModal());
    this.modalObserver = new Subject<string>();//Usamos subject porque no precisa instanciarlo con un valor.
    return this.modalObserver.asObservable();
  }


  /**
   * Retorna la fabrica del componente identificado por 'elemId'.
   * 
   * @param elemId String que representa la explicacion de que algoritmo se desea mostrar
   * @returns ComponentFactory del componente identificado por 'elemId'.
   */
  getModalFactory(elemId: string, type: string): ComponentFactory<any>{
    switch(elemId){
      case("Fibonacci"):
        if(type == "solucion") return this.factoryResolver.resolveComponentFactory(FibSolModalComponent);
        return this.factoryResolver.resolveComponentFactory(FibEnunModalComponent);
      case("TargetSum"):
        if(type == "solucion") return this.factoryResolver.resolveComponentFactory(TargetSSolModalComponent);
        return this.factoryResolver.resolveComponentFactory(TargetSEnunModalComponent);
      case("CombSum"):
        if(type == "solucion") return this.factoryResolver.resolveComponentFactory(CombSumSolModalComponent);
        return this.factoryResolver.resolveComponentFactory(CombSumEnunModalComponent);
      case("HouseRobber"):
        if(type == "solucion") return this.factoryResolver.resolveComponentFactory(HouseRobberSolModalComponent);
        return this.factoryResolver.resolveComponentFactory(HouseRobberEnunModalComponent);
      case("UniquePaths"):
        if(type == "solucion") return this.factoryResolver.resolveComponentFactory(UniquePathsSolModalComponent);
        return this.factoryResolver.resolveComponentFactory(UniquePathsEnunModalComponent);
    }
    return this.factoryResolver.resolveComponentFactory(FibSolModalComponent);
  }

  /**
   * Cierra la modal.
   */
  closeModal(){
    this.modalObserver.next("Closing.");
    this.modalObserver.complete();
    this.modalInstance.destroy();
  }

  /**
   * Calcula el ancho y alto en px que tendra la modal en base al tamaño de la pantalla
   * y actualizar el observable.
   * 
   * @param screenWidth Valor que representa el ancho de la pantalla en px
   * @param screenHeight Valor que representa el alto de la pantalla
   */
  calculateModalSize(screenWidth:number, screenHeight:number){
    let width = 1270 > screenWidth ? 1270 : screenWidth;
    let height = 850 > screenHeight ? 850 : screenHeight;
    this.modalSize.width = width*0.40;
    this.modalSize.height = height*0.70;
    this.modalSizeObs.next(this.modalSize);
  }

  getModalDimensions() : Dimensions{
    return this.modalSize;
  }
}
