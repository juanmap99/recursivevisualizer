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
https://leetcode.com/problems/target-sum/
https://leetcode.com/problems/target-sum/discuss/455024/DP-IS-EASY!-5-Steps-to-Think-Through-DP-Questions.
*/
export class TargetSum extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService,
        protected memoServ : MemoService){
        super(codeBg,tableServ,memoServ);
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

    async totalTargetSumHelper(nums : number[],tSum : number, index:number,
        curr_sum:number, counter : number, depth : number) : Promise<POutput>{
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
                },
                {
                    paramName : "index",
                    paramValue: index,
                    placeholder:"",
                    maxLength:3,
                    paramType : ParamType.NUMBER
                },
                {
                    paramName : "curr_sum",
                    paramValue: curr_sum,
                    placeholder:"",
                    maxLength:8,
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
        if(index < 0 && curr_sum == tSum){
            this.codeBg.changeLineFocus(3);
            await this.delayByRunSpeed();
            row.values.returnVal = 1;
            this.tableServ.addRow(row);
            await this.delayByRunSpeed();
            return {counter:counter,output:1};
        }
        this.codeBg.changeLineFocus(4);
        await this.delayByRunSpeed();
        if(index<0){
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
        let solsSumando = await this.totalTargetSumHelper(nums,tSum,index-1,
                                    nums[index]+ curr_sum, counter+1,depth+1);
        this.codeBg.changeLineFocus(7);
        this.codeBg.changeCurDepth(depth);
        await this.delayByRunSpeed();
        let solsRestando = await this.totalTargetSumHelper(nums,tSum,index-1,
            curr_sum -nums[index],solsSumando.counter+1 ,depth+1);
        this.codeBg.changeLineFocus(8);
        this.codeBg.changeCurDepth(depth);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(9);
        await this.delayByRunSpeed();
        this.tableServ.addOutputByCounter(counter,solsSumando.output + solsRestando.output)
        return {counter:solsRestando.counter, output:solsSumando.output + solsRestando.output};
    }

    async runAutomaticNoDp(elementos : number[], tSum : number){
        this.codeBg.changeLineFocus(10);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(11);
        await this.delayByRunSpeed();
        console.log(elementos);
        let resultado = await this.totalTargetSumHelper(elementos,tSum,
                                    elementos.length-1,0,1,0);
        this.codeBg.changeLineFocus(11);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(-1);
        return resultado.output;
    }

    async totalTargetSumHelperDP(nums : number[],tSum : number, index:number,memo : Map<string,number>,
        curr_sum:number, counter : number, depth : number) : Promise<POutput>{
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
                },
                {
                    paramName : "index",
                    paramValue: index,
                    placeholder:"",
                    maxLength:3,
                    paramType : ParamType.NUMBER
                },
                {
                    paramName : "curr_sum",
                    paramValue: curr_sum,
                    placeholder:"",
                    maxLength:8,
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
        let valInMemo = memo.get(index+":"+curr_sum); 
        if(valInMemo != undefined){
            this.codeBg.changeLineFocus(3);
            await this.delayByRunSpeed();
            row.values.returnVal = valInMemo;
            this.tableServ.addRow(row);
            await this.delayByRunSpeed();
            return {counter:counter,output:valInMemo};
        }
        this.codeBg.changeLineFocus(4);
        await this.delayByRunSpeed();
        if(index < 0 && curr_sum == tSum){
            this.codeBg.changeLineFocus(5);
            await this.delayByRunSpeed();
            row.values.returnVal = 1;
            this.tableServ.addRow(row);
            await this.delayByRunSpeed();
            return {counter:counter,output:1};
        }
        this.codeBg.changeLineFocus(6);
        await this.delayByRunSpeed();
        if(index<0){
            this.codeBg.changeLineFocus(7);
            await this.delayByRunSpeed();
            row.values.returnVal = 0;
            this.tableServ.addRow(row);
            await this.delayByRunSpeed();
            return {counter:counter,output:0};
        }
        this.tableServ.addRow(row);
        this.codeBg.changeLineFocus(8);
        await this.delayByRunSpeed();
        let solsSumando = await this.totalTargetSumHelperDP(nums,tSum,index-1, memo,
                                    nums[index]+ curr_sum, counter+1,depth+1);
        this.codeBg.changeLineFocus(9);
        this.codeBg.changeCurDepth(depth);
        await this.delayByRunSpeed();
        let solsRestando = await this.totalTargetSumHelperDP(nums,tSum,index-1,memo,
            curr_sum -nums[index],solsSumando.counter+1 ,depth+1);
        this.codeBg.changeLineFocus(10);
        this.codeBg.changeCurDepth(depth);
        await this.delayByRunSpeed();
        memo.set(index+":"+curr_sum,solsSumando.output + solsRestando.output)
        this.memoServ.addToMemo([index,curr_sum],solsSumando.output + solsRestando.output)
        this.codeBg.changeLineFocus(11);
        await this.delayByRunSpeed();
        this.tableServ.addOutputByCounter(counter,solsSumando.output + solsRestando.output)
        this.codeBg.changeLineFocus(12);
        await this.delayByRunSpeed();
        return {counter:solsRestando.counter, output:solsSumando.output + solsRestando.output};
    }

    async runAutomaticDp(elementos : number[], tSum : number){
        let memo = new Map<string,number>();
        this.codeBg.changeLineFocus(13);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(14);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(15);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(16);
        await this.delayByRunSpeed();
        let resultado = await this.totalTargetSumHelperDP(elementos,tSum,
            elementos.length-1, memo, 0,1,0);
        this.codeBg.changeLineFocus(16);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(-1);
        return resultado.output;
    }

    getProblemID(): string {
        return "tsum";
    }
}