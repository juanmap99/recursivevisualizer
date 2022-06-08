import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Dimensions } from 'src/app/model/Dimensions';
import { Parameter } from 'src/app/model/problem-components/Parameter';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-param-modal',
  templateUrl: './param-modal.component.html',
  styleUrls: ['./param-modal.component.scss']
})
export class ParamModalComponent{

  @Output() closeModalEvent = new EventEmitter();
  modalWidth : number = 0;
  modalHeight : number = 0;
  curModalTab : number = 0;
  parametros : Parameter[] = [];
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


}
