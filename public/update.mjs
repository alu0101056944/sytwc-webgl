
/**
 * @param {object} matrixInfo with the model, view, projection, modelview
 *    mat4 matrixes.
 */
export default function update(context, matrixInfo, stepTime) {
  const {
      modelMatrix,
      viewMatrix,
      projectionMatrix,
      modelViewMatrix,
    } = matrixInfo;

  const FOV = 45 * Math.Pi / 180;
  const RADIUS = context.canvas.innerWidth / context.canvas.innerHeight;
  const NEAR = 0.1;
  const FAR = undefined;
  mat4.perspective(projectionMatrix, FOV, RADIUS, NEAR, FAR);

  const VELOCITY = 50 / 1000;
  const DELTA = (stepTime * VELOCITY) * Math.pi / 180;
  const axis = vec3.fromValues(0, 1.0, 0);
  mat4.rotate(modelMatrix, modelMatrix, DELTA * Math.Pi / 180, axis);

  mat4.multiply(modelViewMatrix, modelMatrix, viewMatrix);
}
