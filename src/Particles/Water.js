import Expo from 'expo'

import React, {Component} from 'react';
import {TouchableWithoutFeedback,Vibration, Animated, Dimensions,Text,View} from 'react-native'

import {TweenMax,TimelineMax, Power2,Bounce, TimelineLite} from "gsap";

let THREE;
export default class Water  {

  constructor(_THREE) {
    THREE = _THREE;
    this.waterMat =  new THREE.MeshPhongMaterial({
      color: 0x71d7ff,
      shading: THREE.FlatShading,
    });
    this.mesh = new THREE.Group();
    const size = 0.2;
    var bigParticleGeom = new THREE.CubeGeometry(size, size + 0.1, size, 1);
    // var smallParticleGeom = new THREE.CubeGeometry(0.1, 0.1, 0.1, 1);
    this.parts = [];
    for (var i = 0; i < 15; i++) {
      var partPink = new THREE.Mesh(bigParticleGeom, this.waterMat);
      // var partGreen = new THREE.Mesh(smallParticleGeom, this.waterMat);
      this.parts.push(partPink);
      this.mesh.add(partPink);
    }
  }

  run = () => {
    var explosionSpeed = 0.3;

    const removeParticle = (p) => {
      p.visible = false;
    }

    for (var i = 0; i < this.parts.length; i++) {

      var tx = -1.0 + Math.random() * 1.0;
      var ty = (Math.random() * 2.0) + 1;
      var tz = -1.0 + Math.random() * 1.0;
      var p = this.parts[i];

      const bezier = {
        type: 'cubic',
        values: [
          { x: 0, y: 0, z: 0 },


          { x: tx, y: ty, z: tz },
          { x: tx * 0.8, y: ty * 0.8, z: tz * 0.8 },

          { x: tx * ((Math.random() * .5) + 1.1), y: 0, z: tz * ((Math.random() * .5) + 1.1) }
        ],
        curviness: 0
      }

      p.position.set(0, 0, 0);
      p.scale.set(1, 1, 1);
      p.visible = true;
      var s = explosionSpeed + Math.random() * .5;

      TweenMax.to(p.position, s * 4, {
          bezier,
          ease: Bounce.easeOut,
        });

        const scaleTo = 0.01;
        TweenMax.to(p.scale, s, {
          x: scaleTo,
          y: scaleTo,
          z: scaleTo,
          onComplete: removeParticle,
          onCompleteParams: [p],
          delay: s * 3

        });
    }
  }

}
