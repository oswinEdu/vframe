
export class VUIIns {
    public static readonly __instance__: VUIIns = new VUIIns();
    private constructor() {
    }



    public addTestLabel(parent: cc.Node, str: string, ): void {
        let tnode: cc.Node = new cc.Node();
        tnode.parent = parent;
        tnode.color = cc.Color.WHITE;
        tnode.setContentSize(cc.size(100,20));
        tnode.anchorX = 0;

        let label: cc.Label = tnode.addComponent(cc.Label);
        label.string = str;
        label.fontSize = 20;
        label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;

        let widget: cc.Widget = tnode.addComponent(cc.Widget);
        widget.left = 0;
        widget.isAlignLeft = true;
        // widget.top = 0;
        // widget.isAlignBottom = true;
        // widget.bottom = 0;
        // widget.isAlignTop = true;

        // let sp: cc.Sprite = tnode.addComponent(cc.Sprite);
        // cc.loader.loadRes("texture/singleColor", cc.SpriteFrame, function (err, spriteFrame) {
        //     sp.spriteFrame = spriteFrame;
        // });
        // sp.type = cc.Sprite.Type.SLICED;
        // sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;        
    }
}


