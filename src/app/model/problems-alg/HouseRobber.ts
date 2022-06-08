import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "./Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";
import { ProblemControllerService } from "src/app/services/problem-controller.service";
import { CodeBgService } from "src/app/services/code-bg.service";
import { TableManagerService } from "src/app/services/table-manager.service";

/*
https://leetcode.com/submissions/detail/633739832/
*/
export class HouseRobber extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService){
        super(codeBg,tableServ);
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let dineroCasas : Parameter = {paramName:"Dinero casas",paramType:ParamType.ARRAY,
                                       paramValue:null,maxLength:30,placeholder:"Array de enteros"};
        probConf.addParameter(dineroCasas);
        return probConf
    }

    async runAutomatic() {
        throw new Error("Method not implemented.");
    }

    getProblemID(): string {
        return "houser";
    }

}