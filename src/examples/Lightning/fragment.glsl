void mian() {
    gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), baseColor.a);
}