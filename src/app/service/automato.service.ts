import { CurvedData } from './../model/arrow.model';
import { State } from './../model/state.model';
import { Injectable } from '@angular/core';
import { Automato } from '../model/automato.model';
import { ArrowType } from '../enum/arrow-type.enum';
import { Arrow } from '../model/arrow.model';
import { StateType } from '../enum/state-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AutomatoService {

  canvasWidth: number = 750;
  canvasHeight: number = 250;

  automato: Automato;
  context: CanvasRenderingContext2D;

  constructor() { }

  init(automato: Automato, canvasWidth: number, canvasHeight: number){
    this.automato = automato;
    this.context = automato.context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.buildStates();
  }

  arrow(arrow: Arrow){
    var input = arrow.inputs.join(',')
    var arrowHead = 5;
    var stateFrom = arrow.from;
    var stateTo = arrow.to;
    var x1 = stateFrom.x + 10;
    var x2 = stateTo.x - 10;
    var y1 = stateFrom.y;
    var y2 = stateTo.y;
    var dx = x2 + - x1;
    var dy = y2 - y1;
    var angle = Math.atan2(dy, dx);

    this.context.beginPath();
    this.context.moveTo(x1 + 5, stateFrom.y);
    this.context.lineTo(x2, stateTo.y);
    this.context.lineTo(x2 - arrowHead * Math.cos(angle - Math.PI / 6), stateTo.y - arrowHead * Math.sin(angle - Math.PI / 6));
    this.context.moveTo(x2, stateTo.y);
    this.context.lineTo(x2 - arrowHead * Math.cos(angle + Math.PI / 6), stateTo.y - arrowHead * Math.sin(angle + Math.PI / 6));
    this.context.stroke();

    this.context.font = '7pt Calibri';
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.fillText(input, x1 + dx / 2, y1 + dy - 3);
  }

  arrowCurved(arrow: Arrow, curvedData: CurvedData){
    var input = arrow.inputs.join(',')
    var x1 = arrow.from.x + 10;
    var y1 = arrow.from.y;

    this.context.beginPath();
    this.context.moveTo(x1 + 3, y1);
    this.context.bezierCurveTo(curvedData.cp1x, curvedData.cp1y, curvedData.cp2x, curvedData.cp2y, curvedData.x, curvedData.y);
    this.context.stroke();

    this.context.font = '7pt Calibri';
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.fillText(input, curvedData.textX, curvedData.textY);
  }

  arrowLoop(arrow: Arrow, curvedData: CurvedData){
    var input = arrow.inputs.join(',')
    var x1 = arrow.from.x + 10;
    var y1 = arrow.from.y;
    var x2 = arrow.to.x;
    var y2 = arrow.to.y;

    this.context.beginPath();
    this.context.moveTo(x1, y1 -10);
    this.context.quadraticCurveTo(x2, curvedData.heightLoop, x2 - 10, y2 - 10);
    this.context.stroke();

    this.context.font = '7pt Calibri';
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.fillText(input, curvedData.textX, curvedData.textY);
  }

  buildStates(){
    this.automato.states.forEach(state => {
      switch(state.type){
        case StateType.INITIAL: this.defaultState(state); break;
        case StateType.DEFAULT: this.defaultState(state); break;
        case StateType.FINAL: this.finalState(state); break;
      }
      state.arrows.forEach(arrow => {

        switch (arrow.type){
          case ArrowType.DEFAULT: this.arrow(arrow); break;
          case ArrowType.CURVED: this.arrowCurved(arrow, arrow.curvedData); break;
          case ArrowType.LOOP: this.arrowLoop(arrow, arrow.curvedData); break
        }
      })
    })
  }

  defaultState(state: State){
    this.context.beginPath();
    this.context.arc(state.x, state.y, state.radius, 0, 2 * Math.PI, true);
    this.context.fillStyle = state.fillStyle;
    this.context.fill();
    this.context.font = '8pt Calibri';
    this.context.fillStyle = 'white';
    this.context.textAlign = 'center';
    this.context.fillText(state.content, state.x, state.y+3);
  }

  finalState(state: State){
    this.context.beginPath();
    this.context.arc(state.x, state.y, state.radius, 0, 2 * Math.PI, true);
    this.context.fillStyle = state.fillStyle;
    this.context.fill();
    this.context.font = '8pt Calibri';
    this.context.fillStyle = 'white';
    this.context.textAlign = 'center';
    this.context.fillText(state.content, state.x, state.y+3);
    this.context.lineWidth = state.lineWidth;
    this.context.strokeStyle = state.strokeStyle;
    this.context.stroke();
  }

  next(before: string, after: string){
    this.automato.states.forEach(state => {
      if(state.content === before){
        state.isSelected(false);
      }
      if(state.content === after){
        state.isSelected(true);
      }
    })
    this.redraw();
  }

  getActuallyState(){
    return this.automato.states.find(state => state.selected == true);
  }

  redraw(){
    this.clear();
    this.buildStates();
  }

  clear(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

}
