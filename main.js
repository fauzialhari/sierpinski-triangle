"use strict";
class SierpinskiTriangle {
  mainCanvas = document.getElementById("sierpinski-triangle");
  mainCanvas2DContext = document
    .getElementById("sierpinski-triangle")
    .getContext("2d");
  rootTriangle = new Path2D();
  rootTrianglePoints = [];
  lastPoint = null;
  maxNumberOfPointsGenerated = 100;
  get canvasHeight() {
    return this.mainCanvas2DContext.canvas.height;
  }

  get canvasWidth() {
    return this.mainCanvas2DContext.canvas.width;
  }

  constructor() {
    this.initializeRootTriangle();
    this.mainCanvas2DContext.fillStyle = "#fff";
    this.drawFirstThreeDots();
    this.mainCanvas.addEventListener("click", (event) => {
      try {
        if (!this.lastPoint) {
          const { x, y } = this.addDotOnRootTriangle(event);
          this.lastPoint = { x, y };
        }
        this.generateDots();
      } catch (error) {
        alert(error.message);
      }
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

  drawFirstThreeDots() {
    this.rootTrianglePoints.forEach((trianglePoint) => {
      const { x, y } = trianglePoint;
      this.drawDot(x, y);
    });
  }

  addDotOnRootTriangle(event) {
    if (this.checkIsInRootTriangle(event.offsetX, event.offsetY)) {
      this.drawDot(event.offsetX, event.offsetY);
      return { x: event.offsetX, y: event.offsetY };
    }
    throw new Error("The point is outside triangle");
  }

  checkIsInRootTriangle(x, y) {
    return this.mainCanvas2DContext.isPointInPath(this.rootTriangle, x, y);
  }

  generateDots() {
    let number = 1;
    do {
      number++;
      const { x, y } = this.lastPoint;
      const midPoint = this.findMidPoint(
        this.selectOneOfFirstPointsRandomly(),
        { x, y }
      );
      this.drawDot(midPoint.x, midPoint.y);
      this.lastPoint = { x: midPoint.x, y: midPoint.y };
    } while (number < this.maxNumberOfPointsGenerated);
  }

  findMidPoint(firstPoint, secondPoint) {
    return {
      x: (firstPoint.x + secondPoint.x) / 2,
      y: (firstPoint.y + secondPoint.y) / 2,
    };
  }

  selectOneOfFirstPointsRandomly() {
    // Randomly select number from 0 to 2
    // https://stackoverflow.com/a/7228322
    const selectedPointIndex = Math.floor(Math.random() * 3);
    return this.rootTrianglePoints[selectedPointIndex];
  }

  drawDot(x, y) {
    this.mainCanvas2DContext.fillRect(x, y, 1, 1);
  }
}

new SierpinskiTriangle();
