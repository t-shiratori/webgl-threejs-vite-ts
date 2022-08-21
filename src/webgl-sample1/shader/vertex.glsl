#version 300 es
precision mediump float;

in vec3 vPosition;

void main(void) {
    gl_Position = vec4(vPosition, 1.0);
}