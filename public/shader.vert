#version 300 es
precision highp float;
in vec3 aPosition;
in vec4 aColor;

uniform mat4 modelview;
uniform mat4 projection;

out vec4 VertexColor;

void main(){
    vec4 position = projection*modelview*vec4(aPosition,1.0f);
    
    VertexColor=aColor;
    gl_Position=position;
}

