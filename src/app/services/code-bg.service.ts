import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeBgService {
  lineaFocus : number = -1;
  lineaFocusObs : BehaviorSubject<number>;
  curDepth : number = 0;
  curDepthObs : BehaviorSubject<number>;
  curCounter : number = 0;
  curCounterObs : BehaviorSubject<number>;

  constructor() { 
    this.lineaFocusObs = new BehaviorSubject<number>(this.lineaFocus);
    this.curDepthObs = new BehaviorSubject<number>(this.curDepth);
    this.curCounterObs = new BehaviorSubject<number>(this.curCounter);
  }

  changeLineFocus(numeroLinea : number){
    this.lineaFocus = numeroLinea;
    this.lineaFocusObs.next(this.lineaFocus);
  }

  changeCurDepth(depth : number){
    this.curDepth = depth;
    this.curDepthObs.next(this.curDepth);
  }

  changeCurCounter(counter : number){
    this.curCounter = counter;
    this.curCounterObs.next(this.curCounter);
  }
}
