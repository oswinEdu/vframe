export class VLoadIns {
    public static readonly __instance__: VLoadIns = new VLoadIns();
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


