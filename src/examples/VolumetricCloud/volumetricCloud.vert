#version 300 es

precision mediump float;
in vec3 position;

uniform mat4 worldViewProjection;

void main() {
    
    // 什么密度
    gl_Position = worldViewProjection * vec4(position, 1.0f);

}