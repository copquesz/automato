import { State } from './state.model';

export class Automato {

  context: CanvasRenderingContext2D;
  states: Array<State>;

  constructor(context: CanvasRenderingContext2D, states: Array<State>){
    this.context = context;
    this.states = states;
  }

}
