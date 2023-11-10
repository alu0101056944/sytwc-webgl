/**
 * @author Marcos Barrios
 * @since 10_11_2023
 * @desc Position, Color, Index information to be inserted to the webgl2
 *    context.
 * @module WorldData
 */

'use strict';

export default class WorldData {
  #context = undefined;

  #vertexBuffer = undefined;
  #colorsBuffer = undefined;
  #indexBuffer = undefined;

  #positions = undefined;
  #colors = undefined;
  #indexes = undefined;

  constructor(context) {
    this.#context = context;
    this.#vertexBuffer = this.#context.createBuffer();
    this.#colorsBuffer = this.#context.createBuffer();
    this.#indexBuffer = this.#context.createBuffer();
    this.#positions = [];
    this.#colors = [];
    this.#indexes = [];
  }

  /**
   * @param {object} newPositions array of arrays of three numbers.
   */
  addPositions(newPositions) {
    this.#bufferTransfer(this.#vertexBuffer, this.#context.ARRAY_BUFFER,
      newPositions, this.#context.STATIC_DRAW, new Float32Array(newPositions));
    this.#positions.concat(newPositions);
  }

  /**
   * @param {object} newColors array of arrays of four numbers.
   */
  addColors(newColors) {
    this.#bufferTransfer(this.#colorsBuffer, this.#context.ARRAY_BUFFER,
        newColors, this.#context.STATIC_DRAW, new Float32Array(newColors));
    this.#colors.concat(newPositions);
  }

  /**
   * @param {object} newIndexes array of arrays of three numbers.
   */
  addIndexes(newIndexes) {
    this.#bufferTransfer(this.#indexBuffer, this.#context.ELEMENT_ARRAY_BUFFER,
        newIndexes, this.#context.STATIC_DRAW, new Uint32Array(newIndexes));
    this.#indexes.concat(newIndexes);
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
}
