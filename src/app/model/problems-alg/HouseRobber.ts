import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "../problem-components/Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";

/*
https://leetcode.com/submissions/detail/633739832/
*/
export class HouseRobber extends Problem{

    constructor(){
        super();
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let dineroCasas : Parameter = {paramName:"Dinero casas",paramType:ParamType.ARRAY,
                                       paramValue:null,maxLength:30,placeholder:"Array de enteros"};
        probConf.addParameter(dineroCasas);
        return probConf
    }


}