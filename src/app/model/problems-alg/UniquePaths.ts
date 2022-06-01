import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "../problem-components/Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";

/*
https://leetcode.com/problems/unique-paths/
https://leetcode.com/submissions/detail/633103242/
*/
export class UniquePaths extends Problem{

    constructor(){
        super();
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let filas : Parameter = {paramName:"Filas",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:3,placeholder:"Entero positivo"};
        let columnas : Parameter = {paramName:"Columnas",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:3,placeholder:"Entero positivo"};
        probConf.addParameter(filas);
        probConf.addParameter(columnas);
        return probConf
    }

}