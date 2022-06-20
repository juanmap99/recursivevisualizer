import { ParamType } from "../../problem-components/ParamType";
import { TableRow } from "../../table-rel/TableRow";
import { ManualAlg } from "../ManualAlg";
import { ManualState } from "../ManualState";

export class ManualTSumDp extends ManualAlg{
    setInitState(): ManualState {
        let arrayElem : number[] = this.problem.getProblemConfig()
                            .getParamByName("Array elementos")
                            .paramValue
        let targetSum : number = this.problem.getProblemConfig()
                            .getParamByName("Target sum")
                            .paramValue
        return {
            lineExec : 13,
            posIdCol : 2,
            varState: [arrayElem,targetSum,arrayElem.length-1,0,undefined,undefined,undefined,1,0,0,new Map<string,number>()],
            varDesc: ["nums","target","index","curr_sum","solsSumando","solsRestando","totalSol","counter","curDepth","returnCounter","memo"]
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
        else if(state.lineExec == 15){
            state = this.ejecutarLineaQuince(state)
        }
        else if(state.lineExec == 16){
            state = this.ejecutarLineaDieciseis(state)
        }
        return state;
    }
    ejecutarLineaUno(state : ManualState){
        let row : TableRow = {
            values : {
                counter : state.varState[7],
                treeDepth : state.varState[8],
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
                },
                {
                    paramName : "index",
                    paramValue: state.varState[2],
                    placeholder:"",
                    maxLength:3,
                    paramType : ParamType.NUMBER
                },
                {
                    paramName : "curr_sum",
                    paramValue: state.varState[3],
                    placeholder:"",
                    maxLength:8,
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
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaDos(state : ManualState){
        this.codeBg.changeLineFocus(2);
        let index = state.varState[2];
        let curr_sum = state.varState[3];
        let resInMemo = state.varState[10].get(index+":"+curr_sum)
        if(resInMemo == undefined){
            state.lineExec += 1;
        }
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaTres(state : ManualState){
        let index = state.varState[2];
        let curr_sum = state.varState[3];
        let resInMemo = state.varState[10].get(index+":"+curr_sum)
        state.varState[4] = resInMemo;
        state.varState[5] = 0;
        state.varState[6] = resInMemo;
        state.varState[9] = state.varState[7];
        this.codeBg.changeLineFocus(3);
        this.tableServ.addOutputByCounter(state.varState[7],resInMemo);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaCuatro(state : ManualState){
        this.codeBg.changeLineFocus(4);
        let index = state.varState[2]
        let curr_sum = state.varState[3]
        let target = state.varState[1]
        if(index >= 0 || curr_sum != target){
            state.lineExec += 1;
        }
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaCinco(state : ManualState){
        state.varState[4] = 1;
        state.varState[5] = 0;
        state.varState[6] = 1;
        state.varState[9] = state.varState[7];
        this.codeBg.changeLineFocus(5);
        this.tableServ.addOutputByCounter(state.varState[7],1);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaSeis(state : ManualState){
        this.codeBg.changeLineFocus(6);
        let index = state.varState[2]
        if(index >= 0){
            state.lineExec += 1;
        }
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaSiete(state : ManualState){
        state.varState[4] = 0;
        state.varState[5] = 0;
        state.varState[6] = 0;
        state.varState[9] = state.varState[7];
        this.codeBg.changeLineFocus(7);
        this.tableServ.addOutputByCounter(state.varState[7],0);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaOcho(state : ManualState){
        this.codeBg.changeLineFocus(8);
        if(state.varState[4] == undefined){
            state.lineExec = 1;
            state.varState[3] += state.varState[0][state.varState[2]];
            state.varState[2] -= 1;
            state.varState[7] += 1;
            state.varState[8] += 1;
        }
        else{
            state.lineExec += 1;
        }
        return state
    }
    ejecutarLineaNueve(state : ManualState){
        this.codeBg.changeLineFocus(9);
        if(state.varState[5] == undefined){
            state.lineExec = 1;
            state.varState[4] = undefined;
            state.varState[3] -= state.varState[0][state.varState[2]];
            state.varState[2] -= 1;
            state.varState[7] = state.varState[9] + 1;
            state.varState[8] += 1;
        }
        else{
            state.lineExec += 1;
        }
        return state
    }
    ejecutarLineaDiez(state : ManualState){
        this.codeBg.changeLineFocus(10);
        state.varState[6] = state.varState[4] + state.varState[5]
        state.lineExec += 1;
        return state
    }
    ejecutarLineaOnce(state : ManualState){
        this.codeBg.changeLineFocus(11);
        let index = state.varState[2];
        let curr_sum = state.varState[3];
        state.varState[10].set(index+":"+curr_sum,state.varState[6]);
        this.memoServ.addToMemo(index+":"+curr_sum,state.varState[6]);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaDoce(state : ManualState){
        this.codeBg.changeLineFocus(12);
        this.tableServ.addOutputByCounter(state.varState[7],state.varState[6]);
        state.lineExec = -1;
        return state;
    }
    ejecutarLineaTrece(state : ManualState){
        this.codeBg.changeLineFocus(13);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaCatorce(state : ManualState){
        this.codeBg.changeLineFocus(14);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaQuince(state : ManualState){
        this.codeBg.changeLineFocus(15);
        state.lineExec += 1;
        return state;
    }
    ejecutarLineaDieciseis(state : ManualState){
        this.codeBg.changeLineFocus(16);
        state.lineExec = 1;
        return state;
    }
    handleReturnVal(waitingState: ManualState, finishedState: ManualState): ManualState {
        let output : number = finishedState.varState[6];
        waitingState.varState[9] = finishedState.varState[9]
        if(waitingState.varState[4] == undefined){
            waitingState.varState[4] = output;
        }
        else{
            waitingState.varState[5] = output;
            //this.tableServ.addOutputByCounter(waitingState.varState[7],output);
        }
        this.tableServ.addOutputByCounter(finishedState.varState[7],output);
        return waitingState;
    }
}