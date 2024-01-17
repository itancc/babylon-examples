#version 300 es

precision mediump float;

in vec2 vUV;
uniform float u_time;
uniform vec2 screenSize;
uniform sampler2D textureSampler;

out vec4 FragColor;
// 2D随机噪声函数
vec2 random2(vec2 st) {
    st = vec2(dot(st, vec2(127.1f, 311.7f)), dot(st, vec2(269.5f, 183.3f)));
    return -1.0f + 2.0f * fract(sin(st) * 43758.5453123f);
}

// 2D噪声函数
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f * f * (3.0f - 2.0f * f);

    return mix(mix(dot(random2(i + vec2(0.0f, 0.0f)), f - vec2(0.0f, 0.0f)), dot(random2(i + vec2(1.0f, 0.0f)), f - vec2(1.0f, 0.0f)), u.x), mix(dot(random2(i + vec2(0.0f, 1.0f)), f - vec2(0.0f, 1.0f)), dot(random2(i + vec2(1.0f, 1.0f)), f - vec2(1.0f, 1.0f)), u.x), u.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / screenSize.xy;
    vec4 baseColor = texture(textureSampler, vUV);
    st.x *= screenSize.x / screenSize.y;
    float n = noise(st - u_time);
    FragColor = baseColor + vec4(vec3(n), 0.0f);
}