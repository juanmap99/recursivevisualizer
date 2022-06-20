import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { CodeBgService } from "src/app/services/code-bg.service";
import { MemoService } from "src/app/services/memo.service";
import { TableManagerService } from "src/app/services/table-manager.service";
import { Problem } from "../problems-alg/Problem";
import { ManualState } from "./ManualState";

export abstract class ManualAlg{
    protected curState : ManualState;
    protected problem : Problem;
    protected NULL_STATE : ManualState;

    constructor(problem: Problem,
        protected codeBg : CodeBgService,
        protected tableServ : TableManagerService,
        protected memoServ : MemoService){
        this.problem = problem;
        this.NULL_STATE = {
            lineExec : -1,
            posIdCol : -1,
            varState : [],
            varDesc : []
        }
        this.curState = this.setInitState();
    }

    clearFocus(){
        this.codeBg.changeLineFocus(-1);
    }

    clearTable(){
        this.tableServ.clearRows();
    }

    clearMemo(){
        this.memoServ.clearMemo();
    }

    /**
     * Setea el init state del algoritmo
     */
    abstract setInitState() : ManualState;

    /**
     * Detecta si el nuevo estado generado es una nueva instancia de una llamada recursiva
     * o seguimos en la misma.
     * 
     * @param prevS Estado previo originante
     * @param newS Estado siguiente a prevS
     */
    abstract isNewInstance(prevS: ManualState, newS : ManualState) : boolean;


    /**
     * Interceptor que se aplica sobre curState previo a incluirlo en el stack recursivo
     * para darle la posibilidad a los algoritmos de hacer tareas de post-procesamiento
     * en los casos en los que sea necesario
     * 
     * @param curState Estado actual
     */
    abstract postProcessCurState(curState : ManualState) : ManualState;
    
    /**
     * Ejecuta el siguiente paso dado un estado.
     * 
     * @param state State a ejecutar
     */
    abstract runNextStep(state : ManualState): ManualState;

    /**
     * Asigna el output del finishedState a la variable que amerite del waitingState.
     * @param waitingState Estado de la instancia que llamo recursivamente a una nueva instnacia
     * @param finishedState Estado de la instancia que fue llamada recursivamente que ya cuenta con un output
     */
    abstract handleReturnVal(waitingState : ManualState, finishedState : ManualState): ManualState;
}