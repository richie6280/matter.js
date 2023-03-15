import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Matter from 'matter-js';
import { Engine, Runner, Render, World, Constraint, MouseConstraint, Bodies, Mouse, Composites, Body, Composite } from 'matter-js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'matter';

  screenWidth = window.screen.width;
  screenHeight = window.screen.height;

  render;
  engine;
  runner;

  items = [];

  constructor() {
    window['matter'] = this;
  }

  ngOnInit() {
    this.runner = Matter.Runner.create();
    this.demo();
  }

  demo() {
    this.engine = Matter.Engine.create();

    this.render = Matter.Render.create({
      element: document.body,
      engine: this.engine,
      options: {
        width: this.screenWidth,
        height: this.screenHeight,
        wireframes: false,
        background: '#5b5f97',
        // wireframeBackground: '#000',

        pixelRatio: 1,
        // hasBounds: this.bounds,
        // enabled: true,
        showSleeping: true,
        showDebug: false,
        showStats: true,
        showPerformance: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: true,
        showCollisions: true,
        showSeparations: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: true,
        showIds: true,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false
      },
    })

    this.items = this.creatItems();

    const groundA = Matter.Bodies.rectangle(30, this.screenHeight / 2, 30, this.screenHeight, { isStatic: true })
    const groundC = Matter.Bodies.rectangle(this.screenWidth - 30, this.screenHeight / 2, 30, this.screenHeight, { isStatic: true })
    const groundB = Matter.Bodies.rectangle(this.screenWidth / 2, this.screenHeight * 0.85, this.screenWidth, 30, { isStatic: true })
    const groundD = Matter.Bodies.rectangle(this.screenWidth / 2, this.screenHeight * 0.05, this.screenWidth, 30, { isStatic: true })

    // World.add(this.engine.world, [this.boxA, this.ballA, this.ballB, this.groundA, groundB, this.boxB, this.ballC, this.ballD])

    const mouseConstraint = this.creatMouseEvent();
    // Matter.World.add(this.engine.world, mouseConstraint)

    // Pryamid 金字塔
    // const compositeC = Composites.pyramid(470, 200, 5, 4, 0, 0, function (x, y) {
    //   return Bodies.rectangle(x, y, 20, 20);
    // });
    // Composite.add(this.engine.world, [compositeC]);

    // Stack 堆疊
    // const compositeD = Composites.stack(480, 100, 3, 3, 0, 0, function (x, y) {
    //   return Bodies.circle(x, y, 15);
    // });

    // Composite.add(this.engine.world, [this.boxA, this.ballA, this.ballB, groundB, this.boxB, this.ballC, this.ballD,this.polygonA, mouseConstraint]);
    Composite.add(this.engine.world, [...this.items, groundA, groundB, groundC, groundD, mouseConstraint]);

    // Engine.run(this.engine) // Runner持續執行
    Matter.Runner.run(this.runner, this.engine);
    Matter.Render.run(this.render);
  }

  runRunner() {
    Matter.Runner.run(this.runner, this.engine);
  }

  stopRunner() {
    Matter.Runner.stop(this.runner);
  }

  changeBgColor() {
    // const colors = "fe5d26-f2c078-faedca-c1dbb3-7ebc89-b8b8d1-5b5f97-ffc145-ff6b6c".split('-').map(color => '#' + color);
    const colors = ['#fe5d26', '#f2c078', '#faedca', '#c1dbb3', '#7ebc89', '#b8b8d1', '#5b5f97', '#ffc145', '#ff6b6c'];
    const random = Math.floor(Math.random() * 8) + 1;
    this.render.options.background = `${colors[random]}`;
  }

  spinItems() {
    // this.body.applyForce(this.boxA, { x: 100, y: 500 }, { x: 1, y: 0 });
    // Matter.Body.setAngularVelocity(this.boxA, 1);
    this.items.forEach(item => Matter.Body.setAngularVelocity(item, 1));
  }

  setNewItems() {
    // Matter.Body.setPosition(this.boxA, { x: this.screenWidth / 2, y: 250 });
    // Matter.Body.setPosition(this.boxB, { x: 400, y: 200 });
    // Matter.Body.setPosition(this.ballA, { x: 380, y: 100 });
    // Matter.Body.setPosition(this.ballB, { x: 460, y: 10 });
    // Matter.Body.setPosition(this.ballC, { x: 380, y: 100 });
    // Matter.Body.setPosition(this.ballD, { x: 400, y: 10 });
    // Matter.Body.setPosition(this.groundA, { x: 300, y: 100 });

    Composite.clear(this.engine.world, true);

    const arr = this.creatItems();
    const mouseConstraint = this.creatMouseEvent();
    Composite.add(this.engine.world, [...arr, mouseConstraint]);
  }

  creatItems() {
    this.items = [];

    for (let i = 0; i < 33; i++) {
      const randomPositionX = Math.floor(Math.random() * this.screenWidth / 2) + this.screenWidth / 7;
      const randomPositionY = Math.floor(Math.random() * this.screenHeight / 2) + this.screenHeight / 5;
      const randomWidth = Math.floor(Math.random() * (this.screenWidth / 20));
      const item = Matter.Bodies.circle(randomPositionX, randomPositionY, randomWidth, {});
      this.items.push(item);
    };

    for (let i = 0; i < 33; i++) {
      const randomPositionX = Math.floor(Math.random() * this.screenWidth / 2) + this.screenWidth / 7;
      const randomPositionY = Math.floor(Math.random() * this.screenHeight / 2) + this.screenHeight / 5;
      const randomWidth = Math.floor(Math.random() * (this.screenWidth / 20));
      const item = Matter.Bodies.rectangle(randomPositionX, randomPositionY, randomWidth, randomWidth);
      this.items.push(item);
    };

    for (let i = 0; i < 34; i++) {
      const randomPositionX = Math.floor(Math.random() * this.screenWidth / 2) + this.screenWidth / 7;
      const randomPositionY = Math.floor(Math.random() * this.screenHeight / 2) + this.screenHeight / 5;
      const randomWidth = Math.floor(Math.random() * (this.screenWidth / 20));
      const item = Matter.Bodies.polygon(randomPositionX, randomPositionY, 6, randomWidth);
      this.items.push(item);
    };

    if (this.items.length === 100) return this.items;
  }

  // mouseConstraint 滑鼠拖移
  creatMouseEvent() {
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    const mouse = Mouse.create(this.render.canvas);
    const mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        stiffness: 1,
        render: {
          visible: false
        }
      }
    });

    return mouseConstraint;
  }

  mouseMoved(event: MouseEvent) {
    // console.log(event.x, event.y)
  }

}
