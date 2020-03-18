export class VActionIns {
    public static readonly __instance__: VActionIns = new VActionIns();
    private constructor() {
    }


    // 1. node.opacity=0
    public showKeysAction(node: cc.Node): void {
        let fadeIn = cc.fadeIn(1);
        let fadeOut = cc.fadeOut(1);
        let delay = cc.delayTime(2);
        let seq = cc.sequence(fadeIn, delay, fadeOut);
        node.runAction(seq);
    }


    // 2.闪烁
    public cursorAction(node: cc.Node) {
        node.resumeAllActions();
        let time1: number = 0.4;
        let time2: number = 0.4;

        let finished = cc.callFunc(function () {
            let fadeIn = cc.fadeIn(time1);
            let fadeOut2 = cc.fadeOut(time1);
            let delay2 = cc.delayTime(time2);
            let seq1 = cc.sequence(fadeIn, delay2, fadeOut2);
            let rf = cc.repeatForever(seq1);
            node.runAction(rf);
        }, this);

        let delay1 = cc.delayTime(time2);
        let fadeOut1 = cc.fadeOut(time1);
        let seq2 = cc.sequence(delay1, fadeOut1, finished);
        node.runAction(seq2);
    }
}
