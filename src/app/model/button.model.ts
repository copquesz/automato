import { React } from './react.model';
import { Text } from './text.model';

export class Button {

  react: React;
  text: Text;

  constructor(react: React, text: Text){
    this.react = react;
    this.text = text;
  }

  draw(context: CanvasRenderingContext2D): void {
    this.react.drawFill(context, true);
    this.text.draw(context);
  }
}
