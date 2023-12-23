
import { ArcRotateCamera, Vector3, PointLight, Color3, ParticleSystem, Color4, Texture } from "@babylonjs/core";
import SceneComponent from './Seen'
const onSceneReady = (scene) => {
  var light0 = new PointLight("Omni", new Vector3(0, 2, 8), scene);
  var camera = new ArcRotateCamera("ArcRotateCamera", 1, Math.PI / 2, 50, new Vector3(0, 0, 0), scene);
  const canvas = scene.getEngine().getRenderingCanvas();

  camera.attachControl(canvas, true);

  scene.clearColor = new Color4(0, 0, 0, 0);

  // Create a particle system
  var particleSystem = new ParticleSystem("particles", 8000, scene);

  //Texture of each particle
  particleSystem.particleTexture = new Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/FFV/smokeParticleTexture.png", scene);

  // lifetime
  particleSystem.minLifeTime = 2;
  particleSystem.maxLifeTime = 6;

  // emit rate
  particleSystem.emitRate = 100;

  // gravity
  particleSystem.gravity = new Vector3(0.25, 1.5, 0);

  // size gradient
  particleSystem.addSizeGradient(0, 0.6, 1);
  particleSystem.addSizeGradient(0.3, 1, 2);
  particleSystem.addSizeGradient(0.5, 2, 3);
  particleSystem.addSizeGradient(1.0, 6, 8);

  // color gradient
  particleSystem.addColorGradient(0, new Color4(0.5, 0.5, 0.5, 0), new Color4(0.8, 0.8, 0.8, 0));
  particleSystem.addColorGradient(0.4, new Color4(0.1, 0.1, 0.1, 0.1), new Color4(0.4, 0.4, 0.4, 0.4));
  particleSystem.addColorGradient(0.7, new Color4(0.03, 0.03, 0.03, 0.2), new Color4(0.3, 0.3, 0.3, 0.4));
  particleSystem.addColorGradient(1.0, new Color4(0.0, 0.0, 0.0, 0), new Color4(0.03, 0.03, 0.03, 0));

  // speed gradient
  particleSystem.addVelocityGradient(0, 1, 1.5);
  particleSystem.addVelocityGradient(0.1, 0.8, 0.9);
  particleSystem.addVelocityGradient(0.7, 0.4, 0.5);
  particleSystem.addVelocityGradient(1, 0.1, 0.2);

  // rotation
  particleSystem.minInitialRotation = 0;
  particleSystem.maxInitialRotation = Math.PI;
  particleSystem.minAngularSpeed = -1;
  particleSystem.maxAngularSpeed = 1;

  // blendmode
  particleSystem.blendMode = ParticleSystem.BLENDMODE_STANDARD;

  // emitter shape
  // var sphereEmitter = particleSystem.createSphereEmitter(0.1);

  // // Where the particles come from
  // particleSystem.emitter = new Vector3(0, 0, 0); // the starting object, the emitter
  // particleSystem.minEmitBox = new Vector3(-0.5, -0.5, -0.5); // Starting all from
  // particleSystem.maxEmitBox = new Vector3(0.5, 0.5, 0.5); // To...


  var boxEmitier = particleSystem.createBoxEmitter(
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 5),
    new Vector3(-0.5, -5, -0.5),
    new Vector3(4, -2, 1) // To...       // new Vector3(0,0,2)
  )


  particleSystem.direction1 = new Vector3(0, -2, 0);
  particleSystem.direction2 = new Vector3(5, 0, 10)
  // Start the particle system
  particleSystem.start();

};


export default function () {
  return (
    <div style={{ width: '100%' }}>
      <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" />
    </div>
  )
}