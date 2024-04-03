import {createA} from "./letterA";
import {createTrampoline} from "./trampoline";

document.addEventListener('DOMContentLoaded', () => {
    start()
}
)

function start()  {
    var start: number = null;

    const canvas = document.getElementsByTagName('canvas')[0]
    const ctx = canvas.getContext('2d')

    let y1, y2, y3
    const y1Generator = UAMGenerator(400, -4, 0.1)
    const y2Generator = freezeUAMGenerator(UAMGenerator(400, -4, 0.1), 8)
    const y3Generator = freezeUAMGenerator(UAMGenerator(400, -4, 0.1), 16)

    const a1 = createA('#404040')
    const a2 = createA('#606060')
    const a3 = createA('#909090')

    requestAnimationFrame(animate)

    function animate(currentTime: number) {
        if (!start) start = currentTime // что я тут получил? зачем мне это?

        ctx.clearRect(0, 0, 1000, 800)
        createTrampoline(ctx, 25, 450)

        y1 = y1Generator.next().value
        y2 = y2Generator.next().value
        y3 = y3Generator.next().value

        ctx.drawImage(a1, 125, Math.floor(y1))
        ctx.drawImage(a2, 225, Math.floor(y2))
        ctx.drawImage(a3, 325, Math.floor(y3))

        requestAnimationFrame(animate)
    }
}

function* freezeUAMGenerator(generator: Generator<number>, n: number): Generator<number> {
    const frozenValue = generator.next().value

    for (let i = 0; i <= n; ++i) {
        yield frozenValue
    }

    while (true) {
        yield generator.next().value
    }
}

function* UAMGenerator(x0: number, vx0: number, ax: number): Generator<number> {
    let x = x0
    let vx = vx0
    //TODO : учитывать время проведения отрисовки следующего кадра
    while (true) {
        x += vx
        vx += ax

        if (x >= x0) {
            x = x0
            vx = vx0
        }

        yield x
    }
}
