/** vsdk全局变量
 * 
 */

import { VGameIns } from "../VGame";
import { vctrl } from "../VCtrl";

import { VUtilsIns } from "../utils/VUtils";

import { UILoadIns } from "../ui/UILoad";


namespace vsdk {
    export const game = VGameIns.__instance__;

    export const ctrl = vctrl;

    export const utils = VUtilsIns.__instance__;

    export const uiload = UILoadIns.__instance__;
}

window['vsdk'] = vsdk;