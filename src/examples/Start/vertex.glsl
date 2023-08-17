precision highp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 world;
uniform mat4 projection;
uniform mat4 view;
uniform mat4 worldViewProjection;
uniform float time;

varying vec2 vUv;

void main() {
    vec3 v = position;
    v.y = v.y += sin(v.x * 4.0 + time * 3.0) * 0.2;
    gl_Position = worldViewProjection * vec4(v, 1.0);

    vUv = uv;
}