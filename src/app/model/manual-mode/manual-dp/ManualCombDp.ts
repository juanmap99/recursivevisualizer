import { ParamType } from "../../problem-components/ParamType";
import { TableRow } from "../../table-rel/TableRow";
import { ManualAlg } from "../ManualAlg";
import { ManualState } from "../ManualState";

export class ManualCombDp extends ManualAlg{
    setInitState(): ManualState {
        let arrayElem : number[] = this.problem.getProblemConfig()
                            .getParamByName("Array elementos")
                            .paramValue
        let targetSum : number = this.problem.getProblemConfig()
                            .getParamByName("Target sum")
                            .paramValue
        return {
            lineExec : 11,
            posIdCol : 1,
            varState: [arrayElem,targetSum,-1,0,1,0,0, new Map<number,number>()],
            varDesc: ["nums","target","index","totalSol","counter","curDepth","returnCounter","memo"]
        }
    }

    isNewInstance(prevS: ManualState, newS : ManualState) : boolean{
        return prevS.varState[prevS.posIdCol] > newS.varState[newS.posIdCol];
    }

    postProcessCurState(curState : ManualState) : ManualState{
        if(curState.lineExec == 8){
            curState.lineExec = 7
        }
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
                counter : state.varState[4],
                treeDepth : state.varState[5],
                parameters : [{
                    paramName : "nums",
                    paramValue: state.varState[0],
                    placeholder:"",
                    maxLength:30,
                    paramType : ParamType.ARRAY
                },
                {
                    paramName : "target",
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
        this.codeBg.changeCurCounter(state.varState[7]);
        this.codeBg.changeCurDepth(state.varState[8]);
        this.tableServ.addRow(row);
        state.varState[6] = state.varState[4]
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaDos(state : ManualState){
        this.codeBg.changeLineFocus(2);
        let target = state.varState[1]
        if(target >= 0){
            state.lineExec += 1;
        }
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaTres(state : ManualState){
        state.varState[3] = 0;
        state.varState[4] = state.varState[6];
        this.codeBg.changeLineFocus(3);
        this.tableServ.addOutputByCounter(state.varState[4],0);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaCuatro(state : ManualState){
        this.codeBg.changeLineFocus(4);
        let target = state.varState[1]
        if(state.varState[7].get(target) == undefined){
            state.lineExec += 1;
        }
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaCinco(state : ManualState){
        state.varState[3] = state.varState[7].get(state.varState[1]);
        state.varState[4] = state.varState[6];
        this.codeBg.changeLineFocus(5);
        //this.tableServ.addOutputByCounter(state.varState[4],0);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaSeis(state : ManualState){
        this.codeBg.changeLineFocus(6);
        state.lineExec += 1;
        return state;
    }

    ejecutarLineaSiete(state : ManualState){
        this.codeBg.changeLineFocus(7);
        state.varState[2] += 1
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaOcho(state : ManualState){
        this.codeBg.changeLineFocus(8);
        if(state.varState[2] < state.varState[0].length){
            state.lineExec = 1;
            state.varState[1] -= state.varState[0][state.varState[2]];
            state.varState[2] = -1
            state.varState[3] = 0
            state.varState[4] = state.varState[6] + 1;
            state.varState[5] += 1;
        }
        else{
            state.lineExec += 1;
        }
        return state
    }
    ejecutarLineaNueve(state : ManualState){
        this.codeBg.changeLineFocus(9);
        state.varState[7].set(state.varState[1],state.varState[3]);
        this.memoServ.addToMemo(state.varState[1],state.varState[3]);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaDiez(state : ManualState){
        this.codeBg.changeLineFocus(10);
        this.tableServ.addOutputByCounter(state.varState[4],state.varState[3]);
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
        state.varState[7].set(0,1);
        this.memoServ.addToMemo(0,1);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaCatorce(state : ManualState){
        this.codeBg.changeLineFocus(14);
        state.lineExec = 1;
        return state;
    }
    handleReturnVal(waitingState: ManualState, finishedState: ManualState): ManualState {
        let output : number = finishedState.varState[3];
        waitingState.varState[6] = finishedState.varState[6]
        waitingState.varState[3] += output;
        this.tableServ.addOutputByCounter(finishedState.varState[4],output);
        return waitingState;
    }
}