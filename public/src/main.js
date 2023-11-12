
var lastupdate=0
function gameloop(timestamp) {
 step = timestamp - lastupdate;
 lastupdate = timestamp;
 
 update(step);

 draw();
 
 window.requestAnimationFrame(gameloop);

}

// 8. update

function update(step) {
  const vel = 50 / 1000;
  let delta = (step * vel) % 360;
      
  // Preparamos transformaciones
  const FOV = 45 * Math.PI / 180;
  const r = context.canvas.clientWidth / context.canvas.clientHeight;
  const near = 0.1;
  const far = null;
  mat4.perspective(pMat, FOV, r, near, far);
  const axis = vec3.fromValues(0.0, 1.0, 0.0);
  mat4.rotate(mMat, mMat, delta * Math.PI / 180, axis);
  mat4.multiply(mvMat,mMat,vMat);
}

// 9. Draw

function draw () {

  context.clearColor(0.0, 0.0, 1.0, 1.0);
  context.clearDepth(1.0);
  context.depthFunc(context.LEQUAL);
  context.enable(context.DEPTH_TEST);
  context.enable(context.CULL_FACE);
  context.clear(context.COLOR_BUFFER_BIT |
      context.DEPTH_BUFFER_BIT);

  context.viewport(0, 0, context.canvas.width,
      context.canvas.height);

  context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
  context.enableVertexAttribArray(positionAttribLocation);
  context.vertexAttribPointer(positionAttribLocation,
    3, context.FLOAT, false, 0, 0);

  context.bindBuffer(context.ARRAY_BUFFER, colorBuffer);
  context.enableVertexAttribArray(colorAttribLocation);
  context.vertexAttribPointer(colorAttribLocation,
    4, context.FLOAT, false, 0, 0);

  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
  context.uniformMatrix4fv(projectionUniformLocation, false, pMat);
  context.uniformMatrix4fv(modelViewUniformLocation, false, mvMat);

  context.drawElements(context.TRIANGLES,
        indices.length,
        context.UNSIGNED_SHORT, 0);
    
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
  context.bindBuffer(context.ARRAY_BUFFER, null);

}
