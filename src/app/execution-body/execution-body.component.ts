import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContainerSizeService } from '../services/container-size-service.service';

import { HttpClient } from '@angular/common/http';
import { ProblemControllerService } from '../services/problem-controller.service';
import { RunControllerService } from '../services/run-controller.service';
import { RunMode } from '../model/run/RunMode';
import { CodeManagerService } from '../services/code-manager.service';
import { Code } from '../model/codigo/Code';
import { CodeLine } from '../model/codigo/CodeLine';
import { CodeSegment } from '../model/codigo/CodeSegment';
import { CodeBgService } from '../services/code-bg.service';
import { TableManagerService } from '../services/table-manager.service';
import { DataTable } from '../model/table-rel/DataTable';
import { Parameter } from '../model/problem-components/Parameter';
import { MemoService } from '../services/memo.service';
import { Memo } from '../model/memo/Memo';

@Component({
  selector: 'app-execution-body',
  templateUrl: './execution-body.component.html',
  styleUrls: ['./execution-body.component.scss']
})
export class ExecutionBodyComponent implements OnInit {
  contWidth : number = 0;
  contHeight : number = 0;
  code : Code = new Code();
  running : boolean = false;
  lenDepth : number = 1;
  curDepth : number = 0;
  curCounter : number = 0;
  lineFocus : number = -1;
  dpOn : boolean = false;
  modoManualOn : boolean = false;
  modoManualDisabled : boolean = false;
  memo : Memo = new Memo();
  table : DataTable = new DataTable();
  buttonWidth : number = 0;
  buttonSectionMargin : number = 0;
  @Output() paramsModalEvent = new EventEmitter<Parameter[]>();
  
  constructor(private sizeServ : ContainerSizeService,
              private codeManag : CodeManagerService,
              private codeBgserv : CodeBgService,
              private tableManager  :TableManagerService,
              private runServ : RunControllerService,
              private memoServ : MemoService,
              private probContr : ProblemControllerService) { 
                this.runServ.modoManualDisabledObs.subscribe(dis => this.modoManualDisabled = dis);
                this.runServ.runningModeObs.subscribe(newMode => {
                  this.modoManualOn = newMode == RunMode.MANUAL ? true : false;
                })
                this.probContr.dpModeObs.subscribe(dpOn =>this.dpOn = dpOn);
                this.memoServ.memoObs.subscribe(newMemo => {
                  this.memo = newMemo
                  console.log(this.memo.longestValue)
                });
                this.runServ.runObs.subscribe(runState => this.running = runState);
                this.tableManager.tableObs.subscribe(newTable => this.table = newTable);
                this.codeBgserv.lineaFocusObs.subscribe(newLine =>this.lineFocus = newLine);
                this.codeBgserv.curDepthObs.subscribe(newDepth => {
                  this.curDepth = newDepth;
                  this.lenDepth = this.curDepth.toString().length;
                });
                this.codeBgserv.curCounterObs.subscribe(newC => this.curCounter = newC);
                this.codeManag.codigoObs.subscribe(newCode => this.code = newCode);
                this.sizeServ.execBodyDimObs.subscribe(newSize =>{
                  this.buttonWidth = newSize.width > 1190 ? 150 : 115;
                  this.buttonSectionMargin = newSize.width > 1190 ? 50 : 30;
                  this.contWidth = newSize.width;
                  this.contHeight = newSize.height;
                })
    }

  doNextStep(){
    this.runServ.runManualSortingStep();
  }

  stopRunningProgram(){
    this.probContr.killExecution()
    //this.runServ.stopProgram();
  }
  
  lengthToWidth(){
    if(this.lenDepth == 1){
      return 35;
    }
    if(this.lenDepth == 2){
      return 55;
    }
    if(this.lenDepth == 3){
      return 70;
    }
    return 85;
  }

  ngOnInit(): void {
  }

  getCodeBoxWidth(){
    return this.contWidth - (this.contWidth*0.40)
  }

  getCodeBoxHeight(){
    return this.contHeight - (this.contHeight*0.50)
  }

  getLines(){
    return this.code.lineas;
  }

  getLineSegments(linea : CodeLine){
    return linea.contenido;
  }

  getSegmentClass(segment : CodeSegment){
    return segment.cssClass;
  }

  getSegmentText(segment : CodeSegment){
    return segment.texto;
  }
  
  emitParamsModalEvent(params : Parameter[]){
    this.paramsModalEvent.emit(params);
  }
}
