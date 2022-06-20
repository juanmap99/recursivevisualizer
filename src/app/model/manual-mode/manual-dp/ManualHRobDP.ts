import { ParamType } from "../../problem-components/ParamType";
import { TableRow } from "../../table-rel/TableRow";
import { ManualAlg } from "../ManualAlg";
import { ManualState } from "../ManualState";

export class ManualHRobDp extends ManualAlg{
    setInitState(): ManualState {
        let arrayElem : number[] = this.problem.getProblemConfig()
                            .getParamByName("Dinero casas")
                            .paramValue
        return {
            lineExec : 11,
            posIdCol : 1,
            varState: [arrayElem,arrayElem.length-1,undefined,undefined,undefined,1,0,0,false,[]],
            varDesc: ["arr_casas","index","robar","no_robar","maxProfit","counter","curDepth","returnCounter","robar_returned","memo"]
        }
    }

    isNewInstance(prevS: ManualState, newS : ManualState) : boolean{
        return prevS.varState[prevS.posIdCol] > newS.varState[newS.posIdCol];
    }

    postProcessCurState(curState : ManualState) : ManualState{
        //No realiza cambios
        return curState;
    }
    
    runNextStep(state: ManualState): ManualState {
        if(state.lineExec == 1){
            state = this.ejecutarLineaUno(state)
        }
        else if(state.lineExec == 2){
            state = this.ejecutarLineaDos(state)
        }   
        else if(state.lineExec == 3){
            state = this.ejecutarLineaTres(state)
        }
        else if(state.lineExec == 4){
            state = this.ejecutarLineaCuatro(state)
        }
        else if(state.lineExec == 5){
            state = this.ejecutarLineaCinco(state)
        }
        else if(state.lineExec == 6){
            state = this.ejecutarLineaSeis(state)
        }
        else if(state.lineExec == 7){
            state = this.ejecutarLineaSiete(state)
        }
        else if(state.lineExec == 8){
            state = this.ejecutarLineaOcho(state)
        }
        else if(state.lineExec == 9){
            state = this.ejecutarLineaNueve(state)
        }
        else if(state.lineExec == 10){
            state = this.ejecutarLineaDiez(state)
        }
        else if(state.lineExec == 11){
            state = this.ejecutarLineaOnce(state)
        }
        else if(state.lineExec == 12){
            state = this.ejecutarLineaDoce(state)
        }
        else if(state.lineExec == 13){
            state = this.ejecutarLineaTrece(state)
        }
        else if(state.lineExec == 14){
            state = this.ejecutarLineaCatorce(state)
        }
        return state;
    }
    ejecutarLineaUno(state : ManualState){
        let row : TableRow = {
            values : {
                counter : state.varState[5],
                treeDepth : state.varState[6],
                parameters : [{
                    paramName : "arr_casas",
                    paramValue: state.varState[0],
                    placeholder:"",
                    maxLength:30,
                    paramType : ParamType.ARRAY
                },
                {
                    paramName : "index",
                    paramValue: state.varState[1],
                    placeholder:"",
                    maxLength:3,
                    paramType : ParamType.NUMBER
                }],
                returnVal : NaN
            },
            len : 4
        }
        this.codeBg.changeLineFocus(1);
        this.codeBg.changeCurCounter(state.varState[5]);
        this.codeBg.changeCurDepth(state.varState[6]);
        this.tableServ.addRow(row);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaDos(state : ManualState){
        this.codeBg.changeLineFocus(2);
        let index = state.varState[1]
        if(index >= 0){
            state.lineExec += 1;
        }
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaTres(state : ManualState){
        state.varState[2] = 0;
        state.varState[3] = 0;
        state.varState[4] = 0;
        state.varState[7] = state.varState[5];
        this.codeBg.changeLineFocus(3);
        this.tableServ.addOutputByCounter(state.varState[5],0);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaCuatro(state : ManualState){
        this.codeBg.changeLineFocus(4);
        let index = state.varState[1]
        if(state.varState[9][index] == -1){
            state.lineExec += 1;
        }
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaCinco(state : ManualState){
        let resInMemo = state.varState[9][state.varState[1]]
        state.varState[2] = resInMemo;
        state.varState[3] = 0;
        state.varState[4] = resInMemo;
        state.varState[7] = state.varState[5];
        this.codeBg.changeLineFocus(5);
        this.tableServ.addOutputByCounter(state.varState[5],resInMemo);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaSeis(state : ManualState){
        this.codeBg.changeLineFocus(6);
        if(state.varState[2] == undefined){
            state.lineExec = 1;
            //state.varState[2] = state.varState[0][state.varState[1]]
            state.varState[1] -= 2;
            state.varState[5] += 1;
            state.varState[6] += 1;
        }
        else{
            state.varState[2] += state.varState[0][state.varState[1]]
            state.lineExec += 1;
        }
        return state
    }
    ejecutarLineaSiete(state : ManualState){
        this.codeBg.changeLineFocus(7);
        if(state.varState[3] == undefined){
            state.lineExec = 1;
            state.varState[2] = undefined;
            //state.varState[8] = false
            state.varState[1] -= 1;
            state.varState[5] = state.varState[7] + 1;
            state.varState[6] += 1;
        }
        else{
            state.lineExec += 1;
        }
        return state
    }
    ejecutarLineaOcho(state : ManualState){
        this.codeBg.changeLineFocus(8);
        state.varState[4] = Math.max(state.varState[2],state.varState[3]);
        this.tableServ.addOutputByCounter(state.varState[5],state.varState[4]);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaNueve(state : ManualState){
        this.codeBg.changeLineFocus(9);
        state.varState[9][state.varState[1]] = state.varState[4]
        this.memoServ.changeValue(state.varState[1],state.varState[4]);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaDiez(state : ManualState){
        this.codeBg.changeLineFocus(10);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaOnce(state : ManualState){
        this.codeBg.changeLineFocus(11);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaDoce(state : ManualState){
        this.codeBg.changeLineFocus(12);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaTrece(state : ManualState){
        this.codeBg.changeLineFocus(13);
        let memo : number[] = [];
        for(let i in state.varState[0]){
            memo.push(-1);
            this.memoServ.addToMemo(i,-1)
        }
        state.varState[9] = memo;
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaCatorce(state : ManualState){
        this.codeBg.changeLineFocus(14);
        state.lineExec = 1;
        return state;
    }

    handleReturnVal(waitingState: ManualState, finishedState: ManualState): ManualState {
        let output : number = finishedState.varState[4];
        waitingState.varState[7] = finishedState.varState[7]
        if(waitingState.varState[2] == undefined){
            waitingState.varState[2] = output;
            //waitingState.varState[8] = true
        }
        else{
            waitingState.varState[3] = output;
            //this.tableServ.addOutputByCounter(waitingState.varState[5], Math.max(waitingState.varState[2],waitingState.varState[3]));
        }
        this.tableServ.addOutputByCounter(finishedState.varState[5],output);
        return waitingState;
    }
}