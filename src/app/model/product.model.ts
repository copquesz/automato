import { Text } from './text.model';
export class Product {

  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  value: number;
  available = false;
  selected = false;
  image: HTMLImageElement;
  code: Text;

  constructor(id: number, x: number, y: number, w: number, h: number, value: number, src: string, code?: Text) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.value = value;
    this.image = new Image();
    this.image.src = src;
    this.code = code ? code : null;
  }

  load(context: CanvasRenderingContext2D) {
    this.image.onload = () => {
      context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    this.code.draw(context);
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.w, this.h);
    this.code.draw(context);
  }
}
