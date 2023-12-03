
/**
 * @param {object} matrixInfo with the model, view, projection, modelview
 *    mat4 matrixes.
 */
function update(context, matrixInfo, stepTime) {

  const FOV = 45 * Math.PI / 180;
  const ASPECT_RATIO = context.canvas.clientWidth / context.canvas.clientHeight;
  const NEAR = 0.1;
  const FAR = null;
  glMatrix.mat4.perspective(matrixInfo.projectionMatrix, FOV, ASPECT_RATIO, NEAR, FAR);

  const VELOCITY = 50 / 1000;
  const DELTA = (stepTime * VELOCITY) % 360;
  const axis = glMatrix.vec3.fromValues(0.0, 1.0, 0.0);
  glMatrix.mat4.rotate(matrixInfo.modelMatrix, matrixInfo.modelMatrix,
      DELTA * Math.PI / 180, axis);

  // console.log('model: ' + matrixInfo.modelMatrix);
  glMatrix.mat4.multiply(matrixInfo.modelViewMatrix, matrixInfo.modelMatrix,
      matrixInfo.viewMatrix);
  // console.log('modelView: ' + matrixInfo.modelViewMatrix);
  // console.log('view: ' + matrixInfo.viewMatrix);
}
