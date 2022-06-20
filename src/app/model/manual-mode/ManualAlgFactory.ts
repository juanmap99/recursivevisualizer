import { CodeBgService } from "src/app/services/code-bg.service";
import { MemoService } from "src/app/services/memo.service";
import { TableManagerService } from "src/app/services/table-manager.service";
import { Problem } from "../problems-alg/Problem";
import { ManualCombDp } from "./manual-dp/ManualCombDp";
import { ManualFibDp } from "./manual-dp/ManualFibDP";
import { ManualHRobDp } from "./manual-dp/ManualHRobDP";
import { ManualTSumDp } from "./manual-dp/ManualTSumDP";
import { ManualUPathsDp } from "./manual-dp/ManualUPathsDP";
import { ManualCombNoDp } from "./manual-no-dp/ManualCombNoDp";
import { ManualFibNoDp } from "./manual-no-dp/ManualFibNoDP";
import { ManualHRobNoDp } from "./manual-no-dp/ManualHRobNoDp";
import { ManualTSumNoDp } from "./manual-no-dp/ManualTSumNoDp";
import { ManualUPathsNoDp } from "./manual-no-dp/ManualUPathsNoDp";
import { ManualAlg } from "./ManualAlg";

export class ManualAlgFactory{
    static getManualAlgNoDP(problem : Problem,codeBg : CodeBgService,
        tableServ : TableManagerService,memoServ : MemoService) : ManualAlg{
        switch(problem.getProblemName()){
            case("Fibonacci"):
                return new ManualFibNoDp(problem,codeBg,tableServ,memoServ);
            case("TargetSum"):
                return new ManualTSumNoDp(problem,codeBg,tableServ,memoServ);
            case("CombSum"):
                return new ManualCombNoDp(problem,codeBg,tableServ,memoServ);
            case("HouseRobber"):
                return new ManualHRobNoDp(problem,codeBg,tableServ,memoServ);
            case("UniquePaths"):
                return new ManualUPathsNoDp(problem,codeBg,tableServ,memoServ);
          }
        return new ManualFibNoDp(problem,codeBg,tableServ,memoServ);
    }
    static getManualAlgDP(problem : Problem,codeBg : CodeBgService,
        tableServ : TableManagerService,memoServ : MemoService) : ManualAlg{
        switch(problem.getProblemName()){
            case("Fibonacci"):
                return new ManualFibDp(problem,codeBg,tableServ,memoServ);
            case("TargetSum"):
                return new ManualTSumDp(problem,codeBg,tableServ,memoServ);
            case("CombSum"):
                return new ManualCombDp(problem,codeBg,tableServ,memoServ);
            case("HouseRobber"):
                return new ManualHRobDp(problem,codeBg,tableServ,memoServ);
            case("UniquePaths"):
                return new ManualUPathsDp(problem,codeBg,tableServ,memoServ);
          }
        return new ManualFibNoDp(problem,codeBg,tableServ,memoServ);
    }
}