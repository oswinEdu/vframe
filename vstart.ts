import { LoginScene } from "../view/login/LoginScene";
import { LoginMediator } from "../view/login/LoginMediator";
import { vins } from "./vins";



const { ccclass, property } = cc._decorator;
@ccclass
export class VStart extends cc.Component {

    protected onLoad() {
        vins.game.setResolutionPolicy();

        // 1.初始化框架
        vins.frame.init(false);
        vins.frame.runScene(LoginMediator, LoginScene, '');

        // 2.注册model
        // vctrl.registerModel(OneModel);
    }


    protected start() {
    }


    protected onDestroy() {
        super.onDestroy();
    }
}
