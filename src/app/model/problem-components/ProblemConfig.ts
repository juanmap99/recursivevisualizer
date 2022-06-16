import { RunMode } from "../run/RunMode";
import { Parameter } from "./Parameter";
import { ParamType } from "./ParamType";

export class ProblemConfig{
    private parameters : Parameter[] = [];
    private delay : number;
    private runningMode : RunMode;

    constructor(){
        this.parameters = [];
        this.delay = 500;
        this.runningMode = RunMode.AUTOMATIC;
    }

    addParameter(param: Parameter){
        this.parameters.push(param);
    }

    addValue(paramName:String, value:any){
        let targetParam : Parameter = this.getParamByName(paramName);
        targetParam.paramValue = value;
    }

    getParamByName(paramName:String) : Parameter{
        let nullParam : Parameter = {paramName:"NULL",paramType:ParamType.NUMBER,paramValue:null,maxLength:0,placeholder:""}

        for(let param of this.parameters){
            if(paramName == param.paramName){
                return param;
            }
        }
        
        return nullParam;
    }

    /**
     * Setea el delay del programe en base a la velocidad recibida por parametro
     * 
     * @param velocidad Entero con valores posibles del 1 al 5 que determina el delay del programa
    */
    setRunDelay(velocidad: number){
        let speedToDelayDic = [1000,500,250,100,60,30,10,5,2,0.6];
        this.delay = speedToDelayDic[velocidad -1];
    }

    setParameters(parameters: Parameter[]){
        this.parameters = parameters;
    }

    setRunningMode(runMode : RunMode){
        this.runningMode = runMode;
    }

    getParameters() : Parameter[]{
        return this.parameters;
    }

    getDelay() : number{
        return this.delay;
    }

    getRunningMode() : RunMode{
        return this.runningMode;
    }
}