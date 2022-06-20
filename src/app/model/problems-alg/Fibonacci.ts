import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "./Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";
import { CodeBgService } from "src/app/services/code-bg.service";
import { TableManagerService } from "src/app/services/table-manager.service";
import { TableRow } from "../table-rel/TableRow";
import { POutput } from "../problem-components/POutput";
import { MemoService } from "src/app/services/memo.service";

export class Fibonacci extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService,
        protected memoServ : MemoService){
        super(codeBg,tableServ,memoServ, "Fibonacci");
    }

    paramsAreValid(params: Parameter[]):boolean{
        for(let param of params){
            if(param.paramName == "Fibonacci calcular"){
                if(param.paramValue < 0){
                    return false;
                }
            }
        }
        return true;
    }    

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let targetValue : Parameter = {paramName:"Fibonacci calcular",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:3,placeholder:"ex: 5"};
        probConf.addParameter(targetValue);
        return probConf
    }

    async runAutomatic() {
        this.run = true;
        this.tableServ.clearRows();
        this.memoServ.clearMemo();
        let fibCalcular : number = this.problemConfig
                            .getParamByName("Fibonacci calcular")
                            .paramValue
        if(this.dpDesired){
            await this.runAutomaticDp(fibCalcular);
        }
        else{
            await this.runAutomaticNoDp(fibCalcular);
        }
    }

    async fibNoDpHelper(fibCalcular : number, counter : number, depth : number) : Promise<POutput>{
        if(this.run){
            let row : TableRow = {
                values : {
                    counter : counter,
                    treeDepth : depth,
                    parameters : [{
                        paramName : "curNum",
                        paramValue: fibCalcular,
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
            if(fibCalcular == 0 || fibCalcular == 1){
                this.codeBg.changeLineFocus(3);
                await this.delayByRunSpeed();
                row.values.returnVal = fibCalcular;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:fibCalcular};
            }
            this.tableServ.addRow(row);
            this.codeBg.changeLineFocus(4);
            await this.delayByRunSpeed();
            let fibMenosUno = await this.fibNoDpHelper(fibCalcular-1, counter+1,depth+1);
            this.codeBg.changeLineFocus(5);
            this.codeBg.changeCurDepth(depth);
            await this.delayByRunSpeed();
            let fibMenosDos = await this.fibNoDpHelper(fibCalcular-2,fibMenosUno.counter+1 ,depth+1);
            this.codeBg.changeLineFocus(6);
            this.codeBg.changeCurDepth(depth);
            await this.delayByRunSpeed();
            this.codeBg.changeLineFocus(-1);
            this.tableServ.addOutputByCounter(counter,fibMenosUno.output + fibMenosDos.output)
            return {counter:fibMenosDos.counter, output:fibMenosUno.output + fibMenosDos.output};
            }
            return {counter:-1, output:0};
        }

    async runAutomaticNoDp(fibCalcular : number){
        let resultado = await this.fibNoDpHelper(fibCalcular,1,0);
        this.codeBg.changeLineFocus(-1);
        return resultado.output;
    }

    async fibDpHelper(fibCalcular : number, memo:Map<number,number>, counter : number, depth : number) : Promise<POutput>{
        if(this.run){
            let row : TableRow = {
                values : {
                    counter : counter,
                    treeDepth : depth,
                    parameters : [{
                        paramName : "curNum",
                        paramValue: fibCalcular,
                        placeholder:"",
                        maxLength:3,
                        paramType : ParamType.NUMBER
                    }],
                    returnVal : NaN
                },
                len : 4
            }
            this.codeBg.changeLineFocus(2);
            this.codeBg.changeCurDepth(depth);
            this.codeBg.changeCurCounter(counter);
            await this.delayByRunSpeed();
            this.codeBg.changeLineFocus(3);
            await this.delayByRunSpeed();
            let memoAt = memo.get(fibCalcular);
            if(memoAt != undefined){
                this.codeBg.changeLineFocus(4);
                await this.delayByRunSpeed();
                row.values.returnVal = memoAt;
                this.tableServ.addRow(row);
                await this.delayByRunSpeed();
                return {counter:counter,output:memoAt};
            }
            this.tableServ.addRow(row);
            this.codeBg.changeLineFocus(5);
            await this.delayByRunSpeed();
            let fibMenosUno = await this.fibDpHelper(fibCalcular-1,memo,counter+1,depth+1);
            this.codeBg.changeLineFocus(6);
            this.codeBg.changeCurDepth(depth);
            await this.delayByRunSpeed();
            let fibMenosDos = await this.fibDpHelper(fibCalcular-2,memo,fibMenosUno.counter+1 ,depth+1);
            this.codeBg.changeLineFocus(7);
            this.codeBg.changeCurDepth(depth);
            await this.delayByRunSpeed();
            memo.set(fibCalcular,fibMenosUno.output + fibMenosDos.output);
            this.memoServ.addToMemo(fibCalcular,fibMenosUno.output + fibMenosDos.output)
            this.codeBg.changeLineFocus(8);
            await this.delayByRunSpeed();
            this.codeBg.changeLineFocus(-1);
            this.tableServ.addOutputByCounter(counter,fibMenosUno.output + fibMenosDos.output)
            return {counter:fibMenosDos.counter, output:fibMenosUno.output + fibMenosDos.output};
        }
        return {counter:-1, output:0};
    }

    async runAutomaticDp(fibCalcular : number){
        let memo = new Map<number,number>();
        this.codeBg.changeLineFocus(9);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(10);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(11);
        await this.delayByRunSpeed();
        memo.set(0,0);
        this.memoServ.addToMemo(0,0);
        this.codeBg.changeLineFocus(12);
        await this.delayByRunSpeed();
        memo.set(1,1);
        this.memoServ.addToMemo(1,1);
        this.codeBg.changeLineFocus(13);
        await this.delayByRunSpeed();
        let resultado = await this.fibDpHelper(fibCalcular,memo,1,0);
        this.codeBg.changeLineFocus(13);
        await this.delayByRunSpeed();
        return resultado.output;
    }

    getProblemID(): string {
        return "fib";
    }
}