import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "../problem-components/Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";

/*
https://leetcode.com/problems/target-sum/
https://leetcode.com/problems/target-sum/discuss/455024/DP-IS-EASY!-5-Steps-to-Think-Through-DP-Questions.
*/
export class TargetSum extends Problem{

    constructor(){
        super();
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let array : Parameter = {paramName:"Array elementos",paramType:ParamType.ARRAY,
                                       paramValue:null,maxLength:30,placeholder:"Array de enteros"};
        let targetValue : Parameter = {paramName:"Target sum",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:5,placeholder:"Número entero"};
        probConf.addParameter(array);
        probConf.addParameter(targetValue);
        return probConf
    }


}