import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Code } from '../model/codigo/Code';
import { ProblemControllerService } from './problem-controller.service';

@Injectable({
  providedIn: 'root'
})
export class CodeManagerService {
  dpMode : boolean = false;
  problemId : string = "";
  codigo : Code;
  codigoObs : BehaviorSubject<Code>;

  constructor( private problemServ : ProblemControllerService,
               private http: HttpClient) {
      this.codigo = new Code();
      this.codigoObs = new BehaviorSubject<Code>(this.codigo);
      this.problemServ.selecProblemObs.subscribe(newProblem =>{
        this.problemId = newProblem.getProblemID();
        this.loadCodeFromFile();
      });
      this.problemServ.dpModeObs.subscribe(newMode => {
        this.dpMode = newMode;
        this.loadCodeFromFile();
      });
   }

   loadCodeFromFile(){
      let newCode : Code = new Code();
      let dpModeString = this.dpMode ? "dp" : "nodp";
      let ruta : string = "assets/code/format_code/"+this.problemId+"_"+ dpModeString +"_f.txt";
      this.http.get(ruta,{
      responseType: 'text'
      }).subscribe(data=>{
        newCode.loadFromData(data);
      })
      
      let rutaRaw : string = "assets/code/copy/"+this.problemId+"_"+ dpModeString +".txt";
      this.http.get(rutaRaw,{
      responseType: 'text'
      }).subscribe(rawCode=>{
        newCode.setRawCode(rawCode);
      })
      this.codigo = newCode;
      this.updateObs();
   }
   
   updateObs(){
     this.codigoObs.next(this.codigo);
   }

   activateFocusOnLine(numeroLinea : number){
     this.codigo.activateFocusOnLine(numeroLinea)
   }

   desactivateFocusOnLine(numeroLinea : number){
    this.codigo.desactivateFocusOnLine(numeroLinea)
  }
}
