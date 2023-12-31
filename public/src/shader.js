/**
 * @author Marcos Barrios
 * @since 08_11_2023
 * @desc Represents a shader
 * @module Shader
 */

'use strict';

class Shader {
  #shaderObject = undefined;
  #shaderType = undefined;

  /**
   * @param {string} shaderType either 'x-shader/x-fragment' or 'x-shader/x-vert'
   */
  constructor(shaderType) {
    if (shaderType !== 'x-shader/x-fragment' &&
        shaderType !== 'x-shader/x-vertex') {
      throw new Error('Invalid shader type passed as parameter.');
    }
    this.#shaderType = shaderType;
  }

  /**
   * @param {object} context with the webgl methods for shader creation
   * @param {string} shaderPath
   */
  async create(context, shaderPath) {
    if (!shaderPath || !/([^\/]+\/?)+?/.test(shaderPath)) {
      throw new Error('Invalid shader path. Did not pass regular' +
          'expression check.');
    }
    if (!context) {
      throw new Error('Cannot create shader; context is undefined');
    }

    try {
      const response =
          await window.fetch(`http://127.0.0.1:8080/${shaderPath}`);

      const SHADER_TEXT = await response.text();
      if (!SHADER_TEXT) {
        throw new Error('Invalid shader text of script');
      }

      this.#compileShader(context, SHADER_TEXT);
    } catch (error) {
      console.log('An error occurred while creating the shader: ' + error);
    }
  }

  #compileShader(context, textOfShaderScript) {
    if (this.#shaderType === 'x-shader/x-fragment') {
      this.#shaderObject = context.createShader(context.FRAGMENT_SHADER);
    } else if (this.#shaderType === 'x-shader/x-vertex') {
      this.#shaderObject = context.createShader(context.VERTEX_SHADER);
    } else {
      throw new Error('Invalid shader type compilation attempt at shader.js');
    }

    const TRIMMED_SHADER_TEXT = textOfShaderScript.trim();
    context.shaderSource(this.#shaderObject, TRIMMED_SHADER_TEXT);
    context.compileShader(this.#shaderObject);

    if (!context.getShaderParameter(this.#shaderObject, context.COMPILE_STATUS)) {
      throw new Error('Could not compile shader. ' +
          context.getShaderInfoLog(this.#shaderObject));
    }

    if (!this.#shaderObject) {
      throw new Error('Could not create the shader.');
    }
  }

  /**
   * WebGL2 has a WebGLProgram object that has a vertex shader and a fragment
   *    shader. This attaches the shader to a WebGLProgram.
   * @param {object} program 
   */
  attachTo(context, program) {
    context.attachShader(program, this.#shaderObject);
  }

}
