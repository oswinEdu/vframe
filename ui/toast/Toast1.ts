
const { ccclass, property } = cc._decorator;

@ccclass
export class Toast1 extends cc.Component {
    @property(cc.Label) text: cc.Label = null;


    public showToast1(content: string) {
        this.text.string = content;
        this.node.stopAllActions();
        let t = this;
        
        let moveTo = cc.moveBy(0.4, new cc.Vec2(0, 100));
        let easing = moveTo.easing(cc.easeElasticOut(0.6));
        let delay = cc.delayTime(1.2);
        let fadeOutAuto = function () {
            t.node.runAction(cc.sequence(cc.fadeOut(0.2), cc.removeSelf()))
        }

        let callFun = cc.callFunc(fadeOutAuto);
        t.node.runAction(cc.sequence(easing, delay, callFun))
    }
}