import { RunParams } from "../run/RunParams";
import { ProblemConfig } from "../problem-components/ProblemConfig";
import { ProblemControllerService } from "src/app/services/problem-controller.service";
import { CodeBgService } from "src/app/services/code-bg.service";
import { TableManagerService } from "src/app/services/table-manager.service";
import { MemoService } from "src/app/services/memo.service";

export abstract class Problem{
    protected problemConfig : ProblemConfig;
    protected dpDesired : boolean = false;

    constructor(protected codeBg : CodeBgService,
                protected tableServ : TableManagerService,
                protected memoServ : MemoService){
        this.problemConfig = this.buildProblemConfig();
    }

    getProblemConfig(): ProblemConfig{return this.problemConfig;}

    protected abstract buildProblemConfig() : ProblemConfig

    abstract runAutomatic() : any

    adjustProblemConfig(runParams : RunParams){
        this.problemConfig.setParameters(runParams.parameters);
        this.problemConfig.setRunDelay(runParams.velocity);
        this.problemConfig.setRunningMode(runParams.runMode);
    }

    setDpDesired(dpDesired : boolean){
        this.dpDesired = dpDesired;
    }

    /**
     * Genera un delay en milisegundos de una longitud de tiempo igual a la marcada por la variable
     * de clase'delay'
     * 
     * @returns Promesa que sera resuelta una vez que pase el tiempo delimitado por la variable
     * de clase 'delay.
    */
     delayByRunSpeed(){
        return new Promise(resolve => {
            setTimeout(function() {
            resolve("Delay completado");
            }, this.problemConfig.getDelay());
        });
    }

    /**
     * Realiza un delay de delay*nTimes
     * @param nTimes Numero que representa la cantidad de veces por la que se prolongara el delay establecido
     */
    delayByRunSpeedXTimes(nTimes : number){
        return new Promise(resolve => {
            setTimeout(function() {
            resolve("Delay completado");
            }, this.problemConfig.getDelay()*nTimes);
        });
    }

    abstract getProblemID() : string;

    
  /**
   * Dado un nodo, retorna la posicion en la que se encuentra el padre.
   * 
   * @param index Indice que representa la posicion de un nodo
   * @returns Entero que representa el indice del padre en un array
   */
  getParentIndex(index : number) : number{
    let par : boolean = (index % 2) == 0;
    let parent = 0;
    if(par){
      parent = (index -2) / 2;
    }
    else{
      parent = (index -1) / 2;
    }
    return parent;
  }
}