import { TableRow } from "./TableRow";

export class DataTable{
    headers : string[] = ["Counter","Tree depth", "Parameters", "Output"];
    data : TableRow[] = [];
    isEmpty : boolean = true;

    constructor(){}

    addRow(row : TableRow){
        if(row.len == this.headers.length){
            this.data.push(row)
            this.isEmpty = false;
        }
    }

    sortByTreeDepth(ascending :  boolean){
        if(ascending){
            this.data.sort((e1,e2)=> e1.values.treeDepth - e2.values.treeDepth)
        }
        else{
            this.data.sort((e1,e2)=> e2.values.treeDepth - e1.values.treeDepth)
        }
    }

    sortByCounter(ascending :  boolean){
        if(ascending){
            this.data.sort((e1,e2)=> e1.values.counter - e2.values.counter)
        }
        else{
            this.data.sort((e1,e2)=> e2.values.counter - e1.values.counter)
        }
    }

    sortByOutput(ascending :  boolean){
        if(ascending){
            this.data.sort((e1,e2)=> e1.values.returnVal - e2.values.returnVal)
        }
        else{
            this.data.sort((e1,e2)=> e2.values.returnVal - e1.values.returnVal)
        }
    }

    clearTable(){
        this.isEmpty = true;
        this.data = []
    }

    setHeaders(headers : string[]){
        this.headers = headers;
    }
}