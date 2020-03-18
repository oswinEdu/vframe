/** vsdk全局变量
 * 
 */

import { VGameIns } from "../VGame";

import { VCtrlIns } from "../VCtrl";

import { VUtilsIns } from "../utils/VUtils";

import { UILoadIns } from "../ui/UILoad";
import { UIToastIns } from "../ui/UIToast";
import { VActionIns } from "../ui/VAction";
import { VDialogIns } from "../ui/VDialog";
import { VTextIns } from "../ui/VText";
import { VUIIns } from "../ui/VUI";


export class vins {
    private constructor(){}

    static game         = VGameIns.__instance__;
    static ctrl         = VCtrlIns.__instance__;


    static utils        = VUtilsIns.__instance__;


    static uiload       = UILoadIns.__instance__;
    static uitoast      = UIToastIns.__instance__;
    static action       = VActionIns.__instance__;
    static dialog       = VDialogIns.__instance__;
    static text         = VTextIns.__instance__;
    static ui           = VUIIns.__instance__;
}
