import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "./Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";
import { ProblemControllerService } from "src/app/services/problem-controller.service";
import { CodeBgService } from "src/app/services/code-bg.service";
import { TableManagerService } from "src/app/services/table-manager.service";

/*
https://leetcode.com/problems/unique-paths/
https://leetcode.com/submissions/detail/633103242/
*/
export class UniquePaths extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService){
        super(codeBg,tableServ);
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

    async runAutomatic() {
        throw new Error("Method not implemented.");
    }

    getProblemID(): string {
        return "uPaths";
    }
}