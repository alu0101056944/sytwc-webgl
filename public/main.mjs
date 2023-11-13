/**
 * @author Marcos Barrios
 * @since 12_11_2023
 * @desc Contains the main game loop.
 */

'use strict';

import { createProgram, createWorldData } from './create_elements.mjs';

async function main() {
  const allCanvas = document.querySelectorAll('canvas');
  if (allCanvas.length > 0) {
    throw new Error('HTML webpage does not have any canvas.');
  }

  const canvas = allCanvas[0];
  const context = canvas.getContext('webgl2');
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

  const program = await createProgram(context);
  const worldData = createWorldData(context);

  let timeSinceLastUpdate = 0;
  function loop(timestamp) {
    const STEP_TIME = timestamp - timeSinceLastUpdate;
    timeSinceLastUpdate = STEP_TIME;

    const matrixesInfo = {
        modelMatrix: worldData.getModelMatrix(),
        viewMatrix: worldData.getViewMatrix(),
        projectionMatrix: worldData.getProjectionMatrix(),
        modelViewMatrix: worldData.getModelMatrix(),
      };
    update(context, matrixesInfo, STEP_TIME);

    draw(context, program, worldData);
    window.requestAnimationFrame(loop);
  }

  loop(0);
}

/**
 * 
 * @param {object} matrixInfo with the model, view, projection, modelview
 *    mat4 matrixes.
 */
function update(context, matrixInfo, stepTime) {
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

function draw(context, program, worldData) {
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
