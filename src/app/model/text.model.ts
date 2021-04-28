export class Text {

  word: string;
  x: number;
  y: number;
  font: string = 'Arial';
  fontSize: string = '24px';
  fillStyle: string = 'black';
  textAlign: CanvasTextAlign = 'left'

  constructor(word: string, x: number, y: number, font?: string, fontSize?: string, fillStyle?: string, textAlign?: CanvasTextAlign) {
    this.word = word
    this.x = x;
    this.y = y;
    this.font = font ? font : 'Arial';
    this.fillStyle = fillStyle ? fillStyle : '24px';
    this.fontSize = fontSize ? fontSize : 'black';
    this.textAlign = textAlign ? textAlign : 'left'
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.word && this.x && this.y) {
      context.fillStyle = this.fillStyle;
      context.font = `${this.fontSize} ${this.font}`;
      context.textAlign = this.textAlign;
      context.fillText(this.word, this.x, this.y);
    }
  }
}
