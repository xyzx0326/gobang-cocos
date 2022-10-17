import {
    _decorator, Component,
    Graphics,
} from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('select')
@executeInEditMode(true)
export class select extends Component {

    @property('boolean')
    public isShadow = false;
    private color = "#000000"
    private round = 17;
    private ro = 0;

    onLoad() {
        if (this.isShadow) {

            const g = this.getComponent(Graphics);
            g.lineWidth = 5;
            g.fillColor.fromHEX("#00000050");
            g.strokeColor.fromHEX("#00000050");
            g.circle(0, 0, 4);
            g.fill();
            g.arc(0, 0, this.round, 0, 1 / 5 * Math.PI, true);
            g.arc(0, 0, this.round, 2 / 5 * Math.PI, 3 / 5 * Math.PI, true);
            g.arc(0, 0, this.round, 4 / 5 * Math.PI, 5 / 5 * Math.PI, true);
            g.arc(0, 0, this.round, 6 / 5 * Math.PI, 7 / 5 * Math.PI, true);
            g.arc(0, 0, this.round, 8 / 5 * Math.PI, 9 / 5 * Math.PI, true);
            g.stroke();
            setInterval(() => {
                this.ro = this.ro + 0.5;
                this.node.setRotationFromEuler(0, 0, this.ro)
            }, 10)
        }
    }



    setColor(color: string) {
        this.color = color

        console.log(1);

        const g = this.getComponent(Graphics);
        g.lineWidth = 5;
        g.fillColor.fromHEX(this.color);
        g.strokeColor.fromHEX(this.color);
        g.circle(0, 0, 4);
        g.fill();
        g.arc(0, 0, this.round, 0, 1 / 5 * Math.PI, true);
        g.arc(0, 0, this.round, 2 / 5 * Math.PI, 3 / 5 * Math.PI, true);
        g.arc(0, 0, this.round, 4 / 5 * Math.PI, 5 / 5 * Math.PI, true);
        g.arc(0, 0, this.round, 6 / 5 * Math.PI, 7 / 5 * Math.PI, true);
        g.arc(0, 0, this.round, 8 / 5 * Math.PI, 9 / 5 * Math.PI, true);
        g.stroke();
        setInterval(() => {
            this.ro = this.ro + 0.5;
            this.node.setRotationFromEuler(0, 0, this.ro)
        }, 10)
    }

    update(deltaTime: number) {
    }

}

