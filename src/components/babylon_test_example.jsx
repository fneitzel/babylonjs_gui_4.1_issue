import * as BABYLON from 'babylonjs';
import * as React from "react";
import * as GUI from "@babylonjs/gui";

export type SceneEventArgs = {
  engine: BABYLON.Engine,
  scene: BABYLON.Scene,
  canvas: HTMLCanvasElement
};

export type SceneProps = {
  engineOptions?: BABYLON.EngineOptions,
  adaptToDeviceRatio?: boolean,
  onSceneMount?: (args: SceneEventArgs) => void,
  width?: number,
  height?: number
};

export default class Scene extends React.PureComponent<SceneProps & React.HTMLAttributes<HTMLCanvasElement>, {}> {
  //PureComponent implemts should rerender

  // all this vars have been private before
  // What is that part for anyway? typedef?
  // creepy Gotos: https://stackoverflow.com/questions/4906762/is-using-labels-in-javascript-bad-practice
  // and shorthand for: var Scene.scene = new Babylon.Scene; since class is just an 'object'
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  canvas: HTMLCanvasElement;

  onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize();
    }
  }

  componentDidMount () {
    let engineOptions;
    if (!this.props.engineOptions) {
      engineOptions = { preserveDrawingBuffer: true, stencil: true }
    }else{
      engineOptions = this.props.engineOptions;}

    this.engine = new BABYLON.Engine(
        this.canvas,
        true,
        engineOptions,
        this.props.adaptToDeviceRatio
    );

    let scene = new BABYLON.Scene(this.engine);
    this.scene = scene;

    if (typeof this.props.onSceneMount === 'function') {
      this.props.onSceneMount({
        scene: this.scene,
        engine: this.engine,
        canvas: this.canvas
      });
    } else {
      console.error('onSceneMount function not available');
    }

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onCanvasLoaded = (c : HTMLCanvasElement) => {
    if (c !== null) {
      this.canvas = c;
    }
  }

  render () {
    // 'rest' can contain additional properties that you can flow through to canvas:
    // (id, className, etc.)
    // eslint-disable-next-line
    let { width, height, ...rest } = this.props;
    console.log("REST:",rest);

    let opts: any = {};

    if (width !== undefined && height !== undefined) {
      opts.width = width;
      opts.height = height;
    }

    return (
      <canvas
        {...opts}
        ref={this.onCanvasLoaded}
      />
    )
  }
}