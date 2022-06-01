import { Parameter } from "../problem-components/Parameter";
import { RunMode } from "./RunMode";

export interface RunParams{
    runMode : RunMode;
    parameters : Parameter[];
    velocity : number;
    memorization : boolean; 
}