/**
 * @author Marcos Barrios
 * @since 09_11_2023
 * @desc Represents a program, which is combination of a vertex shader and a
 *    fragment shader into a usable program.
 * 
 * It also uses an HTML canvas.
 *
 * @module Program
 */

'use strict';

export default class Program {
  #program = undefined;
  #vertexShader = undefined;
  #fragmentShader = undefined;

  #canvas = undefined;
  #canvasContext = undefined;

  constructor(vertexShader, fragmentShader) {
    if (!vertexShader || !fragmentShader) {
      throw new Error ('Program did not receive valid shader instances');
    }

    this.#vertexShader = vertexShader;
    this.#fragmentShader = fragmentShader;
  }

  initialize() {
    this.#program = context.createProgram();

    this.#vertexShader.attachTo(this.#program);
    this.#fragmentShader.attachTo(this.#program);

    context.linkProgram(this.#program);
    if (!context.getProgramParameter(context.LINK_STATUS)) {
      throw new Error('Could not link WebGL program. ' +
          context.getProgramInfoLog(this.#program));
    }

    const allCanvas = document.querySelectorAll('canvas');
    if (allCanvas.length === 0) {
      throw new Error('Program cannot get canvas; there is no canvas in' +
          'index.html');
    }

    this.#canvas = allCanvas.shift();
    this.#canvasContext = this.#canvas.getContext('webgl2');
    this.#canvasContext.canvas.width = window.innerWidth;
    this.#canvasContext.canvas.height = window.innerHeight;
  }

  getContext() {
    return this.#canvasContext;
  }
}
