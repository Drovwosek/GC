document.addEventListener('DOMContentLoaded', () => {
    start()
}
)

function start() {
    const canvas = document.getElementsByTagName('canvas') [0]
    createA('black')
    createA('black')
    createA('black')

}

function createA(color: string = 'blue'): HTMLCanvasElement {
    console.log("creating A")
    const canvas = document.createElement('canvas')
    canvas.width = 60
    canvas.height = 100
    const ctx = canvas.getContext('2d')

    drawA(ctx, 0, 0, color)
    console.log(canvas)
    return canvas
}

function drawA(ctx: CanvasRenderingContext2D, x: number, y: number, color: string = 'blue'): void {
    const a = new Path2D()

    a.moveTo(x, y + 100)
    a.lineTo(x + 25, y)
    a.lineTo(x + 35, y)
    a.lineTo(x + 60, y + 100)

    a.lineTo(x + 50, y + 100)
    a.lineTo(x + 35, y + 34)
    a.lineTo(x + 25, y + 34)
    a.lineTo(x + 10, y + 100)
    a.lineTo(x, y + 100)

    ctx.fillStyle = color
    ctx.fill(a)

    ctx.fillRect(x + 15, y + 70, 30, 10)
    console.log("draw A")
}
