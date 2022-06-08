import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataTable } from '../model/table-rel/DataTable';
import { TableRow } from '../model/table-rel/TableRow';

@Injectable({
  providedIn: 'root'
})
export class TableManagerService {
  table : DataTable = new DataTable();
  tableObs : BehaviorSubject<DataTable>;

  constructor() { 
    this.tableObs = new BehaviorSubject<DataTable>(this.table);
  }

  addRow(row : TableRow){
    this.table.addRow(row)
    this.updateObs();
  }

  addOutputByCounter(counter : number, returnV : number){
    this.table.data[counter-1].values.returnVal = returnV;
    this.updateObs();
  }

  clearRows(){
    this.table.clearTable();
    this.updateObs();
  }

  sortByOutput(ascending :  boolean){
      this.table.sortByOutput(ascending);
      this.updateObs();
  }

  sortByTreeDepth(ascending :  boolean){
    this.table.sortByTreeDepth(ascending);
    this.updateObs();
  }

  sortByCounter(ascending :  boolean){
    this.table.sortByCounter(ascending);
    this.updateObs();
  }

  updateObs(){
    this.tableObs.next(this.table);
  }
}
