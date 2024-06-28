#version 300 es

precision highp float;

in vec3 position;
in vec2 uv;

uniform mat4 worldViewProjection;

out vec2 vUv;
void main() {
    vec4 p = vec4(position, 1.f);
    vUv = uv;
    gl_Position = worldViewProjection * p;
}