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
https://leetcode.com/submissions/detail/633739832/
*/
export class HouseRobber extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService,
        protected memoServ : MemoService){
        super(codeBg,tableServ,memoServ);
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let dineroCasas : Parameter = {paramName:"Dinero casas",paramType:ParamType.ARRAY,
                                       paramValue:null,maxLength:30,placeholder:"Array de enteros"};
        probConf.addParameter(dineroCasas);
        return probConf
    }

    async runAutomatic() {
        this.tableServ.clearRows();
        this.memoServ.clearMemo();
        let arrayElem : number[] = this.problemConfig
                            .getParamByName("Dinero casas")
                            .paramValue
        if(this.dpDesired){
            await this.runAutomaticDp(arrayElem);
        }
        else{
            await this.runAutomaticNoDp(arrayElem);
        }
    }

    async totalCombSumSumHelper(nums : number[],index : number, counter : number, depth : number) : Promise<POutput>{
        let row : TableRow = {
            values : {
                counter : counter,
                treeDepth : depth,
                parameters : [{
                    paramName : "arr_casas",
                    paramValue: nums,
                    placeholder:"",
                    maxLength:30,
                    paramType : ParamType.ARRAY
                },
                {
                    paramName : "index",
                    paramValue: index,
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
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(2);
        await this.delayByRunSpeed();
        if(index < 0){
            this.codeBg.changeLineFocus(3);
            await this.delayByRunSpeed();
            row.values.returnVal = 0;
            this.tableServ.addRow(row);
            await this.delayByRunSpeed();
            return {counter:counter,output:0};
        }
        this.tableServ.addRow(row);
        this.codeBg.changeLineFocus(4);
        await this.delayByRunSpeed();
        let resRobar = await this.totalCombSumSumHelper(nums,index-2,counter+1,depth+1);
        this.codeBg.changeLineFocus(5);
        await this.delayByRunSpeed();
        let resNoRobar = await this.totalCombSumSumHelper(nums,index-1,resRobar.counter+1,depth+1);
        this.codeBg.changeLineFocus(6);
        await this.delayByRunSpeed();
        let maxProfit = Math.max(nums[index] + resRobar.output, resNoRobar.output)
        this.codeBg.changeLineFocus(7);
        await this.delayByRunSpeed();
        this.tableServ.addOutputByCounter(counter,maxProfit)
        return {counter:resNoRobar.counter, output:maxProfit};
    }

    async runAutomaticNoDp(elementos : number[]){
        this.codeBg.changeLineFocus(8);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(9);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(10);
        await this.delayByRunSpeed();
        let resultado = await this.totalCombSumSumHelper(elementos,elementos.length-1,1,0);
        this.codeBg.changeLineFocus(10);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(-1);
        await this.delayByRunSpeed();
        return resultado.output;
    }

    async totalCombSumSumHelperDP(nums : number[],index : number, memo : number[],
         counter : number, depth : number) : Promise<POutput>{
        let row : TableRow = {
            values : {
                counter : counter,
                treeDepth : depth,
                parameters : [{
                    paramName : "arr_casas",
                    paramValue: nums,
                    placeholder:"",
                    maxLength:30,
                    paramType : ParamType.ARRAY
                },
                {
                    paramName : "index",
                    paramValue: index,
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
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(2);
        await this.delayByRunSpeed();
        if(index < 0){
            this.codeBg.changeLineFocus(3);
            await this.delayByRunSpeed();
            row.values.returnVal = 0;
            this.tableServ.addRow(row);
            await this.delayByRunSpeed();
            return {counter:counter,output:0};
        }
        this.codeBg.changeLineFocus(4);
        await this.delayByRunSpeed();
        if(memo[index] != -1){
            this.codeBg.changeLineFocus(5);
            await this.delayByRunSpeed();
            row.values.returnVal = memo[index];
            this.tableServ.addRow(row);
            await this.delayByRunSpeed();
            return {counter:counter,output:memo[index]};
        }
        this.tableServ.addRow(row);
        this.codeBg.changeLineFocus(6);
        await this.delayByRunSpeed();
        let resRobar = await this.totalCombSumSumHelperDP(nums,index-2,memo,counter+1,depth+1);
        this.codeBg.changeLineFocus(7);
        await this.delayByRunSpeed();
        let resNoRobar = await this.totalCombSumSumHelperDP(nums,index-1,memo,resRobar.counter+1,depth+1);
        this.codeBg.changeLineFocus(8);
        await this.delayByRunSpeed();
        let maxProfit = Math.max(nums[index] + resRobar.output, resNoRobar.output)
        this.codeBg.changeLineFocus(9);
        await this.delayByRunSpeed();
        memo[index] = maxProfit;
        this.memoServ.changeValue(index,maxProfit);
        this.codeBg.changeLineFocus(10);
        await this.delayByRunSpeed();
        this.tableServ.addOutputByCounter(counter,maxProfit)
        return {counter:resNoRobar.counter, output:maxProfit};
    }

    async runAutomaticDp(elementos : number[]){
        this.codeBg.changeLineFocus(11);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(12);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(13);
        await this.delayByRunSpeed();
        let memo : number[] = [];
        for(let i in elementos){
            memo.push(-1);
            this.memoServ.addToMemo(i,-1)
        }
        this.codeBg.changeLineFocus(14);
        await this.delayByRunSpeed();
        let resultado = await this.totalCombSumSumHelperDP(elementos,elementos.length-1,memo,1,0);
        this.codeBg.changeLineFocus(14);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(-1);
        await this.delayByRunSpeed();
        return resultado.output;
    }


    getProblemID(): string {
        return "houser";
    }

}