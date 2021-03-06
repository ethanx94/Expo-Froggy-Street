import React, {Component} from 'react';
import Generic from './Generic';
import Characters from '../../Characters';

export default class Hero extends Generic {
  setup = async () => {
    const {characters} = this.globalModels;

    for (let id of Object.keys(Characters)) {
      if (Characters.hasOwnProperty(id)) {
        let character = Characters[id];
        const {model, texture} = characters[character.id];
        this.models[character.id] = await this._download({model, texture, randomTexture: false});
      }
    }
    return this.models;
  }
}
