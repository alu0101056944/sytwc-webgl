/**
 * @author Marcos Barrios
 * @since 08_11_2023
 * @desc Represents a shader
 * @module Shader
 */

'use strict';

export default class Shader {
  #shaderObject = undefined;

  /**
   * @param {object} context with the webgl methods for shader creation
   * @param {string} textOfShaderScript 
   * @param {string} shaderType either 'x-shader/x-fragment' or 'x-shader/x-vert'
   */
  constructor({ compileShader, createShader, shaderSource, },
      textOfShaderScript, shaderType) {
    if (shaderType !== 'x-shader/x-fragment' ||
        shaderType !== 'x-shader/x-vert') {
      throw new Error('Invalid shader type passed as parameter.');
    }
    if (!textOfShaderScript) {
      throw new Error('Invalid shader text of script');
    }

    this.#shaderObject = createShader(shaderType);
    const TRIMMED_SHADER_TEXT = textOfShaderScript.trim();
    shaderSource(this.#shaderObject, TRIMMED_SHADER_TEXT);
    compileShader(this.#shaderObject);
  }
}
