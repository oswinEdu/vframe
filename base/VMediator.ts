import { BaseView} from "./BaseView";
import { VScene } from "./VScene";
import { vins } from "../vins";


export abstract class VMediator  extends msdk.BaseMediator {
    // 1.当前中介者持有的view视图
    public view: BaseView;


    /** 1.初始化接口,此时视图还没有创建，如果想操作视图view请在viewDidAppear函数中进行。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     * @override
     * */
    public abstract init(data ? : any): void;



    /** 2.视图显示后会调用的接口
     * @override
     */
    public abstract viewDidAppear(): void;


    /** 3.销毁接口
     * @override
     */
    public abstract destroy(): void;


    /** 4.内部初始化使用，外部不要调用
     * @private
     */
    private __init__(): void {
    }

    public __viewFinish__(): void {
        this.bindEvent(vconst.VIEW_DESTROY_NOTI, function(data: any){
            this.viewDestroy();
        }, this);
    }



    /** 5.绑定UI事件，接收view层派发的事件
     * @param {string} name 事件名称
     * @param {(any)=>void} cb 事件回调
     * @param {VMediator} target 回调绑定对象
     */
    public bindEvent(name: string, cb: (body: any) => void, target: VMediator): void {
        this.view.__bindEvent__(name, cb, target);
    }


    /** 6.打开新场景
     * @param mediator 
     * @param view 
     * @param data {Object} data 自定义的任意类型透传数据。（可选）
     */
    public runScene(mediator: { new(): VMediator }, view: { new(): VScene}, data?: any): void {
        vins.frame.runScene(mediator, view, data);
    }


    /** 7.返回上一场景
     * @returns {boolean}是否存在上一个场景
     */
    public backScene(): boolean {
        return vins.frame.backScene();
    }


    /** 8.打开view界面
     * @param {{new(): VMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     */
    public popView(mediator: {new(): VMediator }, view: { new(): BaseView}, data?: any): void {
        vins.frame.popView(mediator, view, data);
    }


    /** 9.添加层级 layer
     * @param {{new(): VMediator}} mediator 界面mediator类型，类类型。
     * @param {{new(): BaseView}} view view 场景mediator类型，类类型。
     * @param {number} zOrder 层级。（可选）
     * @param {Object} data 自定义的任意类型透传数据。（可选）
     */
    public addLayer(mediator: { new(): VMediator}, view: { new(): BaseView }, zOrder?: number, data?: any): void {
        vins.frame.addLayer(mediator, view, zOrder, data);
    }


    // 10.界面销毁时调用
    public viewDestroy(): void {
        this.destroy();
        super.viewDestroy();
    }
}

