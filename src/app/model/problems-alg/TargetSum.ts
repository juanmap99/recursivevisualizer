import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "./Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";
import { ProblemControllerService } from "src/app/services/problem-controller.service";
import { CodeBgService } from "src/app/services/code-bg.service";
import { TableManagerService } from "src/app/services/table-manager.service";

/*
https://leetcode.com/problems/target-sum/
https://leetcode.com/problems/target-sum/discuss/455024/DP-IS-EASY!-5-Steps-to-Think-Through-DP-Questions.
*/
export class TargetSum extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService){
        super(codeBg,tableServ);
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

    async runAutomatic() {
        throw new Error("Method not implemented.");
    }

    getProblemID(): string {
        return "tsum";
    }
}