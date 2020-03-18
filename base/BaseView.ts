import { ViewEvent } from "./ViewEvent";
import { mgrView } from "../mgr/MgrView";
import { UIUtils, UIContainer } from "./BaseUI";

// namespace vsdk {
    const {ccclass, property} = cc._decorator;

    @ccclass
    export class BaseView extends cc.Component {
        // 1.当前视图的事件对象
        private __event__: ViewEvent = null;
        // 2.UI节点引用
        public ui: UIContainer;

        
        // 1.MgrView调用, 创建事件、初始化ui
        public __init__(): void {
            this.__event__ = new ViewEvent();
            this.ui = UIUtils.seekAllSubView(this.node);
            this.init();
        }


        /** 2.view 创建时会被调用，子类可以重写
         * @override
         */
        public init(): void {}


        /** 3.发送UI事件
         * @param {string} event 事件名称
         * @param {Object} body 事件参数
         */
        public sendEvent(event: string, body ? : any): void {
            this.__event__.emit(event, body)
        }


        /** 4.mediator调用绑定UI事件
         * @param {string} name 事件名称
         * @param {(body: any)=>void} cb 事件回调
         * @param {VMediator} target 事件回调绑定对象
         * @private 私有函数，不得调用。
         */
        public __bindEvent__(name: string, cb: (body: any) => void, target): void {
            this.__event__.on(name, cb, target);
        }


        // 5.关闭当前的界面
        public closeView(): void {
            mgrView.__closeView__(this);
            this.__onClose__();
        }


        // 6.关闭所有弹出的界面
        public closeAllPopView(): void {
            mgrView.__closeAllPopView__();
        }
        

        // 7.关闭界面调用, MgrView关闭所有时候调用
        private __onClose__(): void {
            this.__event__.destroy();
            this.onClose();
            this.node.destroy();
        }


        /** 8.当界面被关闭时会被调用，子类可以重写该方法
         * @override
         */
        public onClose(): void {
        }


        /** 9.子类覆盖，返回UI的prefab或scene路径
         * @return {string}
         * @override
         */
        public static path(): string {
            return "";
        }


        // 界面销毁, 子类也有此方法需要执行 super.onDestroy()
        public onDestroy() {
            this.sendEvent(vconst.VIEW_DESTROY_NOTI);
        }
        
    }

// }