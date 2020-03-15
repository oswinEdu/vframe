const { ccclass, property } = cc._decorator;


interface IFCellFunc {
    (idx: number, cellNode: cc.Node, view: cc.ScrollView): cc.Node;
}

interface IFSizeFunc {
    (idx: number, view: cc.ScrollView): cc.Size;
}

interface IFBackFunc {
    (idx: number, cellNode: cc.Node): void;
}


@ccclass
export class VScrollView extends cc.Component {
    private readonly IS_DEBUG: boolean = true;

    @property(cc.ScrollView)
    private mscrollView: cc.ScrollView = null;
    @property(cc.Node)
    private mcontent: cc.Node = null;
    @property(cc.Node)
    private mview: cc.Node = null;

    private _cellFunc: IFCellFunc;
    private _sizeFunc: IFSizeFunc;
    private _cellNum: number = 0;

    private _cellArr: ECellNode[];
    private _contentH: number = 0;
    private _spacing: number = 0;
    private _target: any = null;


    public constructor() {
        super();
        this._target = null;
        this._contentH = 0;
        this._spacing = 0;
        this._cellArr = [];
    }


    protected onLoad() { }
    protected start() { }



    /**
     *初始化
     * @param {number} cellNum：行数
     * @param {IFCellFunc} cellFunc：填充cell
     * @param {IFSizeFunc} sizeFunc：cell大小
     * @param {number} [spacing=0]：可选行间距
     * @param {number} [upSpacing=0]：第一行距离上面间距
     * @memberof EScrollView
     */
    public init(target: any, cellNum: number, cellFunc: IFCellFunc, sizeFunc: IFSizeFunc, spacing: number = 0, upSpacing: number = 0): void {
        this._target = target;
        this._cellNum = cellNum;
        this._cellFunc = cellFunc;
        this._sizeFunc = sizeFunc;
        this._spacing = spacing;
        this._contentH = upSpacing;

        this.mcontent.removeAllChildren();

        // 计算 content size
        let maxW: number = 0;
        let conH: number = upSpacing;
        for (let i = 0; i < this._cellNum; i++) {
            let tsize: cc.Size = this._sizeFunc.call(this._target, i, this.mscrollView);
            conH += spacing + tsize.height;
            if (tsize.width > maxW) {
                maxW = tsize.width;
            }
        }
        this._setContentSize(maxW, conH);


        //初始化 cell
        for (let i = 0; i < this._cellNum; i++) {
            let size: cc.Size = this._sizeFunc.call(this._target, i, this.mscrollView);
            let cellNode: ECellNode = this._getCellNode(size, i);
            this._cellArr.push(cellNode);
            this._cellFunc.call(this._target, i, cellNode, this.mscrollView);
        }
    }


    public getScrollView(): cc.ScrollView {
        return this.mscrollView;
    }


    public setBackFunc(backFunc: IFBackFunc) {
        for (let i = 0; i < this._cellArr.length; i++) {
            this._cellArr[i].__addButton__(backFunc, this._target);
        }
    }



    private _getCellNode(size: cc.Size, idx: number): ECellNode {
        let cellNode: ECellNode = new ECellNode(idx, size, this._contentH);
        this._setDebugNode(cellNode, size);

        let sizeH: number = size.height;
        //顶部对齐位置
        this._contentH += sizeH + this._spacing;
        cellNode.parent = this.mcontent;

        return cellNode;
    }


    private _setContentSize(cw: number, ch: number): void {
        this.mview.removeComponent(cc.Widget);
        let widget: cc.Widget = this.mview.addComponent(cc.Widget);
        widget.isAlignTop = true;
        widget.top = 0;
        widget.isAlignBottom = true;
        widget.bottom = 0;
        widget.isAlignLeft = true;
        widget.left = 0;
        widget.isAlignRight = true;
        widget.right = 0;

        this.mcontent.setContentSize(cc.size(cw, ch));
    }



    private _setDebugNode(cellNode: cc.Node, size: cc.Size): void {
        if (!this.IS_DEBUG) return;

        let r: number = this._debugRandomNum();
        let g: number = this._debugRandomNum();
        let b: number = this._debugRandomNum();
        cellNode.color = cc.color(r, g, b);

        // assets/resources/texture/white.png 一张白色图片
        let sp: cc.Sprite = cellNode.addComponent(cc.Sprite);
        cc.loader.loadRes("texture/singleColor", cc.SpriteFrame, function (err, spriteFrame) {
            sp.spriteFrame = spriteFrame;
        });
        sp.type = cc.Sprite.Type.SLICED;
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;

        let layout: cc.Layout = cellNode.addComponent(cc.Layout);
        layout.cellSize = size;
    }

    private _debugRandomNum(): number {
        let min: number = Math.ceil(30);
        let max: number = Math.floor(200);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}



@ccclass
export class ECellNode extends cc.Node {
    private _widget: cc.Widget = null;
    private _size: cc.Size = null;
    private _topSpace: number = 0;
    private _idx: number = 0;


    public constructor(idx: number, size: cc.Size, topSpace: number) {
        super('ECellNode');

        this._idx = idx;
        this._topSpace = topSpace;
        this._size = size;
        this.setContentSize(this._size);

        let widget: cc.Widget = this.addComponent(cc.Widget);
        this._widget = widget;
        this._widget.isAlignTop = true;
        this._widget.top = this._topSpace;
    }


    public __addButton__(backFunc: IFBackFunc, target: any) {
        let button: cc.Button = this.addComponent(cc.Button);
        button.node.on('click', (button) => {
            backFunc.call(target, this._idx, this);
        }, this);
    }


    public setRightSpace(rspace: number) {
        this._widget.isAlignRight = true;
        this._widget.right = rspace;
    }


    public getSize(): cc.Size {
        return this._size;
    }

    public getTopSpace(): number {
        return this._topSpace;
    }
}

/**
 * 备注
 * public init(cellNum: number, cellFunc: (idx: number, cellNode: cc.Node, view: cc.ScrollView) => cc.Component, sizeFunc: (idx: number, view: cc.ScrollView) => cc.Size): void {
 *
 */