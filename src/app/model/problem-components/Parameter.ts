import { isNull } from "@angular/compiler/src/output/output_ast";
import { ParamType } from "./ParamType";

export interface Parameter{
    paramName : string;
    paramType : ParamType;
    paramValue : any;
    maxLength : number;
    placeholder : string
}