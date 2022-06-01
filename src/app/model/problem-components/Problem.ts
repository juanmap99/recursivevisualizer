import { RunParams } from "../run/RunParams";
import { ProblemConfig } from "./ProblemConfig";

export abstract class Problem{
    protected problemConfig : ProblemConfig;

    constructor(){
        this.problemConfig = this.buildProblemConfig();
    }

    getProblemConfig(): ProblemConfig{return this.problemConfig;}

    protected abstract buildProblemConfig() : ProblemConfig

    adjustProblemConfig(runParams : RunParams){
        this.problemConfig.setParameters(runParams.parameters);
        this.problemConfig.setRunDelay(runParams.velocity);
        this.problemConfig.setRunningMode(runParams.runMode);
    }
}