import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeBgService {
  lineaFocus : number = -1;
  lineaFocusObs : BehaviorSubject<number>;

  constructor() { 
    this.lineaFocusObs = new BehaviorSubject<number>(this.lineaFocus);
  }

  changeLineFocus(numeroLinea : number){
    this.lineaFocus = numeroLinea;
    this.lineaFocusObs.next(this.lineaFocus);
  }

}
