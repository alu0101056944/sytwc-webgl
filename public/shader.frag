#version 300 es  

precision highp float;

in vec4 VertexColor;
out vec4 OutFragColor;
void main()
{
    OutFragColor=VertexColor;
}

