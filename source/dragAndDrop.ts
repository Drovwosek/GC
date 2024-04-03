export function dragAndDropable(element: HTMLElement){
    element.style.position = 'relative'
    element.style.left = '0'
    element.style.top = '0'

    element.addEventListener('mousedown', downEvent => {
        downEvent.preventDefault()
        const startX = downEvent.x - parseInt(element.style.left)
        const startY = downEvent.y - parseInt(element.style.top)
        const onMove = (event: MouseEvent) => {

            const newLeft = clamp(event.x - startX, 0, element.clientWidth - element.parentElement.clientWidth)
            const newTop = clamp(event.y - startY, 0, element.clientHeight - element.parentElement.clientHeight)
            console.log('max components width: ', element.parentElement.clientWidth, element.clientWidth)
            console.log('new X: ', event.x - startX, 0, element.parentElement.clientWidth - element.clientWidth, '   new Y: ', event.y - startY, 0, element.parentElement.clientHeight - element.clientHeight)
            console.log('new Coors(clamp): ', newLeft, newTop)

            element.style.left = newLeft + 'px'
            element.style.top = newTop + 'px'

        }

        element.parentElement.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', () => {
            element.parentElement.removeEventListener('mousemove', onMove)
        }, {once: true})
    })
    //TODO: window.removeEventListener('mouseout', )
}

function clamp(x: number, min: number, max: number){

    return Math.max(min, Math.max(x, max))
}
