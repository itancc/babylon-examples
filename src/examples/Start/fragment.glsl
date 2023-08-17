precision highp float;
uniform float time;
uniform sampler2D textureSampler;
varying vec2 vUv;
vec3 colorA = vec3(0.912, 0.191, 0.652);
vec3 colorB = vec3(1.000, 0.777, 0.052);
void main() {
  vec3 color = mix(colorA, colorB, vUv.x);
  vec4 colorUv = texture2D(textureSampler, vUv);
  gl_FragColor = vec4(colorUv.x, colorUv.y, colorUv.z, 1.0);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}