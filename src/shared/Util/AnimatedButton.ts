import { ClickPop, ClickPopUp, ClickPopDown } from "./ClickPop";
import { HoverColor } from "./HoverColor";
import { HoverPop, HoverPopDown, HoverPopUp } from "./HoverPop";
import Tweenable from "./Tweenable";

export interface AnimatedButtonDefaults {
    Size?: UDim2;
    Position?: UDim2;
    ImageColor3?: Color3;
}

export default class AnimatedButton<Base extends GuiButton = GuiButton> extends Tweenable<Base> {
    public constructor(button: Base, spd?: number) {
        super(button, spd);
    }

    public ClickPop(pop: number, spd: number): AnimatedButton<Base> {
        ClickPop(this.Instance, pop, spd);
        return this;
    }

    public ClickPopOn(pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
        return ClickPopDown(this.Instance, pop, spd, defaultGoal);
    }

    public ClickPopOff(pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
        return ClickPopUp(this.Instance, pop, spd, defaultGoal);
    }

    public HoverColor<B extends ImageButton | TextButton = ImageButton>(color: Color3, defaultColor: Color3, spd: number): AnimatedButton<Base> | undefined {
        HoverColor<B>(<B><unknown>this.Instance, color, defaultColor, spd);
        return this;
    }

    public HoverPop(pop: number, spd: number): AnimatedButton<Base> {
        HoverPop(this.Instance, pop, spd)
        return this;
    }

    public HoverPopOn(pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
        return HoverPopUp(this.Instance, pop, spd, defaultGoal);
    }

    public HoverPopOff(spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
        return HoverPopDown(this.Instance, spd, defaultGoal);
    }
}