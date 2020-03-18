import { mgrView } from "./mgr/MgrView";
import { VMediator } from "./base/VMediator";
import { VScene } from "./base/VScene";
import { BaseView } from "./base/BaseView";

export class VCtrlIns {
    public static readonly __instance__: VCtrlIns = new VCtrlIns();
    private constructor() {
    }
    

    // 框架是否被初始化
    private static _isInit: boolean = false;

    
    /**
     * 初始化框架配置 onload 初始化
     * @param {boolean} debug 是否是调试状态
     * @param {cc.Size} designResolution 设计分辨率
     * @param {boolean} fitHeight 是否高适配
     * @param {boolean} fitWidth 是否宽适配
     */
    public init(debug: boolean): void {
        if (VCtrlIns._isInit) {
            console.warn("框架已经初始化，不需要重复初始化。");
            return;
        }

        VCtrlIns._isInit = true;
        vconst.cfg.DEBUG = debug;
    }


    /**
     * 运行场景
     * @param {{new(): VMediator}} mediator 场景mediator类型，类类型。
     * @param {{new(): VScene}} view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @param {()=>void} cb 加载完成回调.
     */
    public runScene(mediator: { new(): VMediator }, view: { new(): VScene}, data?: any, cb?:()=> void): void {
        if (VCtrlIns._isInit) {
            mgrView.__runScene__(mediator, view, data, cb);
        } else {
            console.warn("框架没有初始化，请先调用init接口进行初始化。");
        }
    }


    /**
     * 返回上一场景
     * @returns {boolean}是否存在上一个场景
     */
    public backScene(): boolean {
        return mgrView.__backScene__();
    }


    /**
     * 打开view界面，弹出界面
     * @param {{new(): VMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @param {()=>void} cb 加载完成回调.
     */
    public popView(mediator: {new():VMediator}, view: {new():BaseView}, data?: any, cb?: ()=>void): void {
        mgrView.__showView__(mediator, view, data, vconst.OPEN_VIEW_OPTION.OVERLAY, 0, cb);
    }


    /**
     * 创建view层，此接口用于初始不会被关闭和再次打开的常驻界面，所以它也不会受到pooView影响和管理。
     * @param {{new(): VMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {number} zOrder ui层级
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @param {()=>void} cb 加载完成回调.
     */
    public addLayer(mediator: {new(): VMediator}, view: {new(): BaseView}, zOrder?: number, data?: any, cb?: ()=>void): void {
        mgrView.__showLayer__(mediator, view, data, vconst.OPEN_VIEW_OPTION.LAYER, zOrder, cb);
    }


    /**
     * 撤销命令
     * @param {{new (): BaseCommand}} command 命令对象
     * @param {Object} body 命令参数
     */
    public __undoCommand__(command: {new(): msdk.BaseCmd}, body ? : any): void {
        msdk.mgrCmd.__undoCommand__(command, body);
    }


    /**
     * 注册数据model
     * @param {{new (): BaseModel}} model
     */
    public registerModel(model: {new(): msdk.BaseModel}): void {
        msdk.mgrModel.registerModel(model);
    }


    /**
     * 获取model对象
     * @param {{new (): BaseModel}} model
     */
    public getModel<T extends msdk.BaseModel > (model: {new(): T}): T {
        return msdk.mgrModel.getModel(model);
    }
}