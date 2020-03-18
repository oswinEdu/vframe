import { VMediator } from "./VMediator";



export class ViewEvent {
    // 1.事件列表 
    private _eventList: __ViewEvent__[];
    public constructor() {
        this._eventList = [];
    }


    /** 1.注册事件
     * @param {string} name 事件名称
     * @param {(any)=>void} cb 事件回调
     * @param {VMediator} target 绑定事件的对象
     */
    public on(name: string, cb: (body:any)=>void, target: VMediator): void {
        let event = new __ViewEvent__(name, cb, target);
        for (let e of this._eventList) {
            if (e.equals(event)) {
                console.log("事件[" + name + "]已存在！");
                return;
            }
        }

        this._eventList.push(event);
    }
    

    /** 2.派发事件
     * @param {string} name 事件名称
     * @param {Object} body 事件参数，动态参数列表
     */
    public emit(name: string, body?: any): void {
        for (let e of this._eventList) {
            if (e.name === name) {
                e.cb && e.cb.call(e.target, body);
                break;
            }
        }
    }


    /** 3.移除指定事件(目前没有调用)
     * @param {string} name 事件名称
     * @return {boolean} 是否移除
     */
    public remove(name: string): boolean {
        for (let i = 0; i < this._eventList.length; i++) {
            if (name === this._eventList[i].name) {
                this._eventList.splice(i, 1);
                return true;
            }
        }
        return false;
    }


    // 4.销毁接口(关闭view调用)
    public destroy(): void {
    }
}


/**
 * 事件对象结构，用于内部使用。
 * @private
 */
class __ViewEvent__ {
    // 1.事件名称
    public name: string;
    // 2.事件回调
    public cb: (...args) => void;
    // 3.绑定事件的对象
    public target: VMediator;


    /***
     * @param {string} name 事件名称
     * @param {(...args)=>void} cb 事件回调
     * @param {VMediator} target 绑定事件的对象
     */
    public constructor(name: string, cb: (...args) => void, target: VMediator) {
        this.name = name;
        this.cb = cb;
        this.target = target;
    }


    /**
     * 判断两个对象是否相等
     * @param {__ViewEvent__} event 目标事件对象
     * @return {boolean} 是否相等
     */
    public equals(event: __ViewEvent__): boolean {
        return this.name === event.name;
    }
}

