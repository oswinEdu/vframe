/** vsdk全局变量
 * 
 */

<<<<<<< HEAD
import { vgame } from "../VGame";
=======
import { VGameIns } from "../VGame";
>>>>>>> 5cb34a599020eac025b8cc2795306cb7c86e3c65
import { vctrl } from "../VCtrl";

import { VUtilsIns } from "../utils/VUtils";

import { UILoadIns } from "../ui/UILoad";


namespace vsdk {
<<<<<<< HEAD
    export let game = vgame; 

    export let ctrl = vctrl;

    export const vutils = VUtilsIns.__instance__;
=======
    export const game = VGameIns.__instance__;

    export const ctrl = vctrl;

    export const utils = VUtilsIns.__instance__;
>>>>>>> 5cb34a599020eac025b8cc2795306cb7c86e3c65

    export const uiload = UILoadIns.__instance__;
}

window['vsdk'] = vsdk;