class UILoadIns {
    public static readonly __instance__: UILoadIns = new UILoadIns();
    private constructor() {
    }


    public loadRes(path: string, type: typeof cc.Asset, loadBack: (node: cc.Node)=>void): void {
        cc.loader.loadRes(path, type, (err: Error, resource: any) => {
            if (err) {
                return;
            }
            let viewNode: cc.Node = cc.instantiate(resource);
            loadBack(viewNode);
        });
    }

}


export const uiload = UILoadIns.__instance__;