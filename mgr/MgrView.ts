import { VMediator } from "../base/VMediator";
import { VScene } from "../base/VScene";
import { BaseView } from "../base/BaseView";


class MgrViewIns {
    public static readonly __instance__: MgrViewIns = new MgrViewIns();
    private constructor() {
        this._popViewList = [];
        this._layerViewList = [];
    }

    // 1.上一场景类
    private _preSceneMediatorCls: {new(): VMediator} = null;
    private _preSceneViewCls: {new(): VScene} = null;
    // 2.当前场景类
    private _curSceneMediatorCls: {new(): VMediator} = null;
    private _curSceneViewCls: {new(): VScene} = null;

    // 3.当前场景
    private _curScene: VMediator = null;
    // 4.当前显示的pop view列表
    private _popViewList: VMediator[];
    // 5.当前显示的layer view列表
    private _layerViewList: VMediator[];


    
    private _handleView(Mediator: { new(): VMediator }, View: { new(): BaseView }, viewNode: cc.Node, data?: any, option?: vconst.OPEN_VIEW_OPTION, zOrder?: number): void {
        let canvas: cc.Node = cc.director.getScene().getChildByName('Canvas');
        if (!canvas) {
            msdk.mlog.error('2.场景中必须包含默认的Canvas节点！');
        }

        viewNode.zIndex = zOrder;
        canvas.addChild(viewNode);

        let vmediator: VMediator = new Mediator();
        this._bindViewMediator(vmediator, View, viewNode, data);

        // 根据不同打开类型，存储到不同队列中。
        if (option === vconst.OPEN_VIEW_OPTION.OVERLAY || option === vconst.OPEN_VIEW_OPTION.SINGLE) {
            this._popViewList.push(vmediator);
        } else if (option === vconst.OPEN_VIEW_OPTION.LAYER) {
            this._layerViewList.push(vmediator);
        }
    }


    private _handleScene(Mediator: { new(): VMediator }, View: { new(): BaseView }, data?: any): void {
        let canvas: cc.Node = cc.director.getScene().getChildByName('Canvas');
        if (!canvas) {
            msdk.mlog.error('1.场景中必须包含默认的Canvas节点！');
        }

        // 保存当前场景
        let vmediator: VMediator = new Mediator();
        this._curScene = vmediator;
        if (this._curSceneMediatorCls != null && this._curSceneViewCls != null) {
            this._preSceneMediatorCls = this._curSceneMediatorCls;
            this._preSceneViewCls = this._curSceneViewCls;
        }
        this._curSceneMediatorCls = Mediator;
        this._curSceneViewCls = View;

        this._bindViewMediator(vmediator, View, canvas, data);
    }


    private _bindViewMediator(mediator: VMediator, View: { new(): BaseView }, viewNode: cc.Node, data?: any): void {            
        mediator["__init__"]();
        mediator.init(data);
        
        mediator.view = viewNode.getComponent(View);
        mediator.view.__init__();
        mediator.__viewFinish__();
        mediator.viewDidAppear();
    }


    /** 1.运行场景
     * @param {{new(): VMediator}} mediator 场景mediator类型，类类型。
     * @param {{new(): VScene}} view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @param {()=>void} cb 加载完成回调.
     * @private
     */
    public __runScene__(Mediator: { new(): VMediator }, View: { new(): BaseView}, data?: any, cb?: ()=>void): void {
        // 处理场景显示逻辑
        let scenePath: string = (<any>(View)).path();
        
        if (scenePath === vconst.cfg.START_SCENE) {
            this.__closeAllView__();
            this._handleScene(Mediator, View, data);
            cb && cb();
        }
        else if (scenePath === "") {
            let ccs = new cc.Scene();
            ccs.name = "Scene";
            let canvasNode = new cc.Node();
            canvasNode.name = "Canvas";
            // 创建的 scene 需要设置分辨率
            // let canvas = canvasNode.addComponent(cc.Canvas);
            // canvas.designResolution = vins.cfg.DESIGN_RESOLUTION;
            // canvas.fitHeight = vins.cfg.FIT_HEIGHT;
            // canvas.fitWidth = vins.cfg.FIT_WIDTH;

            canvasNode.addComponent(View);
            ccs.addChild(canvasNode);

            cc.director.runSceneImmediate(ccs,  function(){}, function(){
                this.__closeAllView__();
                this._handleScene(Mediator, View, data);
                cb && cb();
            });
        } 
        else {
            cc.director.loadScene(scenePath, () => {
                this.__closeAllView__();
                this._handleScene(Mediator, View, data);
                cb && cb();
            });
        }
    }


    /**
     * 返回上一场景
     * @returns {boolean}是否存在上一个场景
     */
    public __backScene__(): boolean {
        if (this._preSceneMediatorCls && this._preSceneViewCls) {
            this.__runScene__(this._preSceneMediatorCls, this._preSceneViewCls);
            return true;
        }
        return false;
    }


    /**
     * 打开view界面
     * @param {{new(): VMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @param {OPEN_VIEW_OPTION} option 打开ui的操作选项，枚举类型。
     * @param {number} zOrder 层级。
     * @param {()=>void} cb 加载完成回调.
     */
    public __showView__(Mediator: { new(): VMediator }, View: { new(): BaseView }, data?: any, option?: vconst.OPEN_VIEW_OPTION, zOrder?: number, cb?: () => void): void {
        // 处理打开UI的其他操作
        this._openViewOptionHandler(option);

        // 处理场景显示逻辑
        let viewPath: string = (<any>(View)).path();
        if (viewPath === "") {
            let viewNode = new cc.Node();
            this._handleView(Mediator, View, viewNode, data, option, zOrder);
            cb && cb();
        } else {
            cc.loader.loadRes(viewPath, cc.Prefab, (err, prefab) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let viewNode: cc.Node = cc.instantiate(prefab);
                this._handleView(Mediator, View, viewNode, data, option, zOrder);
                cb && cb();
            });
        }
    }


    public __showLayer__(mediator: { new(): VMediator }, View: { new(): BaseView }, data?: any, option?: vconst.OPEN_VIEW_OPTION, zOrder?: number, cb?: () => void): void {
        this.__showView__(mediator, View, data, option, zOrder, cb);
    }


    /**
     * 关闭指定View, BaseView 调用
     * @param view
     * @private
     */
    public __closeView__(view: BaseView): void {
        for (let i = 0; i < this._popViewList.length; i++) {
            if (this._popViewList[i].view === view) {
                this._popViewList.splice(i, 1);
                return;
            }
        }

        for (let i = 0; i < this._layerViewList.length; i++) {
            if (this._layerViewList[i].view === view) {
                this._layerViewList.splice(i, 1);
                return;
            }
        }
    }


    /**
     * 关闭所有弹出窗口, BaseView 调用
     * @private
     */
    public __closeAllPopView__(): void {
        for (let i = 0; i < this._popViewList.length; i++) {
            this._popViewList[i].view["__onClose__"]();
        }
        this._popViewList = [];
    }


    /**
     * 关闭所有添加层级
     * @private
     */
    public __closeAllAddLayer__(): void {
        for (let i = 0; i < this._layerViewList.length; i++) {
            this._layerViewList[i].view["__onClose__"]();
        }
        this._layerViewList = [];
    }


    /**
     * 关闭所有view, 切换scene调用
     * @private
     */
    public __closeAllView__(): void {
        this.__closeAllPopView__();
        this.__closeAllAddLayer__();
    }


    /**
     * 根据参数处理ui的打开方式
     * @param option
     * @private
     */
    private _openViewOptionHandler(option: vconst.OPEN_VIEW_OPTION): void {
        // 设置默认值
        if (!option) {
            option = vconst.OPEN_VIEW_OPTION.OVERLAY;
        }
        // 根据不同操作做不同处理
        if (option === vconst.OPEN_VIEW_OPTION.SINGLE) {
            // TODO:暂时不提供这种关闭其他view的打开方式，可以通过BaseView.closeAllPopView()来实现。
        }
    }


    get popViewList(): VMediator[] {
        return this._popViewList;
    }
    
    get layerViewList(): VMediator[] {
        return this._layerViewList;
    }

    get curScene(): VMediator {
        return this._curScene;
    }
}

export const mgrView = MgrViewIns.__instance__;