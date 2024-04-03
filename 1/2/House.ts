import {dragAndDropable} from "../../source/dragAndDrop";

export class House {
     public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D = canvas.getContext('2d')) {
         canvas.width = 440
         canvas.height = 280
         dragAndDropable(canvas)

         this.drawWalls(ctx)
         this.drawPipe(ctx)
         this.drawRoof(ctx)
         this.drawDoor(ctx)
         this.drawWindow(ctx, 130, 150)
         this.drawWindow(ctx, 250, 150)
         this.drawFence(ctx)
    }

    private drawWalls(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#C09A6E'
        ctx.fillRect(120, 120, 200, 140)
    }

    private drawPipe(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = '#AF5043'
            ctx.fillRect(280, 20, 40, 100)
    }

    private drawRoof(ctx: CanvasRenderingContext2D) {
        const roof = new Path2D()
        roof.moveTo(80, 120)
        roof.lineTo(220, 20)
        roof.lineTo(360, 120)
        roof.lineTo(80, 120)
        ctx.fillStyle = '#725B48'
        ctx.fill(roof)
    }

    private drawDoor(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#A8855D'
        ctx.fillRect(180, 256, 80, 6)

        ctx.fillStyle = '#725B48'
        ctx.fillRect(200, 196, 40, 60)

        ctx.beginPath()
        ctx.arc(206, 226, 4, 0, Math.PI * 2, false)
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
            this.drawPlank(ctx, i * 30, 200)
            this.drawPlank(ctx, 260 + i * 30, 200)
        }
    }

    private drawPlank(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.fillStyle = '#673b2f'
        ctx.fillRect(x, y, 20, 100)
    }
}

