#version 300 es
precision mediump float;

in vec3 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}