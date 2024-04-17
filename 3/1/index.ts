import {Painter} from '../../src/webgl2dPainter/Painter'

document.addEventListener('DOMContentLoaded', main)

async function main() {
	const canvas = document.createElement('canvas')
	document.body.append(canvas)
	await Painter.create(canvas, draw)
}

// разбить
function draw(painter: Painter) {
	painter.clear()

	painter.drawLine(961, 0, -961, 0)
	painter.drawLine(961, 0, 921, 20)
	painter.drawLine(961, 0, 921, -20)
	for (let i = -9; i <= 9; ++i)
		painter.drawLine(i / 10 * 961, 9, i / 10 * 961, -9)

	painter.drawLine(0, 961, 0, -961)
	painter.drawLine(0, 961, 20, 921)
	painter.drawLine(0, 961, -20, 921)
	for (let i = -9; i <= 9; ++i)
		painter.drawLine(14, i / 10 * 961, -14, i / 10 * 961)


	const controlPoints = [
		[-972, -576],
		[-640, 692],
		[80, -896],
		[1120, 576],
	]
	controlPoints.forEach(point => painter.drawPoint(point[0], point[1]))

	// вынести, создать вторую
	/**
	 * invT = (1 - t)
	 * P = P1 * invT^3 +
	 *     P2 * 3 * t * invT^2 +
	 *     P3 * 3 * invT * t^2 +
	 *     P4 * t^3
	 */
	let prevP = controlPoints[0]
	for (let t = 0; t <= 1.01; t += 0.01) {
		const invT = 1 - t
		const invT2 = invT * invT
		const invT3 = invT2 * invT
		const scalarFn = (i: number) => controlPoints[0][i] * invT3 +
			controlPoints[1][i] * 3 * t * invT2 +
			controlPoints[2][i] * 3 * invT * t * t +
			controlPoints[3][i] * t * t * t
		const nextP = [scalarFn(0), scalarFn(1)]

		painter.drawLine(prevP[0], prevP[1], nextP[0], nextP[1], [0.4, 0.6, 0.4, 1])
		prevP = nextP
	}
}

export {}