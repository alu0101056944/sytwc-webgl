
function createWorldData(context) {
  const worldData = new WorldData(context);
  worldData.addPositions([
      -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0,
      -1.0,-1.0,-1.0,
      -1.0, 1.0,-1.0,
      1.0,-1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0,-1.0,-1.0,
      1.0, 1.0,-1.0
    ]);
  worldData.addColors([
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0
    ]);
  worldData.addIndexes([
      1, 2, 0,
      3, 6, 2,
      7, 4, 6,
      5, 0, 4,
      6, 0, 2,
      3, 5, 7,
      1, 3, 2,
      3, 7, 6,
      7, 5, 4,
      5, 1, 0,
      6, 4, 0,
      3, 1, 5
    ]);
  return worldData;
}

async function createProgram(context) {
  const shaderVertex = new Shader('x-shader/x-vertex');
  await shaderVertex.create(context, 'shaders/shader.vert');

  const shaderFragment = new Shader('x-shader/x-fragment');
  await shaderFragment.create(context, 'shaders/shader.frag');

  return new Program(shaderVertex, shaderFragment);
}
