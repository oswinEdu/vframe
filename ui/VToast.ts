export class VToastIns {
    public static readonly __instance__: VToastIns = new VToastIns();
    private constructor() {
    }


    public shortToast(text: string, node: cc.Node): void {
        // node.stopAllActions();

        // let label: cc.Label = node.getComponent(cc.Label);

        // let moveTo = cc.moveBy(0.4, new cc.Vec2(0, 100));
        // let easing = moveTo.easing(cc.easeElasticOut(0.6));
        // let delay = cc.delayTime(1.2);
        // let fadeOutAuto = function () {
        //     node.runAction(cc.sequence(cc.fadeOut(0.2), cc.removeSelf()))
        // }
        // let callFun = cc.callFunc(fadeOutAuto);
        // node.runAction(cc.sequence(easing, delay, callFun))
    }

}
