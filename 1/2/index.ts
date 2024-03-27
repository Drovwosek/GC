
document.addEventListener('DOMContentLoaded', () => {
        drawHouse()
    }
)
//TODO: аче как мелко? Увеличь масштаб
function drawHouse()  {
    const canvas = document.getElementsByTagName('canvas')[0]
    canvas.width = 220
    canvas.height = 140

    const ctx = canvas.getContext('2d')

    drawWalls(ctx)
    drawPipe(ctx)
    drawDoor(ctx)
    drawRoof(ctx)
    drawWindow(ctx, 65, 70)
    drawWindow(ctx, 125, 70)
    drawFence(ctx)
}

function drawWalls(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#C09A6E'
    ctx.fillRect(60, 60, 100, 60)
}

function drawPipe(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#AF5043'
    ctx.fillRect(140, 0, 20, 50)
}

function drawDoor(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#A8855D'//TODO: почему не прорисовалась дверь?
    ctx.fillRect(90, 120, 40, 3)

    ctx.fillStyle = '#725B48'
    ctx.fillRect(100, 90, 20, 30)

    ctx.beginPath()
    ctx.arc(103, 108, 2, 0, Math.PI * 2, true)
    ctx.fillStyle = '#A8855D'
    ctx.fill()
}

function drawRoof(ctx: CanvasRenderingContext2D){
    const roof = new Path2D()
    roof.moveTo(40, 60)
    roof.lineTo(110, 10)
    roof.lineTo(180, 60)
    roof.lineTo(40, 60)
    ctx.fillStyle = '#725B48'
    ctx.fill(roof)
}

function drawWindow(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.fillStyle = '#EED73C'
    ctx.fillRect(x, y, 30, 30)

    ctx.strokeStyle = '#725B48'
    ctx.strokeRect(x, y, 30, 30)
    ctx.beginPath()
    ctx.moveTo(x, y + 15)
    ctx.lineTo(x + 30, y + 15)
    ctx.moveTo(x + 15, y)
    ctx.lineTo(x + 15, y + 15)
    ctx.stroke()
}

function drawFence(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < 6; i++){
        drawPlank(ctx, i * 15, 90)
        drawPlank(ctx, 130 + i * 15, 90)
    }
}

function drawPlank(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.fillStyle = '#673b2f'
    ctx.fillRect(x, y, 10, 50)
}