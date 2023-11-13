/**
 * @author Marcos Barrios
 * @since 10_11_2023
 * @desc Position, Color, Index information to be inserted to the webgl2
 *    context.
 * @module WorldData
 */

'use strict';

class WorldData {
  #context = undefined;

  #vertexBuffer = undefined;
  #colorsBuffer = undefined;
  #indexBuffer = undefined;

  #positions = undefined;
  #colors = undefined;
  #indexes = undefined;

  #projectionMatrix = undefined;
  #viewMatrix = undefined;
  #modelMatrix = undefined;
  #modelViewMatrix= undefined;

  constructor(context) {
    this.#context = context;

    this.#vertexBuffer = this.#context.createBuffer();
    this.#colorsBuffer = this.#context.createBuffer();
    this.#indexBuffer = this.#context.createBuffer();

    this.#positions = [];
    this.#colors = [];
    this.#indexes = [];

    this.#projectionMatrix = mat4.create();
    this.#viewMatrix = mat4.create();
    this.#modelMatrix = mat4.create();
    this.#modelViewMatrix= mat4.create();

    this.#initialize();
  }

  #initialize() {
    mat4.translate(this.#modelMatrix, this.#modelMatrix, [0.0, 0.0, -5.0]);

    const eye = vec3.create();
    eye.set(0.0,0.0,0.0);

    const position = vec3.create();
    position.set(0.0,0.0,-10.0);

    const up = vec3.create();
    up.set(0.0,1.0,0.0);

    mat4.lookAt(this.#viewMatrix, eye, position, up);
    mat4.multiply(this.#modelViewMatrix, this.#modelMatrix,vMat);
  }

  /**
   * @param {object} newPositions array of arrays of three numbers.
   */
  addPositions(newPositions) {
    this.#bufferTransfer(this.#vertexBuffer, this.#context.ARRAY_BUFFER,
      newPositions, this.#context.STATIC_DRAW, new Float32Array(newPositions));
    this.#positions.concat(newPositions);
  }

  getPositions() {
    return this.#positions;
  }

  getPositionsBuffer() {
    return this.#vertexBuffer;
  }

  /**
   * @param {object} newColors array of arrays of four numbers.
   */
  addColors(newColors) {
    this.#bufferTransfer(this.#colorsBuffer, this.#context.ARRAY_BUFFER,
        newColors, this.#context.STATIC_DRAW, new Float32Array(newColors));
    this.#colors.concat(newPositions);
  }

  getColors() {
    return this.#colors;
  }

  getColorsBuffer() {
    return this.#colorsBuffer;
  }

  /**
   * @param {object} newIndexes array of arrays of three numbers.
   */
  addIndexes(newIndexes) {
    this.#bufferTransfer(this.#indexBuffer, this.#context.ELEMENT_ARRAY_BUFFER,
        newIndexes, this.#context.STATIC_DRAW, new Uint32Array(newIndexes));
    this.#indexes.concat(newIndexes);
  }

  getIndexes() {
    return this.#indexes;
  }

  getIndexesBuffer() {
    return this.#indexBuffer;
  }

  #bufferTransfer(buffer, bufferType, data, dataType, array) {
    if (bufferType !== this.#context.ARRAY_BUFFER ||
        bufferType !== this.#context.ELEMENT_ARRAY_BUFFER) {
      throw new Error('Invalid data type at world data buffer transfer.');
    }
    if (data.length === 0) {
      throw new Error('Empty data received at world data buffer transfer.');
    }
    if (dataType !== this.#context.STATIC_DRAW) {
      throw new Error('Non STATIC_DRAW data type at world data buffer transfer.');
    }
    if (!(array instanceof TypedArray)) {
      throw new Error('Not a valid array type at world data buffer transfer.');
    }

    this.#context.bindBuffer(bufferType, buffer);
    this.#context.bufferData(bufferType, array, dataType);
    this.#context.bindBuffer(bufferType, null);
  }

  getModelMatrix() {
    return this.#modelMatrix;
  }

  getProjectionMatrix() {
    return this.#projectionMatrix;
  }

  getViewMatrix() {
    return this.#viewMatrix;
  }

  getModelViewMatrix() {
    return this.#modelViewMatrix;
  }
}
