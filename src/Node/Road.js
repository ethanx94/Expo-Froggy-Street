import React, {Component} from 'react';
import Generic from './Generic';

/*
road_0: Multi Lane Road.
road_1: Single Lane Road.
*/
export default class Road extends Generic {
  setup = async () => {
    const {environment: {road} } = this.globalModels;

    for (let i = 0; i < 2; i++) {
      this.models[`${i}`] = await this._download(road[`${i}`]);
    }
    return this.models;
  }
}
