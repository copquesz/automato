export class Note {

  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  value: number;
  image: HTMLImageElement;

  constructor(x: number, y: number, w: number, h: number, value: number, src: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.value = value;
    this.image = new Image();
    this.image.src = src;
  }

  load(context: CanvasRenderingContext2D) {
    this.image.onload = () => {
      context.drawImage(this.image, this.x, this.y, this.w, this.h);
      context.strokeRect(this.x, this.y, this.w, this.h);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.w, this.h);
    context.strokeRect(this.x, this.y, this.w, this.h);
  }
}
