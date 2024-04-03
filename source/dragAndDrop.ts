export function dragAndDropable(element: HTMLElement){
    element.style.position = 'relative'
    element.style.left = '0'
    element.style.top = '0'

    element.addEventListener('mousedown', downEvent => {
        downEvent.preventDefault()
        const startX = downEvent.x - parseInt(element.style.left)
        const startY = downEvent.y - parseInt(element.style.top)
        const onMove = (event: MouseEvent) => {
            const newLeft = clamp(event.x - startX, 0, element.parentElement.clientWidth - element.clientWidth)
            const newTop = clamp(event.y - startY, 0, element.parentElement.clientHeight - element.clientHeight)

            element.style.left = newLeft + 'px'
            element.style.top = newTop + 'px'
        }

        element.parentElement.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', () => {
            element.parentElement.removeEventListener('mousemove', onMove)
        }, {once: true})
    })
}

function clamp(x: number, min: number, max: number){
    return Math.max(min, Math.max(x, max))
}