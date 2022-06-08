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

@Component({
  selector: 'app-execution-body',
  templateUrl: './execution-body.component.html',
  styleUrls: ['./execution-body.component.scss']
})
export class ExecutionBodyComponent implements OnInit {
  contWidth : number = 0;
  contHeight : number = 0;
  code : Code = new Code();
  lineFocus : number = -1;
  table : DataTable = new DataTable();
  @Output() paramsModalEvent = new EventEmitter<Parameter[]>();
  
  constructor(private sizeServ : ContainerSizeService,
              private codeManag : CodeManagerService,
              private codeBgserv : CodeBgService,
              private tableManager  :TableManagerService) { 
                this.tableManager.tableObs.subscribe(newTable => this.table = newTable);
                this.codeBgserv.lineaFocusObs.subscribe(newLine => this.lineFocus = newLine)
                this.codeManag.codigoObs.subscribe(newCode => this.code = newCode);
                this.sizeServ.execBodyDimObs.subscribe(newSize =>{
                  this.contWidth = newSize.width;
                  this.contHeight = newSize.height;
                })
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
