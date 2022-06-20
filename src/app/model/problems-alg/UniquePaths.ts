import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "./Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";
import { ProblemControllerService } from "src/app/services/problem-controller.service";
import { CodeBgService } from "src/app/services/code-bg.service";
import { TableManagerService } from "src/app/services/table-manager.service";
import { TableRow } from "../table-rel/TableRow";
import { POutput } from "../problem-components/POutput";
import { MemoService } from "src/app/services/memo.service";

/*
https://leetcode.com/problems/unique-paths/
https://leetcode.com/submissions/detail/633103242/
*/
export class UniquePaths extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService,
        protected memoServ : MemoService){
        super(codeBg,tableServ,memoServ,"UniquePaths");
    }

    paramsAreValid(params: Parameter[]):boolean{
        for(let param of params){
            if(param.paramName == "Filas"){
                if(param.paramValue < 0){
                    return false;
                }
            }
            else if(param.paramName == "Columnas"){
                if(param.paramValue < 0){
                    return false;
                }
            }
        }
        return true;
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let filas : Parameter = {paramName:"Filas",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:3,placeholder:"ex: 3"};
        let columnas : Parameter = {paramName:"Columnas",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:3,placeholder:"ex: 3"};
        probConf.addParameter(filas);
        probConf.addParameter(columnas);
        return probConf
    }

    async runAutomatic() {
        this.run = true;
        this.tableServ.clearRows();
        this.memoServ.clearMemo();
        let filas : number = this.problemConfig
                            .getParamByName("Filas")
                            .paramValue
        let columnas : number = this.problemConfig
                            .getParamByName("Columnas")
                            .paramValue
        if(this.dpDesired){
            await this.runAutomaticDp(filas,columnas);
        }
        else{
            await this.runAutomaticNoDp(filas,columnas);
        }
    }

    async uniquePathsHelper(r : number, c : number, counter : number, depth : number) : Promise<POutput>{
        if(this.run){
            let row : TableRow = {
                values : {
                    counter : counter,
                    treeDepth : depth,
                    parameters : [{
                        paramName : "r",
                        paramValue: r,
                        placeholder:"",
                        maxLength:30,
                        paramType : ParamType.NUMBER
                    },
                    {
                        paramName : "c",
                        paramValue: c,
                        placeholder:"",
                        maxLength:3,
                        paramType : ParamType.NUMBER
                    }],
                    returnVal : NaN
                },
                len : 4
            }
            this.codeBg.changeLineFocus(1);
            this.codeBg.changeCurDepth(depth);
            this.codeBg.changeCurCounter(counter);
            await this.delayByRunSpeed();
            this.codeBg.changeLineFocus(2);
            await this.delayByRunSpeed();
            if(r < 0 || c < 0){
                this.codeBg.changeLineFocus(3);
                await this.delayByRunSpeed();
                row.values.returnVal = 0;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:0};
            }
            this.codeBg.changeLineFocus(4);
            await this.delayByRunSpeed();
            if(r == 0 || c == 0){
                this.codeBg.changeLineFocus(5);
                await this.delayByRunSpeed();
                row.values.returnVal = 1;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:1};
            }
            this.tableServ.addRow(row);
            this.codeBg.changeLineFocus(6);
            await this.delayByRunSpeed();
            let pathsMovingL = await this.uniquePathsHelper(r-1,c,counter+1,depth+1);
            this.codeBg.changeLineFocus(7);
            await this.delayByRunSpeed();
            let pathsMovingR = await this.uniquePathsHelper(r,c-1,pathsMovingL.counter+1,depth+1);
            this.codeBg.changeLineFocus(8);
            await this.delayByRunSpeed();
            let totalPaths = pathsMovingL.output + pathsMovingR.output;
            this.codeBg.changeLineFocus(9);
            await this.delayByRunSpeed();
            this.tableServ.addOutputByCounter(counter,totalPaths)
            return {counter:pathsMovingR.counter, output:totalPaths};
        }
        return {counter:-1, output:0};
    }

    async runAutomaticNoDp(filas:number,columnas:number){
        this.codeBg.changeLineFocus(10);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(11);
        await this.delayByRunSpeed();
        let resultado = await this.uniquePathsHelper(filas-1,columnas-1,1,0);
        this.codeBg.changeLineFocus(11);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(-1);
        await this.delayByRunSpeed();
        return resultado.output;
    }

    async uniquePathsHelperDP(r : number, c : number, memo : Map<string,number>,
        counter : number, depth : number) : Promise<POutput>{
        if(this.run){
            let row : TableRow = {
                values : {
                    counter : counter,
                    treeDepth : depth,
                    parameters : [{
                        paramName : "r",
                        paramValue: r,
                        placeholder:"",
                        maxLength:30,
                        paramType : ParamType.NUMBER
                    },
                    {
                        paramName : "c",
                        paramValue: c,
                        placeholder:"",
                        maxLength:3,
                        paramType : ParamType.NUMBER
                    }],
                    returnVal : NaN
                },
                len : 4
            }
            this.codeBg.changeLineFocus(1);
            this.codeBg.changeCurDepth(depth);
            this.codeBg.changeCurCounter(counter);
            await this.delayByRunSpeed();
            this.codeBg.changeLineFocus(2);
            await this.delayByRunSpeed();
            if(r < 0 || c < 0){
                this.codeBg.changeLineFocus(3);
                await this.delayByRunSpeed();
                row.values.returnVal = 0;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:0};
            }
            this.codeBg.changeLineFocus(4);
            await this.delayByRunSpeed();
            if(r == 0 || c == 0){
                this.codeBg.changeLineFocus(5);
                await this.delayByRunSpeed();
                row.values.returnVal = 1;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:1};
            }
            this.codeBg.changeLineFocus(6);
            await this.delayByRunSpeed();
            let valInMemo = memo.get(r+":"+c);
            if(valInMemo != undefined){
                this.codeBg.changeLineFocus(7);
                await this.delayByRunSpeed();
                row.values.returnVal = valInMemo;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:valInMemo};
            }
            this.tableServ.addRow(row);
            this.codeBg.changeLineFocus(8);
            await this.delayByRunSpeed();
            let pathsMovingL = await this.uniquePathsHelperDP(r-1,c,memo,counter+1,depth+1);
            this.codeBg.changeLineFocus(9);
            await this.delayByRunSpeed();
            let pathsMovingR = await this.uniquePathsHelperDP(r,c-1,memo,pathsMovingL.counter+1,depth+1);
            this.codeBg.changeLineFocus(10);
            await this.delayByRunSpeed();
            let totalPaths = pathsMovingL.output + pathsMovingR.output;
            this.codeBg.changeLineFocus(11);
            await this.delayByRunSpeed();
            memo.set(r+":"+c,totalPaths);
            this.memoServ.addToMemo([r,c],totalPaths);
            this.codeBg.changeLineFocus(12);
            await this.delayByRunSpeed();
            this.tableServ.addOutputByCounter(counter,totalPaths)
            return {counter:pathsMovingR.counter, output:totalPaths};
        }
        return {counter:-1, output:0};
    }

    async runAutomaticDp(filas:number,columnas:number){
        this.codeBg.changeLineFocus(13);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(14);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(15);
        await this.delayByRunSpeed();
        let memo = new Map<string,number>();
        let resultado = await this.uniquePathsHelperDP(filas-1,columnas-1,memo,1,0);
        this.codeBg.changeLineFocus(15);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(-1);
        await this.delayByRunSpeed();
        return resultado.output;
    }

    getProblemID(): string {
        return "uPaths";
    }
}