import {mat4, vec3} from 'gl-matrix'
import {createProgram} from './createProgram'

type Color = [number, number, number, number]

class Painter {
	private readonly canvas: HTMLCanvasElement
	private readonly gl: WebGL2RenderingContext
	private readonly program: WebGLProgram
	private readonly render: (painter: Painter) => void

	static async create(canvas: HTMLCanvasElement, render: (painter: Painter) => void) {
		const gl = canvas.getContext('webgl2')
		const program = await createProgram(gl, '../../src/webgl2dPainter/vertex.glsl', '../../src/webgl2dPainter/fragment.glsl')

		return new Painter(canvas, program, render)
	}

	private constructor(canvas: HTMLCanvasElement, program: WebGLProgram, render: (painter: Painter) => void) {
		this.canvas = canvas
		this.program = program
		this.render = render
		this.gl = canvas.getContext('webgl2')
		this.gl.useProgram(this.program)

		let timeout: any
		const resizeObserver = new ResizeObserver(() => {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				this.updateViewport()
				this.render(this)
			}, 100)
		})
		resizeObserver.observe(canvas)
	}

	public drawLine(x1: number, y1: number, x2: number, y2: number, color: Color = [0.1, 0.1, 0.1, 1]) {
		this.setColor(color)

		const positions = [
			x1, y1,
			x2, y2,
		]
		this.setPositions(positions)

		this.gl.drawArrays(this.gl.LINES, 0, 2)
	}

	public drawPoint(x: number, y: number, color: [number, number, number, number] = [0.1, 0.1, 0.1, 1]) {
		this.setColor(color)

		const positions = [x, y]
		this.setPositions(positions)

		this.gl.drawArrays(this.gl.POINTS, 0, 1)
	}

	public drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: [number, number, number, number] = [0.1, 0.1, 0.1, 1]) {
		this.setColor(color)

		this.setPositions([x1, y1, x2, y2, x3, y3])

		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)
	}

	public drawRect(x1: number, y1: number, x2: number, y2: number, color: [number, number, number, number] = [0.1, 0.1, 0.1, 1]) {
		this.drawTriangle(x1, y1, x2, y1, x1, y2, color)
		this.drawTriangle(x2, y2, x2, y1, x1, y2, color)
	}

	public drawCircle(cx: number, cy: number, r: number, color: [number, number, number, number] = [0.1, 0.1, 0.1, 1]) {
		this.drawEllipse(cx, cy, r, r, color)
	}

	public drawEllipse(cx: number, cy: number, rx: number, ry: number, color: [number, number, number, number] = [0.1, 0.1, 0.1, 1]) {
		const numVerts = 100
		for (let i = 0; i < numVerts; i++) {
			this.drawTriangle(
				cx,
				cy,
				cx + rx * Math.cos(Math.PI * 2 * i / numVerts),
				cy + ry * Math.sin(Math.PI * 2 * i / numVerts),
				cx + rx * Math.cos(Math.PI * 2 * (i + 1) / numVerts),
				cy + ry * Math.sin(Math.PI * 2 * (i + 1) / numVerts),
				color,
			)
		}
	}

	public clear() {
		this.gl.clearColor(1, 1, 1, 1)
		this.gl.clear(this.gl.COLOR_BUFFER_BIT)
	}

	public updateViewport() {
		const width = this.canvas.clientWidth
		const height = this.canvas.clientHeight

		this.canvas.width = width
		this.canvas.height = height
		this.gl.viewport(0, 0, width, height)

		const matrix = mat4.create()
		mat4.ortho(matrix, -1920, 1920, -961, 961, -1, 1)
		const scale = Math.min(this.canvas.width / 1920, this.canvas.height / 961)
		const scaleX = 1920 / this.canvas.width
		const scaleY = 961 / this.canvas.height
		mat4.scale(matrix, matrix, vec3.fromValues(scaleX * scale, scaleY * scale, 1))

		const matrixUniform = this.gl.getUniformLocation(this.program, 'u_matrix')
		this.gl.uniformMatrix4fv(matrixUniform, false, matrix)

		return [width, height]
	}

	private setPositions(positions: Array<number>) {
		const positionBuffer = this.gl.createBuffer()
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)

		const positionAttribute = this.gl.getAttribLocation(this.program, 'a_position')
		this.gl.enableVertexAttribArray(positionAttribute)
		this.gl.vertexAttribPointer(positionAttribute, 2, this.gl.FLOAT, false, 0, 0)
	}

	private setColor(color: [number, number, number, number]) {
		const colorUniform = this.gl.getUniformLocation(this.program, 'u_color')
		this.gl.uniform4fv(colorUniform, color)
	}
}

export {
	Painter,
}

export type {
	Color,
}