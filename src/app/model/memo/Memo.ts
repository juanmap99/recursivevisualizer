import { BehaviorSubject } from "rxjs";
import { MemoDic } from "./MemoDic";

export class Memo{
    data : MemoDic[];
    empty : boolean = true;
    longestKey : number;
    longestValue : number;

    constructor(){
        this.data = [];
        this.longestKey = 0;
        this.longestValue = 0;
    }

    addEntry(key : any, value : any){
        this.empty = false;
        let entry : MemoDic = new MemoDic(key.toString(), value.toString());
        this.longestKey = entry.key.length > this.longestKey ? entry.key.length : this.longestKey;
        this.longestValue = entry.value.length > this.longestValue ? entry.value.length : this.longestValue;
        this.data.push(entry);
    }

    changeValue(index:number,value:any){
        this.data[index].changeValue(value.toString());
    }

    clearMemo(){
        this.data = [];
        this.empty = true;
    }
}
