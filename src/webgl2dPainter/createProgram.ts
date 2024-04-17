async function createProgram(gl: WebGL2RenderingContext, vertexShaderSourceUrl: string, fragmentShaderSourceUrl: string): Promise<WebGLProgram> {
	const vsSource = await (await fetch(vertexShaderSourceUrl)).text()
	const fsSource = await (await fetch(fragmentShaderSourceUrl)).text()
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource)
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource)

	const program = gl.createProgram()
	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)
	const success = gl.getProgramParameter(program, gl.LINK_STATUS)
	if (success) {
		return program
	}

	console.log(gl.getProgramInfoLog(program))
	gl.deleteProgram(program)
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
	const shader = gl.createShader(type)
	gl.shaderSource(shader, source)
	gl.compileShader(shader)
	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
	if (success) {
		return shader
	}

	console.log(gl.getShaderInfoLog(shader))
	gl.deleteShader(shader)
}

export {
	createProgram,
}