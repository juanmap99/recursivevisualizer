import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "./Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";
import { ProblemControllerService } from "src/app/services/problem-controller.service";
import { CodeBgService } from "src/app/services/code-bg.service";
import { TableManagerService } from "src/app/services/table-manager.service";
import { POutput } from "../problem-components/POutput";
import { TableRow } from "../table-rel/TableRow";
import { MemoService } from "src/app/services/memo.service";

/*
https://leetcode.com/problems/combination-sum-iv/discuss/?currentPage=1&orderBy=most_votes&query=
*/
export class CombinationSum extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService,
        protected memoServ : MemoService){
        super(codeBg,tableServ,memoServ,"CombSum");
    }

    paramsAreValid(params: Parameter[]):boolean{
        for(let param of params){
            if(param.paramName == "Array elementos"){
               if(!this.problemConfig.isPositiveArray(param.paramValue)){
                    return false;
               }
            }
            else if(param.paramName == "Target sum"){
                if(param.paramValue < 0){
                    return false;
                }
            }
        }
        return true;
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let array : Parameter = {paramName:"Array elementos",paramType:ParamType.ARRAY,
                                       paramValue:null,maxLength:50,placeholder:"ex: [1,2,3]"};
        let targetValue : Parameter = {paramName:"Target sum",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:5,placeholder:"ex: 4"};
        probConf.addParameter(array);
        probConf.addParameter(targetValue);
        return probConf
    }

    async runAutomatic() {
        this.run = true;
        this.tableServ.clearRows();
        this.memoServ.clearMemo();
        let arrayElem : number[] = this.problemConfig
                            .getParamByName("Array elementos")
                            .paramValue
        let targetSum : number = this.problemConfig
                            .getParamByName("Target sum")
                            .paramValue
        if(this.dpDesired){
            await this.runAutomaticDp(arrayElem,targetSum);
        }
        else{
            await this.runAutomaticNoDp(arrayElem,targetSum);
        }
    }

    async totalCombSumSumHelper(nums : number[],tSum : number, counter : number, depth : number) : Promise<POutput>{
        if(this.run){
            let row : TableRow = {
                values : {
                    counter : counter,
                    treeDepth : depth,
                    parameters : [{
                        paramName : "nums",
                        paramValue: nums,
                        placeholder:"",
                        maxLength:30,
                        paramType : ParamType.ARRAY
                    },
                    {
                        paramName : "target",
                        paramValue: tSum,
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
            if(tSum == 0){
                this.codeBg.changeLineFocus(3);
                await this.delayByRunSpeed();
                row.values.returnVal = 1;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:1};
            }
            this.codeBg.changeLineFocus(4);
            await this.delayByRunSpeed();
            if(tSum<0){
                this.codeBg.changeLineFocus(5);
                await this.delayByRunSpeed();
                row.values.returnVal = 0;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:0};
            }
            this.tableServ.addRow(row);
            this.codeBg.changeLineFocus(6);
            await this.delayByRunSpeed();
            let totalSols : number = 0;
            let last_counter : number = counter;
            this.codeBg.changeLineFocus(7);
            await this.delayByRunSpeed();
            for(let num of nums){
                this.codeBg.changeLineFocus(8);
                await this.delayByRunSpeed();
                let res =  await this.totalCombSumSumHelper(nums,tSum-num,last_counter+1,depth+1);
                totalSols += res.output;
                last_counter = res.counter
                this.codeBg.changeLineFocus(7);
                await this.delayByRunSpeed();
            }
            this.codeBg.changeLineFocus(9);
            await this.delayByRunSpeed();
            this.tableServ.addOutputByCounter(counter,totalSols)
            return {counter:last_counter, output:totalSols};
        }
        return {counter:-1, output:0};
    }

    async runAutomaticNoDp(elementos : number[], tSum : number){
        let resultado = await this.totalCombSumSumHelper(elementos,tSum,1,0);
        this.codeBg.changeLineFocus(-1);
        await this.delayByRunSpeed();
        return resultado.output;
    }

    async totalCombSumSumHelperDP(nums : number[],tSum : number, memo :Map<number,number>,
         counter : number, depth : number) : Promise<POutput>{
        if(this.run){
            let row : TableRow = {
                values : {
                    counter : counter,
                    treeDepth : depth,
                    parameters : [{
                        paramName : "nums",
                        paramValue: nums,
                        placeholder:"",
                        maxLength:30,
                        paramType : ParamType.ARRAY
                    },
                    {
                        paramName : "target",
                        paramValue: tSum,
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
            if(tSum<0){
                this.codeBg.changeLineFocus(3);
                await this.delayByRunSpeed();
                row.values.returnVal = 0;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:0};
            }
            this.codeBg.changeLineFocus(4);
            await this.delayByRunSpeed();
            let valInMemo = memo.get(tSum);
            if(valInMemo != undefined){
                this.codeBg.changeLineFocus(5);
                await this.delayByRunSpeed();
                row.values.returnVal = valInMemo;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:valInMemo};
            }
            this.tableServ.addRow(row);
            this.codeBg.changeLineFocus(6);
            await this.delayByRunSpeed();
            let totalSols : number = 0;
            let last_counter : number = counter;
            this.codeBg.changeLineFocus(7);
            await this.delayByRunSpeed();
            for(let num of nums){
                this.codeBg.changeLineFocus(8);
                await this.delayByRunSpeed();
                let res =  await this.totalCombSumSumHelperDP(nums,tSum-num,memo,last_counter+1,depth+1);
                totalSols += res.output;
                last_counter = res.counter
                this.codeBg.changeLineFocus(7);
                await this.delayByRunSpeed();
            }
            this.codeBg.changeLineFocus(9);
            await this.delayByRunSpeed();
            memo.set(tSum,totalSols);
            this.memoServ.addToMemo(tSum,totalSols);
            this.tableServ.addOutputByCounter(counter,totalSols)
            this.codeBg.changeLineFocus(10);
            await this.delayByRunSpeed();
            return {counter:last_counter, output:totalSols};
        }
        return {counter:-1, output:0};
    }

    async runAutomaticDp(elementos : number[], tSum : number){
        this.codeBg.changeLineFocus(11);
        await this.delayByRunSpeed();
        let memo = new Map<number,number>();
        this.codeBg.changeLineFocus(12);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(13);
        await this.delayByRunSpeed();
        memo.set(0,1);
        this.memoServ.addToMemo(0,1);
        this.codeBg.changeLineFocus(14);
        await this.delayByRunSpeed();
        let resultado = await this.totalCombSumSumHelperDP(elementos,tSum,memo,1,0);
        this.codeBg.changeLineFocus(14);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(-1);
        await this.delayByRunSpeed();
        return resultado.output;
    }

    getProblemID(): string {
        return "comb";
    }
}