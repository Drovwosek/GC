import {House} from "./House";
import {dragAndDropable} from "../../src/dragAndDrop";

document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementsByTagName('canvas')[0]
        const ctx = canvas.getContext('2d')
        dragAndDropable(canvas)

        let house2 = new House(200, 50)
        ctx.scale(1.5, 1.5)//TODO: применение восстановления холста


            house2.draw(canvas)
            ctx.resetTransform()


            let house1 = new House(0, 0)
            house1.draw(canvas)

    }
)

//TODO: переведи на канвасное масштабирование.
//TODO: нужно построить два дома: один нормальный, другой побольше
