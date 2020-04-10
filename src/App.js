import * as React from "react";
import * as BABYLON from "babylonjs";
//import * as GUI from "@babylonjs/gui";
import * as GUI from "babylonjs-gui";

//as GUI from 'babylonjs-gui';
import BabylonScene from "./components/babylon_test_example"; // TODO: rename later upon correct implementiation

// eslint-disable-next-line
class PageWithScene extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {
      windowDimension: {
        width: 300,
        height: 300
      },
      nodeCount: 0,
      grid: []
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.onSceneMount = this.onSceneMount.bind(this);
  }

  updateDimensions = () => {
    this.setState({
      windowDimension: { width: window.innerWidth, height: window.innerHeight }
    });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  onSceneMount = (e: SceneEventArgs) => {
    const { height, width } = this.state.windowDimension;
    const { canvas, scene, engine } = e;

    let camera = new BABYLON.ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      1.0,
      110,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.setPosition(new BABYLON.Vector3(0, 0, -250));
    camera.attachControl(canvas, true);

    let hemi = new BABYLON.HemisphericLight("toto");

    console.log("engine starting");

    let sphere = new BABYLON.Mesh.CreateSphere("Sphere", 10.0, 9.0, scene);
    sphere.name = "THIS IS AN EXAMPLE SPHERE";

    // TODO: Following line doesn't work with: import * as GUI from "@babylonjs/gui";
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    //let advancedTexture = AdvancedDynamicTexture("test",width,height,scene);
    //let advancedTexture2 = advancedTexture.CreateFullscreenUI("test");
    let optionswrapper = new GUI.Rectangle("label for " + sphere.name);
    optionswrapper.height = "30px";
    optionswrapper.width = "100px";
    optionswrapper.thickness = 20;
    optionswrapper.linkOffsetY = -30;
    optionswrapper.isVisible = true;

    advancedTexture.addControl(optionswrapper);
    // TODO: optionwrapper is not displayed on initial render (rerender/resizing of browser shows the rectangle)
    optionswrapper.linkWithMesh(sphere);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  render() {
    const { height, width } = this.state.windowDimension;

    return (
      <BabylonScene
        onSceneMount={this.onSceneMount}
        height={height}
        width={width}
      />
    );
  }
}

function App() {
  return (
    <div className="App">
      <PageWithScene />
    </div>
  );
}

export default App;
