# babylonjs_gui_4.1_issue
Created with CodeSandbox

# react + babylonjs

Problem 1:

Examplecode to understand how `AdvancedDynamicTexture` works.

    import { AdvancedDynamicTexture } from "@babylonjs/gui";
    let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("test", true, scene);

This works.

    import { AdvancedDynamicTexture } from "@babylonjs/gui";
    let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("test");

Doesn't work.

    import { AdvancedDynamicTexture } from "babylonjs-gui";
    let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("test");

works.


Problem 2:

After first render:

![RerenderOnResize](https://github.com/fneitzel/babylonjs_gui_4.1_issue/blob/master/img/firstRender.png)

After RerenderOnResize expected output:

![RerenderOnResize](https://github.com/fneitzel/babylonjs_gui_4.1_issue/blob/master/img/RerenderOnResize.png)


`optionswrapper` is just appearing on rerender - WHY?:


    let optionswrapper = new GUI.Rectangle("label for " + sphere.name);
    optionswrapper.height = "30px";
    optionswrapper.width = "100px";
    optionswrapper.thickness = 20;
    optionswrapper.linkOffsetY = -30;
    optionswrapper.isVisible = true;

    advancedTexture.addControl(optionswrapper);
    optionswrapper.linkWithMesh(sphere);
