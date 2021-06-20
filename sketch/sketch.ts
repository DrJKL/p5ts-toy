import { PolygonHelper } from "./PolygonHelper";
import { ColorHelper } from "./ColorHelper";
import p5 from "p5";

// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;
let focus: p5.Vector;
let fixed = false;

const sketch = (p: p5) => {
  p.setup = () => {
    console.log("🚀 - Setup initialized - P5 is running");

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER).noFill().frameRate(30);
    // NUMBER OF SHAPES SLIDER
    numberOfShapesControl = p
      .createSlider(1, 30, 15, 1)
      .position(10, 10)
      .style("width", "100px");
    focus = p.createVector();
  };
  p.draw = () => {
    // CLEAR BACKGROUND
    p.background(0, 10);

    // CENTER OF SCREEN
    p.translate(focus.x, focus.y);

    const numberOfShapes = <number>numberOfShapesControl.value();
    const colours = ColorHelper.getColorsArray(numberOfShapes, null, p);

    // CONSISTENT SPEED REGARDLESS OF FRAMERATE
    const speed = (p.frameCount / (numberOfShapes * 30)) * 2;

    // DRAW ALL SHAPES
    for (var i = 0; i < numberOfShapes; i++) {
      p.push();
      const lineWidth = 8;
      const spin = speed * (numberOfShapes - i);
      const numberOfSides = 3 + i;
      const pWidth = 40 * i;
      p.strokeWeight(lineWidth);
      p.stroke(colours[i]);
      p.rotate(spin);
      PolygonHelper.draw(numberOfSides, pWidth, p);
      p.pop();
    }
  };
  p.mouseClicked = () => {
    fixed = !fixed;
  };
  p.mouseMoved = () => {
    if (!fixed) {
      focus = p.createVector(p.mouseX, p.mouseY);
    }
  };
  p.mouseWheel = (event: WheelEvent) => {
    console.log(event);
    numberOfShapesControl.value(+numberOfShapesControl.value() + event.deltaY/100);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

export const thing = new p5(sketch);

console.log("in sketch.ts");
