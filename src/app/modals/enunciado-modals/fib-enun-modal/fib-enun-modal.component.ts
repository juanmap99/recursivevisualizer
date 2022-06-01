import {  Component, EventEmitter, Output } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Dimensions } from '../../../model/Dimensions';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-fib-enun-modal',
  templateUrl: './fib-enun-modal.component.html',
  styleUrls: ['./fib-enun-modal.component.scss']
})
export class FibEnunModalComponent{

  @Output() closeModalEvent = new EventEmitter();
  modalWidth : number = 0;
  modalHeight : number = 0;
  curModalTab : number = 0;
  closeButton = faTimes;

  constructor(private modalServ: ModalService) { 
    modalServ.modalSizeObs.subscribe((newSize)=> this.setNewSize(newSize));
  }

  /**
   * Define el ancho y largo del model size
   * @param newSize Nuevo tamaño del model size
   */
   setNewSize(newSize: Dimensions){
    this.modalWidth = newSize.width;
    this.modalHeight = newSize.height;
  }

  /**
   * Emite un evento que es atrapado por el ModalService que se encarga de cerrra la modal.
   */
  closeModal(){
    this.closeModalEvent.emit();
  }

  /**
   * Funcion que aumenta el tamaño de la variable local 'curModalTab' en pos de que
   * se pase a la siguiente pagina de la explicacion
   */
  goNextPage(){
    this.curModalTab += 1;
  }

  /**
   * Funcion que decrementa el tamaño de la variable local 'curModalTab' en pos de que
   * se vuelva a la pagina previa de la explicacion
   */
  goPreviousPage(){
    this.curModalTab -= 1;
  }

}
