#version 300 es
precision mediump float;

in vec3 position; // BoxGeometry position

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float radius;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main() {

    float delta = (sin(time * 2.0) + 1.0)/ 2.0;
    vec3 spherePosition = normalize(position) * radius;
    vec3 mixedPosition = mix(position, spherePosition, delta);
    vec4 modelViewPosition = modelViewMatrix * vec4(mixedPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}