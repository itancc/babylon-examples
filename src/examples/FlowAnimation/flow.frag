#version 300 es
precision mediump float;

uniform vec3 u_color; // 虚线的颜色
uniform float u_time; // 时间
in vec2 vUv;
out vec4 FragColor;

void main() {
    vec2 st = vUv;
    //fract函数返回了st.y + u_time的小数部分，step函数则检查这个值是否大于0.1，如果是，返回1，否则返回0。这样，line的值就在0和1之间变化，形成了一种类似于虚线的效果
    // 0.5f是阈值，可以调整虚线的密度, 5.0f是频率，可以调整虚线的宽度, 1.4f是速度，可以调整虚线的移动速度
    float line = step(0.5f, fract(5.0f * st.y + 1.4f * u_time));
    //mix函数根据line的值在两个颜色之间进行插值。如果line的值为1，那么颜色就是u_color，否则颜色就是vec4(0.16f, 0.28f, 0.39f, 0.05f)。
    vec4 color = mix(vec4(0.16f, 0.28f, 0.39f, 0.4f), vec4(u_color, 1.0f), line);
    FragColor = color;
}