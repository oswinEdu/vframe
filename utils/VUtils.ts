
class VUtilsIns {
    public static readonly __instance__: VUtilsIns = new VUtilsIns();
    private constructor() {
    }


    // 1.不含最大值，含最小值
    public randomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


    // 2.随机颜色
    public randomColor(): cc.Color {
        let r: number = this.randomInt(30, 200);
        let g: number = this.randomInt(30, 200);
        let b: number = this.randomInt(30, 200);
        return cc.color(r, g, b);
    }
}


export const vutils = VUtilsIns.__instance__;