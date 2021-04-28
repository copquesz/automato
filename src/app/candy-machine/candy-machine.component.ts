import { CandyMachineService } from './../service/candy-machine.service';
import { StateType } from './../enum/state-type.enum';
import { ArrowType } from '../enum/arrow-type.enum';
import { State } from './../model/state.model';
import { AutomatoService } from './../service/automato.service';
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Automato } from '../model/automato.model';
import { Arrow } from '../model/arrow.model';

@Component({
  selector: 'app-candy-machine',
  templateUrl: './candy-machine.component.html',
  styleUrls: ['./candy-machine.component.css']
})
export class CandyMachineComponent implements AfterViewInit {

  // Canvas Candy Machine
  @ViewChild('candyMachine')
  canvasCandyMachine: ElementRef<HTMLCanvasElement>;
  canvasCandyMachineWith: number = 480;
  canvasCandyMachineHeight: number = 600;
  contextCandyMachine: CanvasRenderingContext2D;

  // Canvas Automato
  @ViewChild('automato')
  canvasAutomato: ElementRef<HTMLCanvasElement>;
  canvasAutomatoWith: number = 800;
  canvasAutomatoHeight: number = 400;
  contextAutomato: CanvasRenderingContext2D;

  automato: Automato;
  states: Array<State> = new Array();

  // Utils
  totalInsert: number;
  totalRequest: number;
  transshipment: number;
  info: Array<string>;


  constructor(private automatoService: AutomatoService, private candyMachineService: CandyMachineService) { }


  ngAfterViewInit(){
    this.contextAutomato = this.canvasAutomato.nativeElement.getContext('2d');
    this.contextAutomato.canvas.width = this.canvasAutomatoWith;
    this.contextAutomato.canvas.height = this.canvasAutomatoHeight;
    this.contextAutomato.lineWidth = 1;
    this.initAutomato();

    this.contextCandyMachine = this.canvasCandyMachine.nativeElement.getContext('2d');
    this.contextCandyMachine.canvas.width = this.canvasCandyMachineWith;
    this.contextCandyMachine.canvas.height = this.canvasCandyMachineHeight;
    this.contextCandyMachine.lineWidth = 1;
    this.candyMachineService.init(this.contextCandyMachine, this.canvasCandyMachine, this.canvasCandyMachineWith, this.canvasCandyMachineHeight, this.automato);

    this.candyMachineService._totalInsert.subscribe({
      next: totalInsert => this.totalInsert = totalInsert
    });
    this.candyMachineService._totalRequest.subscribe({
      next: totalRequest => this.totalRequest = totalRequest
    });
    this.candyMachineService._transshipment.subscribe({
      next: transshipment => this.transshipment = transshipment
    });
    this.candyMachineService._info.subscribe({
      next: info => this.info = info
    });
  }

  /** CANDY MACHINE */

  /** AUTOMATO */
  initAutomato(){
    // Set states
    const q1: State = new State(this.canvasAutomatoWith * 0.18, this.canvasAutomatoHeight * 0.3, 15, 'q1', StateType.INITIAL);
    const q2: State = new State(this.canvasAutomatoWith * 0.27, this.canvasAutomatoHeight * 0.3, 15, 'q2', StateType.DEFAULT);
    const q3: State = new State(this.canvasAutomatoWith * 0.36, this.canvasAutomatoHeight * 0.3, 15, 'q3', StateType.DEFAULT);
    const q4: State = new State(this.canvasAutomatoWith * 0.45, this.canvasAutomatoHeight * 0.3, 15, 'q4', StateType.DEFAULT);
    const q5: State = new State(this.canvasAutomatoWith * 0.54, this.canvasAutomatoHeight * 0.3, 15, 'q5', StateType.DEFAULT);
    const q6: State = new State(this.canvasAutomatoWith * 0.63, this.canvasAutomatoHeight * 0.3, 15, 'q6', StateType.DEFAULT);
    const q7: State = new State(this.canvasAutomatoWith * 0.72, this.canvasAutomatoHeight * 0.3, 15, 'q7', StateType.DEFAULT);
    const q8: State = new State(this.canvasAutomatoWith * 0.81, this.canvasAutomatoHeight * 0.3, 15, 'q8', StateType.FINAL);
    const q9: State = new State(this.canvasAutomatoWith * 0.81, this.canvasAutomatoHeight * 0.6, 15, 'q9', StateType.FINAL);
    const q10: State = new State(this.canvasAutomatoWith * 0.81, this.canvasAutomatoHeight * 0.9, 15, 'q10', StateType.FINAL);
    const q11: State = new State(this.canvasAutomatoWith * 0.95, this.canvasAutomatoHeight * 0.6, 15, 'q11', StateType.FINAL);

    q1.isSelected(true);

    // Set transitions
    q1.arrows.push(new Arrow(q1, q2, ArrowType.DEFAULT, null, ['OK']));
    q2.arrows.push(new Arrow(q2, q3, ArrowType.DEFAULT, null, ['1']));
    q2.arrows.push(new Arrow(q2, q4, ArrowType.CURVED, {cp1x: q2.x, cp1y: 50, cp2x: q4.x, cp2y: 50, x: q4.x, y: q4.y, textX: q2.x + 10 + ((q4.x - q2.x) / 2), textY: 60}, ['2']));
    q2.arrows.push(new Arrow(q2, q7, ArrowType.CURVED, {cp1x: q2.x, cp1y: 200, cp2x: q7.x, cp2y: 200, x: q7.x, y: q7.y, textX: q2.x + 10 + ((q7.x - q2.x) / 2), textY: 190}, ['5']));
    q3.arrows.push(new Arrow(q3, q4, ArrowType.DEFAULT, null, ['1']));
    q3.arrows.push(new Arrow(q3, q5, ArrowType.CURVED, {cp1x: q3.x, cp1y: 150, cp2x: q5.x, cp2y: 150, x: q5.x, y: q5.y, textX: q3.x + 10 + ((q5.x - q3.x) / 2), textY: 150}, ['2']));
    q3.arrows.push(new Arrow(q3, q8, ArrowType.CURVED, {cp1x: q3.x, cp1y: 15, cp2x: q8.x, cp2y: 15, x: q8.x, y: q8.y, textX: q3.x + 10 + ((q8.x - q3.x) / 2), textY: 35}, ['5']));
    q4.arrows.push(new Arrow(q4, q5, ArrowType.DEFAULT, null, ['1']));
    q4.arrows.push(new Arrow(q4, q6, ArrowType.CURVED, {cp1x: q4.x, cp1y: 75, cp2x: q6.x, cp2y: 75, x: q6.x, y: q6.y, textX: q4.x + 10 + ((q6.x - q4.x) / 2), textY: 80}, ['2']));
    q4.arrows.push(new Arrow(q4, q9, ArrowType.CURVED, {cp1x: q4.x, cp1y: 200, cp2x: q9.x, cp2y: 200, x: q9.x, y: q9.y, textX: q4.x + 10 + ((q9.x - q4.x) / 2), textY: 190}, ['5']));
    q5.arrows.push(new Arrow(q5, q6, ArrowType.DEFAULT, null, ['1']));
    q5.arrows.push(new Arrow(q5, q10, ArrowType.CURVED, {cp1x: q5.x, cp1y: 150, cp2x: q10.x, cp2y: 150, x: q10.x, y: q10.y, textX: q5.x + 10 + ((q10.x - q5.x) / 2), textY: 175}, ['5']));
    q5.arrows.push(new Arrow(q5, q10, ArrowType.CURVED, {cp1x: q5.x, cp1y: 400, cp2x: q10.x, cp2y: 400, x: q10.x, y: q10.y, textX: q5.x + 10 + ((q10.x - q5.x) / 2), textY: 360}, ['5']));
    q6.arrows.push(new Arrow(q6, q7, ArrowType.DEFAULT, null, ['1']));
    q6.arrows.push(new Arrow(q6, q8, ArrowType.CURVED, {cp1x: q6.x, cp1y: 80, cp2x: q8.x, cp2y: 80, x: q8.x, y: q8.y, textX: q6.x + 10 + ((q8.x - q6.x) / 2), textY: 85}, ['2']));
    q6.arrows.push(new Arrow(q6, q11, ArrowType.CURVED, {cp1x: q6.x, cp1y: 150, cp2x: q11.x, cp2y: 150, x: q11.x, y: q11.y, textX: q6.x + 10 + ((q11.x - q6.x) / 2), textY: 170}, ['5']));
    q7.arrows.push(new Arrow(q7, q8, ArrowType.DEFAULT, null, ['1']));
    q7.arrows.push(new Arrow(q7, q9, ArrowType.CURVED, {cp1x: q7.x, cp1y: 150, cp2x: q9.x, cp2y: 150, x: q9.x, y: q9.y, textX: q7.x + 10 + ((q9.x - q7.x) / 2), textY: 180}, ['2']));
    q7.arrows.push(new Arrow(q7, q11, ArrowType.CURVED, {cp1x: q7.x, cp1y: 150, cp2x: q11.x, cp2y: 150, x: q11.x, y: q11.y, textX: q7.x -50 + ((q11.x - q7.x) / 2), textY: 135}, ['5']));
    q8.arrows.push(new Arrow(q8, q9, ArrowType.CURVED, {cp1x: q8.x, cp1y: 250, cp2x: q9.x, cp2y: 250, x: q9.x, y: q9.y, textX: q8.x + 10 + ((q9.x - q8.x) / 2), textY: 190}, ['1']));
    q8.arrows.push(new Arrow(q8, q10, ArrowType.CURVED, {cp1x: q8.x, cp1y: 150, cp2x: q10.x + 100, cp2y: 150, x: q10.x, y: q10.y, textX: q8.x + 50 + ((q10.x - q8.x) / 2), textY: 220}, ['2']));
    q9.arrows.push(new Arrow(q9, q10, ArrowType.CURVED, {cp1x: q9.x, cp1y: 300, cp2x: q10.x, cp2y: 300, x: q10.x, y: q10.y, textX: q9.x + 10 + ((q10.x - q9.x) / 2), textY: 280}, ['1']));
    q9.arrows.push(new Arrow(q9, q11, ArrowType.CURVED, {cp1x: q9.x, cp1y: 250, cp2x: q11.x, cp2y: 250, x: q11.x, y: q11.y, textX: q9.x + 10 + ((q11.x - q9.x) / 2), textY: 260}, ['2', '5']));
    q10.arrows.push(new Arrow(q10, q11, ArrowType.CURVED, {cp1x: q10.x, cp1y: 300, cp2x: q11.x, cp2y: 300, x: q11.x, y: q11.y, textX: q10.x + 10 + ((q11.x - q10.x) / 2), textY: 310}, ['1,', '2', '5']));

    this.states.push(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11);

    // Instance Automato
    this.automato = new Automato(this.contextAutomato, this.states);
    this.automatoService.init(this.automato, this.canvasAutomatoWith, this.canvasAutomatoHeight);
  }


}
