import { React } from './react.model';
import { Text } from './text.model';
export class Elevator {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  leftDoor: React;
  rightDoor: React;
  floor: number;

  constructor(x: number, y: number, w: number, h: number, src: string, leftDoor: React, rightDoor: React, floor: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.src = src;
    this.leftDoor = leftDoor;
    this.rightDoor = rightDoor;
    this.floor = floor;
  }

  load(context: CanvasRenderingContext2D) {
    this.image.onload = () => {
      context.drawImage(this.image, this.x, this.y, this.w, this.h);
      context.strokeRect(this.x, this.y, this.w, this.h);
    }
    this.leftDoor.drawFill(context, true);
    this.rightDoor.drawFill(context, true);
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.w, this.h);
    context.strokeRect(this.x, this.y, this.w, this.h);
    this.leftDoor.drawFill(context, true);
    this.rightDoor.drawFill(context, true);
  }
}
