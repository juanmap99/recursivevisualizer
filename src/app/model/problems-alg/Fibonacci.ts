import { Parameter } from "../problem-components/Parameter";
import { ParamType } from "../problem-components/ParamType";
import { Problem } from "./Problem";
import { ProblemConfig } from "../problem-components/ProblemConfig";
import { CodeBgService } from "src/app/services/code-bg.service";
import { TableManagerService } from "src/app/services/table-manager.service";
import { TableRow } from "../table-rel/TableRow";
import { POutput } from "../problem-components/POutput";

export class Fibonacci extends Problem{

    constructor(protected codeBg : CodeBgService,
        protected tableServ : TableManagerService){
        super(codeBg,tableServ);
    }

    protected buildProblemConfig() : ProblemConfig{
        let probConf : ProblemConfig = new ProblemConfig();
        let targetValue : Parameter = {paramName:"Fibonacci calcular",paramType:ParamType.NUMBER,
                                       paramValue:null,maxLength:3,placeholder:"Integral positivo"};
        probConf.addParameter(targetValue);
        return probConf
    }

    async runAutomatic() {
        this.tableServ.clearRows();
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
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(2);
        await this.delayByRunSpeed();
        //console.log("El fib a calcular es: " + fibCalcular)
        if(fibCalcular == 0 || fibCalcular == 1){
            this.codeBg.changeLineFocus(3);
            await this.delayByRunSpeed();
        //    console.log("Restriccion de corte, retornamos: "+ fibCalcular);
            row.values.returnVal = fibCalcular;
            this.tableServ.addRow(row);
            await this.delayByRunSpeed();
            return {counter:counter,output:fibCalcular};
        }
        this.tableServ.addRow(row);
        this.codeBg.changeLineFocus(4);
        await this.delayByRunSpeed();
        let fibMenosUno = await this.fibNoDpHelper(fibCalcular-1, counter+1,depth+1);
        //console.log("Cuando el fib a calcular es: "+ fibCalcular + ", fibMenos uno es:" + fibMenosUno);
        this.codeBg.changeLineFocus(5);
        await this.delayByRunSpeed();
        let fibMenosDos = await this.fibNoDpHelper(fibCalcular-2,fibMenosUno.counter+1 ,depth+1);
        this.codeBg.changeLineFocus(6);
        await this.delayByRunSpeed();
        this.codeBg.changeLineFocus(-1);
        this.tableServ.addOutputByCounter(counter,fibMenosUno.output + fibMenosDos.output)
        //console.log("Cuando el fib a calcular es: "+ fibCalcular + ", fibMenos dos es:" + fibMenosDos);
        return {counter:fibMenosDos.counter, output:fibMenosUno.output + fibMenosDos.output};
    }

    async runAutomaticNoDp(fibCalcular : number){
        //console.log("El fib a calcular es: " + fibCalcular)
        let resultado = await this.fibNoDpHelper(fibCalcular,1,0);
        //console.log("Resultado final es: " + resultado)
        return resultado.output;
    }

    async runAutomaticDp(fibCalcular : number){
        let resultado = await this.fibNoDpHelper(fibCalcular,1,0);
        this.tableServ.addOutputByCounter(0,resultado.output);
        return resultado.output;
    }

    getProblemID(): string {
        return "fib";
    }
}