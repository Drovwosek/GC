

export function createTrampoline(ctx:CanvasRenderingContext2D, x: number, y: number): void{
    const img = new Image()

    img.src = "/source/batoot.jpg"
    img.alt = "where img?"
    //document.body.appendChild(img)
    ctx.drawImage(img, x, y)

}

function drawTrampoline(){

}