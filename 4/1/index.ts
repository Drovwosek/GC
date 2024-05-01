import {createProgram} from "../../src/webgl2dPainter/createProgram";
import {mat4, vec3} from "gl-matrix";
import {degToRad} from "../../src/webgl2dPainter/utils";

document.addEventListener('DOMContentLoaded', main)

async function main(){
    const canvas = document.createElement('canvas')
    document.body.append(canvas)

    const gl = canvas.getContext('webgl2')
    /*--------------------*/
    const program = await createProgram(gl, 'vertex.glsl', 'fragment.glsl')
    /*--------------------*/
    gl.useProgram(program)



    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color')

    const matrixLocation = gl.getUniformLocation(program, 'u_matrix')

    const positionBuffer = gl.createBuffer()

    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setGeometry(gl)
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0)

    const colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setColors(gl)
    gl.enableVertexAttribArray(colorAttributeLocation)
    gl.vertexAttribPointer(colorAttributeLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0)

    const cameraPos = vec3.fromValues(0, 0, 400)
    canvas.addEventListener('mousemove', event => {
        vec3.rotateY(cameraPos, cameraPos, vec3.fromValues(0, 0, 0), degToRad(event.movementX * -0.4))
        vec3.rotateX(cameraPos, cameraPos, vec3.fromValues(0, 0, 0), degToRad(event.movementY * -0.4))
        drawScene()
    })

    drawScene()
    function drawScene() {
        gl.canvas.width = gl.canvas.clientWidth
        gl.canvas.height = gl.canvas.clientHeight
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.enable(gl.DEPTH_TEST)
        gl.enable(gl.CULL_FACE)

        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
        const projectionMatrix = mat4.perspective(mat4.create(), degToRad(90), aspect, 1, 2000)

        const viewMatrix = mat4.lookAt(
            mat4.create(),
            cameraPos,
            vec3.fromValues(0, 0, 0),
            vec3.fromValues(0, 1, 0),
        )

        const viewProjectionMatrix = mat4.multiply(mat4.create(), projectionMatrix, viewMatrix)

        gl.uniformMatrix4fv(matrixLocation, false, viewProjectionMatrix)

        gl.drawArrays(gl.TRIANGLES, 0, 60)
    }
}


function setGeometry(gl: WebGL2RenderingContext) {
    const phi = (1 + Math.sqrt(5)) / 2

    const vertexes = [
        // YZ
        [0, 1, phi],  // 0
        [0, 1, -phi], // 1
        [0, -1, phi], // 2
        [0, -1, -phi],// 3

        // XY
        [1, phi, 0],  // 4
        [1, -phi, 0], // 5
        [-1, phi, 0], // 6
        [-1, -phi, 0],// 7

        // XZ
        [phi, 0, 1],  // 8
        [-phi, 0, 1], // 9
        [phi, 0, -1], // 10
        [-phi, 0, -1],// 11
    ].map(v => v.map(x => x * 50))

    const triangles = [
        ...vertexes[0], ...vertexes[2], ...vertexes[8],
        ...vertexes[2], ...vertexes[0], ...vertexes[9],
        ...vertexes[3], ...vertexes[1], ...vertexes[10],
        ...vertexes[1], ...vertexes[3], ...vertexes[11],

        ...vertexes[8],  ...vertexes[10], ...vertexes[4],
        ...vertexes[10], ...vertexes[8],  ...vertexes[5],
        ...vertexes[11],  ...vertexes[9], ...vertexes[6],
        ...vertexes[9], ...vertexes[11],  ...vertexes[7],

        ...vertexes[4], ...vertexes[6], ...vertexes[0],
        ...vertexes[6], ...vertexes[4], ...vertexes[1],
        ...vertexes[7], ...vertexes[5], ...vertexes[2],
        ...vertexes[5], ...vertexes[7], ...vertexes[3],

        ...vertexes[9], ...vertexes[0], ...vertexes[6],
        ...vertexes[11], ...vertexes[6], ...vertexes[1],
        ...vertexes[4], ...vertexes[10], ...vertexes[1],
        ...vertexes[0], ...vertexes[8], ...vertexes[4],

        ...vertexes[7], ...vertexes[2], ...vertexes[9],
        ...vertexes[2], ...vertexes[5], ...vertexes[8],
        ...vertexes[3], ...vertexes[7], ...vertexes[11],
        ...vertexes[5], ...vertexes[3], ...vertexes[10],
    ]

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangles), gl.STATIC_DRAW)
}

function setColors(gl: WebGL2RenderingContext) {
    const getRandomColor = () => Array.from({length: 3}, () => Math.floor(Math.random() * 200 + 20))
    let colors = []
    for (let i = 0; i <= 20; ++i) {
        const color = getRandomColor()
        colors.push(...color)
        colors.push(...color)
        colors.push(...color)
    }

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array(colors),
        gl.STATIC_DRAW,
    )
}