import { StateType } from './../enum/state-type.enum';
import { Arrow } from "./arrow.model";

export class State {

  x: number;
  y: number;
  radius: number;
  content: string;
  type: StateType;
  arrows: Array<Arrow>;
  selected: boolean = false;
  fillStyle: string = '#2ecc71';
  lineWidth: number = 1;
  strokeStyle: string = "66CC01";

  constructor(x: number, y: number, radius: number, content, type: StateType, arrows?: Array<Arrow>) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.content = content;
    this.type = type;
    this.arrows = arrows ? arrows : new Array();
  }

  isSelected(value: boolean){
    this.selected = value;
    if(value === true) this.fillStyle = "#e74c3c";
    else this.fillStyle = "#2ecc71";
  }

}
