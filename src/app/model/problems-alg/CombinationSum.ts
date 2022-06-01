import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "../problem-components/Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";

/*
https://leetcode.com/problems/combination-sum-iv/discuss/?currentPage=1&orderBy=most_votes&query=
*/
export class CombinationSum extends Problem{

    constructor(){
        super();
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let array : Parameter = {paramName:"Array elementos",paramType:ParamType.ARRAY,
                                       paramValue:null,maxLength:30,placeholder:"Enteros positivos"};
        let targetValue : Parameter = {paramName:"Target sum",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:5,placeholder:"Número entero"};
        probConf.addParameter(array);
        probConf.addParameter(targetValue);
        return probConf
    }

}