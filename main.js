"use strict";
class SierpinskiTriangle {
  mainCanvas = document.getElementById("sierpinski-triangle").getContext("2d");
  rootTriangle = new Path2D();

  get canvasHeight() {
    console.log(this.mainCanvas);
    return this.mainCanvas.canvas.height;
  }

  get canvasWidth() {
    return this.mainCanvas.canvas.width;
  }

  constructor() {
    this.initializeFirstThreeDots();
  }

  initializeFirstThreeDots() {
    // Create an equilateral triangle in the middle of canvas
    // https://stackoverflow.com/a/8937325
    const centerPointOfCanvas = this.canvasWidth / 2;
    const middlePointOfCanvas = this.canvasHeight / 2;
    const THREE_EVEN_RADIAN_ANGLES = [
      Math.PI / 6,
      (3 * Math.PI) / 2,
      (5 * Math.PI) / 6,
    ];
    const radiusOfMaximumCircleInCanvas =
      this.canvasWidth < this.canvasHeight
        ? centerPointOfCanvas
        : middlePointOfCanvas;
    this.mainCanvas.globalCompositeOperation='destination-over';
    THREE_EVEN_RADIAN_ANGLES.forEach((radianAngle, index) => {
      const x =
        radiusOfMaximumCircleInCanvas * Math.cos(radianAngle) +
        centerPointOfCanvas;
      const y =
        radiusOfMaximumCircleInCanvas * Math.sin(radianAngle) +
        middlePointOfCanvas;
      this.mainCanvas.fillStyle = "#fff";
      this.drawPoint(x, y);
      if (index > 0) {
        // if not the first iteration
        this.rootTriangle.lineTo(x, y);
      } else {
        this.rootTriangle.moveTo(x, y);
      }
    });
    // draw line back to first point
    this.rootTriangle.closePath();
    this.mainCanvas.fillStyle = "#000";
    this.mainCanvas.fill(this.rootTriangle);
  }

  drawPoint(x, y) {
    this.mainCanvas.fillRect(x, y, 1, 1);
  }
}

new SierpinskiTriangle();
