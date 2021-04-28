export class React {

  x: number;
  y: number;
  w: number;
  h: number;
  fillStyle: string;
  lineWidth: number;

  constructor(x: number, y: number, w: number, h: number, fillStyle?: string, lineWidth?: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fillStyle = fillStyle ? fillStyle : 'black';
    this.lineWidth = lineWidth ? lineWidth : 1;
  }

  drawStroke(context: CanvasRenderingContext2D): void {
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.fillStyle;
    context.strokeRect(this.x, this.y, this.w, this.h);
  }

  drawFill(context: CanvasRenderingContext2D, stroke: boolean){
    context.fillStyle = this.fillStyle;
    context.fillRect(this.x, this.y, this.w, this.h);
    if(stroke) context.strokeRect(this.x, this.y, this.w, this.h);
  }


}
