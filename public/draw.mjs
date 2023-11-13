
export default function draw(context, program, worldData) {
  const {
      clearColor,
      clearDepth,
      depthFunc,
      enable,
      clear,
      viewport,
      bindBuffer,
      enableVertexAttribArray,
      vertexAttribPointer,
      uniformMatrix4fv,
      drawElements,
    } = context;

  clearColor(0.0, 0.0, 1.0, 1.0);
  clearDepth(1.0);
  depthFunc(LEQUAL);
  enable(DEPTH_TEST);
  enable(CULL_FACE);
  clear(COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT);

  viewport(0, 0, context.canvas.width, context.canvas.height);

  const {
      positionAttribLocation,
      colorAttribLocation,
      projectionUniformLocation,
      modelViewUniformLocation
    } = program.getLocationObject();

  const {
      getPositionsBuffer,
      getColorsBuffer,
      getIndexesBuffer,
      getProjectionMatrix,
      getModelViewMatrix,
      getIndexes
    } = worldData;

  bindBuffer(context.ARRAY_BUFFER, getPositionsBuffer());
  enableVertexAttribArray(positionAttribLocation);
  vertexAttribPointer(positionAttribLocation, 3, context.FLOAT, false, 0, 0);

  bindBuffer(context.ARRAY_BUFFER, getColorsBuffer());
  enableVertexAttribArray(colorAttribLocation);
  vertexAttribPointer(colorAttribLocation, 4, context.FLOAT, false, 0, 0);

  bindBuffer(context.ELEMENT_ARRAY_BUFFER, getIndexesBuffer());
  uniformMatrix4fv(projectionUniformLocation, false, getProjectionMatrix());
  uniformMatrix4fv(modelViewUniformLocation, false, getModelViewMatrix());

  drawElements(context.TRIANGLES, getIndexes().length, context.UNSIGNED_SHORT, 0);
  bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
  bindBuffer(context.ARRAY_BUFFER, null);
}
