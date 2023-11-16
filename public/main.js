/**
 * @author Marcos Barrios
 * @since 12_11_2023
 * @desc Contains the main game loop.
 */

'use strict';

async function main() {
  const canvas = document.getElementById('webgl-canvas');
  const context = canvas.getContext('webgl2');
  context.canvas.width = 800;
  context.canvas.height = 600;

  const program = await createProgram(context);
  program.initialize(context);

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

main();
