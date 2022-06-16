import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Memo } from '../model/memo/Memo';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  memo : Memo;
  memoObs : BehaviorSubject<Memo>;
  constructor() { 
    this.memo = new Memo();
    this.memoObs = new BehaviorSubject<Memo>(this.memo);
  }

  addToMemo(key : any, value : any){
    this.memo.addEntry(key,value);
    this.memoObs.next(this.memo);
  }

  clearMemo(){
    this.memo.clearMemo();
    this.memoObs.next(this.memo);
  }

  changeValue(index:number,value:any){
    this.memo.changeValue(index,value);
  }
}
