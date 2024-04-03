import {dragAndDropable} from "../../source/dragAndDrop";

export class House {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

     public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D = canvas.getContext('2d')) {
         dragAndDropable(canvas)

         this.drawWalls(ctx)
         this.drawPipe(ctx)
         this.drawRoof(ctx)
         this.drawDoor(ctx)
         this.drawWindow(ctx, 130 + this.x, 150 + this.y)
         this.drawWindow(ctx, 250 + this.x, 150 + this.y)
         this.drawFence(ctx)
    }

    private drawWalls(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#C09A6E'
        ctx.fillRect(120 + this.x, 120 + this.y, 200, 140)
    }

    private drawPipe(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = '#AF5043'
            ctx.fillRect(280 + this.x, 20 + this.y, 40, 100)
    }

    private drawRoof(ctx: CanvasRenderingContext2D) {
        const roof = new Path2D()
        roof.moveTo(80 + this.x, 120 + this.y)
        roof.lineTo(220 + this.x, 20 + this.y)
        roof.lineTo(360 + this.x, 120 + this.y)
        roof.lineTo(80 + this.x, 120 + this.y)
        ctx.fillStyle = '#725B48'
        ctx.fill(roof)
    }

    private drawDoor(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#A8855D'
        ctx.fillRect(180 + this.x, 256 + this.y, 80, 6)

        ctx.fillStyle = '#725B48'
        ctx.fillRect(200 + this.x, 196 + this.y, 40, 60)

        ctx.beginPath()
        ctx.arc(206 + this.x, 226 + this.y, 4, 0, Math.PI * 2, false)
        ctx.fillStyle = '#A8855D'
        ctx.fill()
    }

    private drawWindow(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.fillStyle = '#EED73C'
        ctx.fillRect(x, y, 60, 60)

        ctx.strokeStyle = '#725B48'
        ctx.strokeRect(x, y, 60, 60)
        ctx.beginPath()
        ctx.moveTo(x, y + 30)
        ctx.lineTo(x + 60, y + 30)
        ctx.moveTo(x + 30, y)
        ctx.lineTo(x + 30, y + 30)
        ctx.stroke()
    }

    private drawFence(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < 6; i++){
            this.drawPlank(ctx, i * 30 + this.x, 200 + this.y)
            this.drawPlank(ctx, 260 + i * 30 + this.x, 200 + this.y)
        }
    }

    private drawPlank(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.fillStyle = '#673b2f'
        ctx.fillRect(x, y, 20, 100)
    }
}
