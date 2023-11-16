
function draw(context, program, worldData) {
  context.clearColor(0.0, 1.0, 0.0, 1.0);
  context.clearDepth(1.0);
  context.depthFunc(context.LEQUAL);
  context.enable(context.DEPTH_TEST);
  context.enable(context.CULL_FACE);
  context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);

  context.viewport(0, 0, context.canvas.width, context.canvas.height);

  const {
      positionAttribLocation,
      colorAttribLocation,
      projectionUniformLocation,
      modelViewUniformLocation
    } = program.getLocationObject(context);

  context.bindBuffer(context.ARRAY_BUFFER, worldData.getPositionsBuffer());
  context.enableVertexAttribArray(positionAttribLocation);
  context.vertexAttribPointer(positionAttribLocation, 3, context.FLOAT, false, 0,
      0);

  context.bindBuffer(context.ARRAY_BUFFER, worldData.getColorsBuffer());
  context.enableVertexAttribArray(colorAttribLocation);
  context.vertexAttribPointer(colorAttribLocation, 4, context.FLOAT, false, 0,
      0);

  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, worldData.getIndexesBuffer());
  context.uniformMatrix4fv(projectionUniformLocation, false,
      worldData.getProjectionMatrix());
  context.uniformMatrix4fv(modelViewUniformLocation, false,
      worldData.getModelViewMatrix());

  context.drawElements(context.TRIANGLES, worldData.getIndexes().length,
      context.UNSIGNED_SHORT, 0);
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
  context.bindBuffer(context.ARRAY_BUFFER, null);
}
