export function createTrampoline(ctx:CanvasRenderingContext2D, x: number, y: number): void{
    const img = new Image()

    img.src = "/src/batoot.jpg"
    img.alt = "where img?"
    ctx.drawImage(img, x, y)

}
