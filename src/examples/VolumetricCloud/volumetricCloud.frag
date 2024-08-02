#version 300 es

precision mediump float;

uniform vec3 cameraDirection;
uniform vec3 cameraPosition;

out vec4 fragColor;

void main() {
    fragColor = vec4(cameraDirection + cameraPosition, 1.0f);
}