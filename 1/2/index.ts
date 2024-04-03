import {House} from "./House";

document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementsByTagName('canvas')[0]
        const ctx = canvas.getContext('2d')

        let house = new House()
            house.draw(canvas)
        ctx.scale(1.5, 3)
            house.draw(canvas)
}

)

//TODO: дрыгындроп
//TODO: переведи на класс
//TODO: переведи на канвасное масштабирование, узнай про трансформации для канваса.
//TODO: нужно построить два дома: один нормальный, другой побольше
