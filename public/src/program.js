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

class Program {
  #program = undefined;
  #vertexShader = undefined;
  #fragmentShader = undefined;

  constructor(vertexShader, fragmentShader) {
    if (!vertexShader || !fragmentShader) {
      throw new Error ('Program did not receive valid shader instances');
    }

    this.#vertexShader = vertexShader;
    this.#fragmentShader = fragmentShader;
  }

  initialize(context) {
    this.#program = context.createProgram();

    this.#vertexShader.attachTo(context, this.#program);
    this.#fragmentShader.attachTo(context, this.#program);

    context.linkProgram(this.#program);
    if (!context.getProgramParameter(this.#program, context.LINK_STATUS)) {
      throw new Error('Could not link WebGL program. ' +
          context.getProgramInfoLog(this.#program));
    }
  }

  getLocationObject(context) {
    return {
      positionAttribLocation: context.getAttribLocation(this.#program, 'aPosition'),
      colorAttribLocation: context.getAttribLocation(this.#program, 'aColor'),
      projectionUniformLocation: context.getUniformLocation(this.#program, 'projection'),
      modelViewUniformLocation: context.getUniformLocation(this.#program, 'modelview')
    }
  }
}
