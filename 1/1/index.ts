document.addEventListener('DOMContentLoaded', () => {
    start()
}
)

function start() {
    const canvas = document.getElementsByTagName('canvas')[0]
    const ctx = canvas.getContext('2d')

    const a1 = createA('black')
    const a2 = createA('black')
    const a3 = createA('black')

}

function createA(color: string = 'blue'): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    canvas.width = 60
    canvas.height = 100
    const ctx = canvas.getContext('2d')

    drawA(ctx, 0, 0, color)
    console.log(canvas)
    return canvas
}

function drawA(ctx: CanvasRenderingContext2D, x: number, y: number, color: string = 'black'): void {
    const a = new Path2D()

    a.moveTo(x, y + 100)
    a.lineTo(x + 25, y)
    a.lineTo(x + 35, y)
    a.lineTo(x + 60, y + 100)

    a.lineTo(x + 50, y + 100)
    a.lineTo(x + 35, y + 34)

    a.lineTo(x + 30, y + 14)
    a.lineTo(x + 25, y + 34)
    a.lineTo(x + 10, y + 100)
    ctx.fillRect(x + 15, y + 70, 30, 10)

    ctx.fill(a)


}


