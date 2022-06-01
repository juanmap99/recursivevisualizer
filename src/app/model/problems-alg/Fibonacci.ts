import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "../problem-components/Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";

export class Fibonacci extends Problem{

    constructor(){
        super();
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let targetValue : Parameter = {paramName:"Fibonacci calcular",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:3,placeholder:"Integral positivo"};
        probConf.addParameter(targetValue);
        return probConf
    }


}