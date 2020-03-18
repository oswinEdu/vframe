/** vsdk全局变量
 * 
 */

import { vgame } from "../VGame";
import { vctrl } from "../VCtrl";

import { VUtilsIns } from "../utils/VUtils";

import { UILoadIns } from "../ui/UILoad";


namespace vsdk {
    export let game = vgame; 

    export let ctrl = vctrl;

    export const vutils = VUtilsIns.__instance__;

    export const uiload = UILoadIns.__instance__;
}

window['vsdk'] = vsdk;