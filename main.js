"use strict";
class SierpinskiTriangle {
  mainCanvas = document.getElementById("sierpinski-triangle");
  mainCanvas2DContext = document
    .getElementById("sierpinski-triangle")
    .getContext("2d");
  rootTriangle = new Path2D();
  rootTrianglePoints = [];
  get canvasHeight() {
    return this.mainCanvas2DContext.canvas.height;
  }

  get canvasWidth() {
    return this.mainCanvas2DContext.canvas.width;
  }

  constructor() {
    this.initializeRootTriangle();
    this.mainCanvas2DContext.fillStyle = "#fff";
    this.initializeFirstThreeDots();
    this.mainCanvas.addEventListener("click", (event) => {
      this.addPoint(event);
    });
  }

  initializeRootTriangle() {
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
    THREE_EVEN_RADIAN_ANGLES.forEach((radianAngle, index) => {
      const x =
        radiusOfMaximumCircleInCanvas * Math.cos(radianAngle) +
        centerPointOfCanvas;
      const y =
        radiusOfMaximumCircleInCanvas * Math.sin(radianAngle) +
        middlePointOfCanvas;
      this.rootTrianglePoints.push({ x, y });
      if (index > 0) {
        // if not the first iteration
        this.rootTriangle.lineTo(x, y);
      } else {
        this.rootTriangle.moveTo(x, y);
      }
    });
    // draw line back to first point
    this.rootTriangle.closePath();
    this.mainCanvas2DContext.fill(this.rootTriangle);
  }

  initializeFirstThreeDots() {
    this.rootTrianglePoints.forEach((trianglePoint) => {
      const { x, y } = trianglePoint;
      this.drawPoint(x, y);
    });
  }

  addPoint(event) {
    if (this.checkIsInRootTriangle(event.offsetX, event.offsetY)) {
      this.drawPoint(event.offsetX, event.offsetY);
    }
  }

  checkIsInRootTriangle(x, y) {
    return this.mainCanvas2DContext.isPointInPath(this.rootTriangle, x, y);
  }

  drawPoint(x, y) {
    this.mainCanvas2DContext.fillRect(x, y, 1, 1);
  }
}

new SierpinskiTriangle();
