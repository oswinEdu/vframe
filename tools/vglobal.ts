/** 命名空间实现全局变量
 * 
 */

namespace vsdk {
    // 1.BaseView销毁发送事件告诉VMediator
    export let VIEW_DESTROY_NOTI: string = 'view_destroy_noti'; 


    // 2.打开view选项枚举
    export enum OPEN_VIEW_OPTION {
        LAYER,          // 固定UI层，与其它ui分开管理，需要设置zOrder
        OVERLAY,        // 叠加在其他view上
        SINGLE          // 独立打开，关闭其他view
    }


    // 3.配置
    // debug模式、设计分辨率、高度适配、宽度适配、启动场景
    class vcfgIns {
        public DEBUG: boolean = true;
        // public DESIGN_RESOLUTION: cc.Size = cc.size(640, 960);
        // public FIT_HEIGHT: boolean = true;
        // public FIT_WIDTH: boolean = true;
        public START_SCENE: string = 'START_SCENE';
    }
    export let cfg: vcfgIns = new vcfgIns();
    
}

window['vsdk'] = vsdk;