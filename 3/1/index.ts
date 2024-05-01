import {Painter} from '../../src/webgl2dPainter/Painter'

document.addEventListener('DOMContentLoaded', main)

async function main() {
	const canvas = document.createElement('canvas')
	document.body.append(canvas)
	await Painter.create(canvas, draw)
}

function drawGrid(painter: Painter) {
	painter.clear();
	painter.drawLine(961, 0, -961, 0);
	painter.drawLine(961, 0, 921, 20);
	painter.drawLine(961, 0, 921, -20);

	for (let i = -10; i <= 10; ++i) {
		painter.drawLine(i / 10 * 961, 9, i / 10 * 961, -9);
	}

	painter.drawLine(0, 961, 0, -961);
	painter.drawLine(0, 961, 20, 921);
	painter.drawLine(0, 961, -20, 921);

	for (let i = -10; i <= 10; ++i) {
		painter.drawLine(14, i / 10 * 961, -14, i / 10 * 961);
	}
}

function drawControlPoints(painter: Painter, controlPoints: number[][]) {
	controlPoints.forEach(point => {
		painter.drawPoint(point[0], point[1])
			});
}

function approximateBezierCurve(painter: Painter, controlPoints: number[][]) {
	let prevP = controlPoints[0];

	/*B(t) = (1-t)^3 * P_0 + 3 * (1-t)^2 * t * P_1 + 3 * (1-t) * t^2 * P_2 + t^3 * P_3*/
	for (let t = 0; t <= 1.01; t += 0.01) {
		const invT = 1 - t;
		const invT2 = invT * invT;
		const invT3 = invT2 * invT;

		const scalarFn = (i: number) => controlPoints[0][i] * invT3 +
			controlPoints[1][i] * 3 * t * invT2 +
			controlPoints[2][i] * 3 * invT * t * t +
			controlPoints[3][i] * t * t * t;

		const nextP = [scalarFn(0), scalarFn(1)];
		painter.drawLine(prevP[0], prevP[1], nextP[0], nextP[1], [0.4, 0.6, 0.4, 1]);
		prevP = nextP;
	}
}

function draw(painter: Painter) {
	drawGrid(painter);

	const controlPoints = [
		[-972, -576],
		[-640, 692],
		[80, -896],
		[1120, 576],
	];

	painter.drawLine(-972, -576, -640, 692, [0.7, 0.7, 0.7, 1])
	painter.drawLine( 1120, 576, 80, -896, [0.7, 0.7, 0.7, 1])

	drawControlPoints(painter, controlPoints);
	approximateBezierCurve(painter, controlPoints);
}

export {}