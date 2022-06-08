import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataTable } from '../model/table-rel/DataTable';
import { TableManagerService } from '../services/table-manager.service';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ContainerSizeService } from '../services/container-size-service.service';
import { Parameter } from '../model/problem-components/Parameter';
import { RunControllerService } from '../services/run-controller.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  table : DataTable = new DataTable();
  contWidth : number = 0;
  contHeight : number = 0;
  iconUp = faSortUp;
  iconDown = faSortDown;
  isRunning : boolean = false;
  @Output() paramsModalEvent = new EventEmitter<Parameter[]>();

  constructor(private tableManager  :TableManagerService,
              private sizeServ : ContainerSizeService,
              private runServ : RunControllerService) {
    this.runServ.runObs.subscribe(running => this.isRunning = running);
    this.tableManager.tableObs.subscribe(newTable => this.table = newTable);
    this.sizeServ.execBodyDimObs.subscribe(newSize =>{
      this.contWidth = newSize.width;
      this.contHeight = newSize.height;
    })
   }

  sortByCounter(asc : boolean){
    this.table.sortByCounter(asc);
  }

  sortByTreeDepth(asc : boolean){
    this.table.sortByTreeDepth(asc);
  }

  sortByOutput(asc : boolean){
    this.table.sortByOutput(asc);
  }

  ngOnInit(): void {
  }

  getCodeBoxWidth(){
    return this.contWidth - (this.contWidth*0.40)
  }

  isNan(input: unknown) {
    return typeof input === 'number' && input !== input;
  }

  emitParamsModalEvent(params : Parameter[]){
    this.paramsModalEvent.emit(params);
  }
}
