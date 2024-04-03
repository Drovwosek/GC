import {House} from "./House";
import {dragAndDropable} from "../../source/dragAndDrop";

document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementsByTagName('canvas')[0]
        const ctx = canvas.getContext('2d')

        let house1 = new House(0, 0)
        house1.draw(canvas)

        let house2 = new House(300, 150)
        ctx.scale(1.5, 1.5)
        house2.draw(canvas)
}
)

//TODO: переведи на канвасное масштабирование.
//TODO: нужно построить два дома: один нормальный, другой побольше
