type WebGLProps = { elementId: string; vertexSource: string; fragmentSource: string }

export class WebGL {
  canvas: HTMLCanvasElement | null = null
  gl2: WebGL2RenderingContext | null = null
  program: WebGLProgram | null = null

  constructor({ elementId, vertexSource, fragmentSource }: WebGLProps) {
    const canvas = document.getElementById(elementId) as HTMLCanvasElement
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const gl2 = canvas.getContext('webgl2')

    if (!gl2) return

    const vertexShader = WebGL.getShader(gl2, gl2.VERTEX_SHADER, vertexSource)
    const fragmentShader = WebGL.getShader(gl2, gl2.FRAGMENT_SHADER, fragmentSource)

    if (!vertexShader || !fragmentShader) return

    const program = gl2.createProgram()

    if (!program) return

    gl2.attachShader(program, vertexShader)
    gl2.attachShader(program, fragmentShader)
    gl2.linkProgram(program)

    if (!gl2.getProgramParameter(program, gl2.LINK_STATUS)) console.error('Could not initialize shaders')

    gl2.useProgram(program)

    this.gl2 = gl2
    this.canvas = canvas
    this.program = program
  }

  static getShader = (gl2: WebGL2RenderingContext, shaderType: number, shaderSource: string) => {
    if (!gl2) return

    const shader = gl2.createShader(shaderType)

    if (!shader) return

    gl2.shaderSource(shader, shaderSource)
    gl2.compileShader(shader)

    if (!gl2.getShaderParameter(shader, gl2.COMPILE_STATUS)) return console.error(gl2.getShaderInfoLog(shader))

    return shader
  }
}
