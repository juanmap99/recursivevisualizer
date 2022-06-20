import { ManualAlg } from "./ManualAlg";
import { ManualState } from "./ManualState";

export class ManualDirector{
    private recursionStack : ManualState[];
    private algorithm : ManualAlg | undefined;
    private NULL_STATE : ManualState;

    constructor(){
        this.NULL_STATE = {
            lineExec : -1,
            posIdCol : -1,
            varState : [],
            varDesc : []
        }
        this.algorithm = undefined;
        this.recursionStack = [];
    }

    recStackIsEmpty() : boolean{
        return this.recursionStack.length == 0;
    }

    algirthmIsSet(){
        return this.algorithm != undefined;
    }

    emptyStack(){
        this.recursionStack = []
    }

    stopExecution(){
        this.emptyStack();
        this.algorithm?.clearFocus();
    }

    setManualAlg(alg : ManualAlg){
        this.algorithm = alg;
        this.recursionStack.push(this.algorithm.setInitState());
    }

    /**
     * Corre el siguiente paso, siendo el mismo el que se encuentre en el apex del stack.
     * 
     * @returns False en caso que falten pasos, True en caso que no queden pasos por realizar.
     */
    runNextStep() : boolean{
        let curState = this.getCurState();   
        let newState : ManualState | undefined = this.NULL_STATE;
        if(curState.lineExec == -1 && this.algorithm){
            if(this.recursionStack.length == 0){
                this.algorithm.clearFocus();
                return true;//Se termino con la ejecucion
            }
            let prevState = this.getCurState();
            newState = this.algorithm.handleReturnVal(this.getStateCopy(prevState),this.getStateCopy(curState))
            newState = this.algorithm.runNextStep(this.getStateCopy(newState));
            this.recursionStack.push(newState);
        }
        else{
            newState = this.algorithm?.runNextStep(this.getStateCopy(curState));
            //curState.varState[curState.posIdCol] > newState.varState[newState.posIdCol]
            if(newState != undefined && 
                this.algorithm?.isNewInstance(curState,newState)){
                this.recursionStack.push(this.algorithm.postProcessCurState(curState))
                //this.recursionStack.push(curState);
            }
            if(newState != undefined){
                this.recursionStack.push(newState);
            }
        }
        return false;
    }

    getStateCopy(origin : ManualState){
        return {
            lineExec : origin.lineExec,
            posIdCol : origin.posIdCol,
            varState : this.getArrayCopy(origin.varState),
            varDesc : origin.varDesc
        }
    }

    getArrayCopy(array : any[]){
        let copy : any[] = [];
        for(let elem of array){
            copy.push(elem)
        }
        return copy;
    }

    /**
     * Metodo creado para hacer un bypass del undefined que puede retornar el pop() en funcion
     * de evitar tener que agregar un if innecesario
     */
    private getCurState() : ManualState{
        let lastState = this.recursionStack.pop();
        //Siempre va a retornar lastState ya que este metodo no se llamara con el stack vacio
        return lastState ? lastState : this.NULL_STATE;
    }
}