#version 300 es
precision mediump float;
out vec4 fragColor;
uniform vec2 resolution;

void main(){
    vec2 pos = gl_FragCoord.xy / resolution.xy;
    fragColor = vec4(pos, 1.0, 1.0);
}