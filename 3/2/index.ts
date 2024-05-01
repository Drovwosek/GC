import {Painter, Color} from '../../src/webgl2dPainter/Painter'

document.addEventListener('DOMContentLoaded', main)

async function main(){
    const canvas = document.createElement('canvas')
    document.body.append(canvas)

    await Painter.create(canvas, draw)
}

const red: Color = [0.8, 0.2, 0.5, 1]
const nose_red: Color = [0.7, 0.2, 0.3, 1]
const purple: Color = [0.3, 0.2, 0.4, 1]
const dark_purple: Color = [0.25, 0.15, 0.35, 1]
const white: Color = [1, 1, 1, 1]
const black: Color = [0, 0, 0, 1]
function draw(painter: Painter) { //TODO: сделайте класс
    painter.clear();

    // needles
    painter.drawTriangle(-350, 0,-650, 440, -290, 390, purple)
    painter.drawTriangle(-450, 340,-390, 700, -50, 390,  purple)
    painter.drawTriangle(-250, 420,0, 750, 400, 250, purple)
    painter.drawTriangle(450, 340,420, 620, 50, 390,  purple)
    painter.drawTriangle(350, 0,650, 390, 290, 370, purple)

    // legs
    painter.drawEllipse(160, -400, 100, 300, red)
    painter.drawEllipse(-160, -400, -100, 300, red)

    // arms
    painter.drawEllipse(500, -220, 60, 100, red)
    painter.drawEllipse(-500, -220, 60, 100, red)
    painter.drawCircle(500, -300, 100, red)
    painter.drawCircle(-500, -300, 100, red)

    // body
    painter.drawCircle(0, 0, 500, red)

    // nose
    painter.drawTriangle(0, -80, -80, 40, 80, 40, nose_red)
    painter.drawTriangle(0, -180, -10, -60, 10, -60, nose_red)

    // mouth
    painter.drawTriangle(0, -140, 0, -180, 100, -120, purple)
    painter.drawTriangle(0, -140, 0, -180, -100, -120, purple)

    // glasses
    painter.drawTriangle(160, 160, 400,400, 450, 350, dark_purple)
    painter.drawTriangle(-160, 160, -400,400, -450, 350, dark_purple)
    painter.drawCircle(160, 160, 170, dark_purple)
    painter.drawCircle(-160, 160, 170, dark_purple)

    // eyes
    painter.drawCircle(160, 160, 120, white)
    painter.drawCircle(-160, 160, 120, white)
    painter.drawEllipse(80, 150, 30, 50, black)
    painter.drawEllipse(-80, 150, 30, 50, black)
    painter.drawEllipse(100, 170, 10, 20, white)
    painter.drawEllipse(-60, 170, 10, 20, white)

}

class Hedgehog {
    private painter: any;

    public draw(painter: Painter): void {
        this.painter.clear();
        this.drawNeedles();
        this.drawLegs();
        this.drawArms();
        this.drawBody();
        this.drawNose();
        this.drawMouth();
        this.drawGlasses();
        this.drawEyes();
    }

    private drawNeedles(): void {
        this.painter.drawTriangle(-350, 0, -650, 440, -290, 390, purple);
        this.painter.drawTriangle(-450, 340, -390, 700, -50, 390, purple);
        this.painter.drawTriangle(-250, 420, 0, 750, 400, 250, purple);
        this.painter.drawTriangle(450, 340, 420, 620, 50, 390, purple);
        this.painter.drawTriangle(350, 0, 650, 390, 290, 370, purple);
    }

    private drawLegs(): void {
        this.painter.drawEllipse(160, -400, 100, 300, red);
        this.painter.drawEllipse(-160, -400, -100, 300, red);
    }

    private drawArms(): void {
        this.painter.drawEllipse(500, -220, 60, 100, red);
        this.painter.drawEllipse(-500, -220, 60, 100, red);
        this.painter.drawCircle(500, -300, 100, red);
        this.painter.drawCircle(-500, -300, 100, red);
    }

    private drawBody(): void {
        this.painter.drawCircle(0, 0, 500, red);
    }

    private drawNose(): void {
        this.painter.drawTriangle(0, -80, -80, 40, 80, 40, nose_red);
        this.painter.drawTriangle(0, -180, -10, -60, 10, -60, nose_red);
    }

    private drawMouth(): void {
        this.painter.drawTriangle(0, -140, 0, -180, 100, -120, purple);
        this.painter.drawTriangle(0, -140, 0, -180, -100, -120, purple);
    }

    private drawGlasses(): void {
        this.painter.drawTriangle(160, 160, 400, 400, 450, 350, dark_purple);
        this.painter.drawTriangle(-160, 160, -400, 400, -450, 350, dark_purple);
        this.painter.drawCircle(160, 160, 170, dark_purple);
        this.painter.drawCircle(-160, 160, 170, dark_purple);
    }

    private drawEyes(): void {
        this.painter.drawCircle(160, 160, 120, white);
        this.painter.drawCircle(-160, 160, 120, white);
        this.painter.drawEllipse(80, 150, 30, 50, black);
        this.painter.drawEllipse(-80, 150, 30, 50, black);
        this.painter.drawEllipse(100, 170, 10, 20, white);
        this.painter.drawEllipse(-60, 170, 10, 20, white);
    }
}
