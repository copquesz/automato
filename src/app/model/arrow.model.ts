import { ArrowType } from '../enum/arrow-type.enum';
import { State } from './state.model';

export class Arrow {

  from: State;
  to: State;
  type: ArrowType;
  curvedData: CurvedData;
  inputs: Array<string>;

  constructor(from: State, to: State, type: ArrowType, curvedData?: CurvedData, inputs?: Array<string>){
    this.from = from;
    this.to = to;
    this.type = type;
    this.curvedData = curvedData ? curvedData : {} as CurvedData;
    this.inputs = inputs ? inputs : new Array();
  }

}

export interface CurvedData {

  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
  x: number;
  y: number;
  textX: number;
  textY: number;
  heightLoop?: number;

}
