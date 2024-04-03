export function createA(color: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = 60
    canvas.height = 100
    const ctx = canvas.getContext('2d')

    drawA(ctx, 0, 0, color)
    console.log(canvas)
    return canvas
}

 function drawA(ctx: CanvasRenderingContext2D, x: number, y: number, color: string ): void {
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

    ctx.fillStyle = color
    ctx.fill(a)

    ctx.fillStyle = color
    ctx.fillRect(x + 15, y + 70, 30, 10)

}
