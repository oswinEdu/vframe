
export class VGameIns {
    public static readonly __instance__: VGameIns = new VGameIns();
    private constructor() {
    }

    private loadSceneWithProgress(scene: string, cb?: Function) {
        cc.director.preloadScene(scene, () => {
            setTimeout(() => {
                cc.director.loadScene(scene, cb);
            }, 1000);
        });
    }


    /**
     * 设置设计分辨率
     * 
     * @memberof VGameIns
     */
    public setResolutionPolicy(): void {
        let SET_W: number = 1280;
        let SET_H: number = 720;
        let width: number = cc.winSize.width;
        let height: number = cc.winSize.height;
        let ratio: number = SET_W / SET_H;

        let resolution: number = cc.ResolutionPolicy.FIXED_HEIGHT;
        if (ratio > width / height) {
            resolution = cc.ResolutionPolicy.FIXED_WIDTH;
        }


        let func = function () {
            if (cc.sys.isMobile) {
                cc.view.setDesignResolutionSize(SET_W, SET_H, resolution);
                cc.Canvas.instance['alignWithScreen']();
            } else {
                cc.view.setDesignResolutionSize(SET_W, SET_H, resolution);
                cc.Canvas.instance['alignWithScreen']();
            }
        }
        func();

        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, func);
    }
}

