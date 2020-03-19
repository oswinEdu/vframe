/** vsdk全局变量
 * 
 */

import { MgrGameIns } from "./mgr/MgrGame";

import { MgrFrameIns } from "./mgr/MgrFrame";

import { VUtilsIns } from "./utils/VUtils";

import { VLoadIns } from "./ui/VLoad";
import { VToastIns } from "./ui/VToast";
import { VActionIns } from "./ui/VAction";
import { VDialogIns } from "./ui/VDialog";
import { VTextIns } from "./ui/VText";
import { VUIIns } from "./ui/VUI";


export class vins {
    private constructor(){}

    static game         = MgrGameIns.__instance__;
    static frame        = MgrFrameIns.__instance__;


    static utils        = VUtilsIns.__instance__;


    static load         = VLoadIns.__instance__;
    static toast        = VToastIns.__instance__;
    static action       = VActionIns.__instance__;
    static dialog       = VDialogIns.__instance__;
    static text         = VTextIns.__instance__;
    static ui           = VUIIns.__instance__;
}
