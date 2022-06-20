import { Statement } from "@angular/compiler";
import { ParamType } from "../../problem-components/ParamType";
import { TableRow } from "../../table-rel/TableRow";
import { ManualAlg } from "../ManualAlg";
import { ManualState } from "../ManualState";

export class ManualFibNoDp extends ManualAlg{

    setInitState(): ManualState {
        let fibCalcular : number = this.problem.getProblemConfig()
                            .getParamByName("Fibonacci calcular")
                            .paramValue
        return {
            lineExec : 1,
            posIdCol : 0,
            varState: [fibCalcular,undefined,undefined,1,0,0],
            varDesc: ["curNum","fibMenosUno","fibMenosDos","counter","curDepth","returnCounter"]
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
        return state;
    }

    ejecutarLineaUno(state: ManualState): ManualState {
        let row : TableRow = {
            values : {
                counter : state.varState[3],
                treeDepth : state.varState[4],
                parameters : [{
                    paramName : "curNum",
                    paramValue: state.varState[0],
                    placeholder:"",
                    maxLength:3,
                    paramType : ParamType.NUMBER
                }],
                returnVal : NaN
            },
            len : 4
        }
        this.codeBg.changeLineFocus(1);
        this.codeBg.changeCurDepth(state.varState[4]);
        this.codeBg.changeCurCounter(state.varState[3]);
        this.tableServ.addRow(row);
        state.lineExec += 1;
        return state
    }

    ejecutarLineaDos(state: ManualState): ManualState {
        this.codeBg.changeLineFocus(2);
        let fibCalcular = state.varState[0]
        if(fibCalcular != 0 && fibCalcular != 1){
            state.lineExec += 1;
        }
        state.lineExec += 1;
        return state
    }

    ejecutarLineaTres(state: ManualState): ManualState {
        let fibCalcular = state.varState[0];
        state.varState[1] = fibCalcular;
        state.varState[2] = 0;
        state.varState[5] = state.varState[3];
        this.codeBg.changeLineFocus(3);
        this.tableServ.addOutputByCounter(state.varState[3],fibCalcular);
        state.lineExec = -1;
        return state;
    }

    ejecutarLineaCuatro(state: ManualState): ManualState {
        this.codeBg.changeLineFocus(4);
        if(state.varState[1] == undefined){
            state.lineExec = 1;
            state.varState[0] -= 1;
            state.varState[3] += 1;
            state.varState[4] += 1;
        }
        else{
            state.lineExec += 1;
        }
        return state
    }

    ejecutarLineaCinco(state: ManualState): ManualState {
        this.codeBg.changeLineFocus(5);
        if(state.varState[2] == undefined){
            state.lineExec = 1;
            state.varState[1] = undefined;
            state.varState[0] -= 2;
            state.varState[3] = state.varState[5] + 1;
            state.varState[4] += 1;
        }
        else{
            state.lineExec += 1;
        }
        return state
    }

    ejecutarLineaSeis(state: ManualState): ManualState {
        this.codeBg.changeLineFocus(6);
        this.tableServ.addOutputByCounter(state.varState[3],state.varState[1] + state.varState[2]);
        state.lineExec = -1;
        return state
    }

    handleReturnVal(waitingState: ManualState, finishedState: ManualState): ManualState {
        let output : number = finishedState.varState[1] + finishedState.varState[2];
        waitingState.varState[5] = finishedState.varState[5]
        if(waitingState.varState[1] == undefined){
            waitingState.varState[1] = output;
        }
        else{
            waitingState.varState[2] = output;
            this.tableServ.addOutputByCounter(waitingState.varState[3],waitingState.varState[1] + waitingState.varState[2]);
        }
        return waitingState;
    }

}