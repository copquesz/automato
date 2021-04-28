import { ArrowType } from './../enum/arrow-type.enum';
import { AutomatoService } from './../service/automato.service';
import { StateType } from './../enum/state-type.enum';
import { ElevatorService } from './../service/elevator.service';
import { State } from './../model/state.model';
import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Automato } from '../model/automato.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Arrow } from '../model/arrow.model';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css']
})
export class ElevatorComponent implements OnInit, AfterViewInit {

  // Canvas Candy Machine
  @ViewChild('elevator')
  canvasElevator: ElementRef<HTMLCanvasElement>;
  canvasElevatorWith: number = 600;
  canvasElevatorHeight: number = 600;
  contextElevator: CanvasRenderingContext2D;

  // Canvas Automato
  @ViewChild('automato')
  canvasAutomato: ElementRef<HTMLCanvasElement>;
  canvasAutomatoWith: number = 800;
  canvasAutomatoHeight: number = 400;
  contextAutomato: CanvasRenderingContext2D;

  automato: Automato;
  states: Array<State> = new Array();

  _floor: BehaviorSubject<number> = new BehaviorSubject(0);
  floor$: Observable<number> = this._floor.asObservable();

  _runing: BehaviorSubject<boolean> = new BehaviorSubject(false);
  runing$: Observable<boolean> = this._runing.asObservable();

  constructor(private elevatorService: ElevatorService, private automatoService: AutomatoService) { }

  ngOnInit(){
    this.elevatorService._runing.subscribe({
      next: result => this._runing.next(result)
    });
    this.elevatorService._floor.subscribe({
      next: result => this._floor.next(result)
    })
  }

  ngAfterViewInit() {
    this.contextAutomato = this.canvasAutomato.nativeElement.getContext('2d');
    this.contextAutomato.canvas.width = this.canvasAutomatoWith;
    this.contextAutomato.canvas.height = this.canvasAutomatoHeight;
    this.contextAutomato.lineWidth = 1;
    this.initAutomato();

    this.contextElevator = this.canvasElevator.nativeElement.getContext('2d');
    this.contextElevator.canvas.width = this.canvasElevatorWith;
    this.contextElevator.canvas.height = this.canvasElevatorHeight;
    this.contextElevator.lineWidth = 1;
    this.elevatorService.init(this.contextElevator, this.canvasElevator, this.canvasElevatorWith, this.canvasElevatorHeight);
  }

  initAutomato(){
    const zeroA = new State(this.canvasAutomatoWith * 0.10, this.canvasAutomatoHeight * 0.5, 15, '0A', StateType.FINAL);
    const firstA = new State(this.canvasAutomatoWith * 0.35, this.canvasAutomatoHeight * 0.65, 15, '1A', StateType.FINAL);
    const firstF = new State(this.canvasAutomatoWith * 0.35, this.canvasAutomatoHeight * 0.35, 15, '1F', StateType.DEFAULT);
    const secondA = new State(this.canvasAutomatoWith * 0.60, this.canvasAutomatoHeight * 0.20, 15, '2A', StateType.FINAL);
    const secondF = new State(this.canvasAutomatoWith * 0.60, this.canvasAutomatoHeight * 0.80, 15, '2F', StateType.DEFAULT);
    const thirdA = new State(this.canvasAutomatoWith * 0.85, this.canvasAutomatoHeight * 0.5, 15, '3A', StateType.FINAL);


    zeroA.arrows.push(new Arrow(zeroA, zeroA, ArrowType.LOOP, {cp1x: zeroA.x, cp1y: 50, cp2x: zeroA.x, cp2y: 50, x: zeroA.x, y: zeroA.y, textX: zeroA.x + ((zeroA.x - zeroA.x) / 2), textY: 170, heightLoop: 155}, ['0']));
    firstA.arrows.push(new Arrow(firstA, firstA, ArrowType.LOOP, {cp1x: firstA.x, cp1y: 50, cp2x: firstA.x, cp2y: 50, x: firstA.x, y: firstA.y, textX: firstA.x + ((firstA.x - firstA.x) / 2), textY: 220, heightLoop: 200}, ['1']));
    secondA.arrows.push(new Arrow(secondA, secondA, ArrowType.LOOP, {cp1x: secondA.x, cp1y: 50, cp2x: secondA.x, cp2y: 50, x: secondA.x, y: secondA.y, textX: secondA.x + ((secondA.x - secondA.x) / 2), textY: 40, heightLoop: 20}, ['2']));
    thirdA.arrows.push(new Arrow(thirdA, thirdA, ArrowType.LOOP, {cp1x: thirdA.x, cp1y: 50, cp2x: thirdA.x, cp2y: 50, x: thirdA.x, y: thirdA.y, textX: thirdA.x + ((thirdA.x - thirdA.x) / 2), textY: 165, heightLoop: 150}, ['3']));

    zeroA.arrows.push(new Arrow(zeroA, firstF, ArrowType.CURVED, {cp1x: zeroA.x, cp1y: 200, cp2x: firstF.x, cp2y: 200, x: firstF.x, y: firstF.y, textX: zeroA.x  - 50 + ((firstF.x - zeroA.x) / 2), textY: 195}, ['2', '3']));
    zeroA.arrows.push(new Arrow(zeroA, firstF, ArrowType.CURVED, {cp1x: zeroA.x, cp1y: 130, cp2x: firstF.x, cp2y: 130, x: firstF.x, y: firstF.y, textX: zeroA.x + 50 + ((firstF.x - zeroA.x) / 2), textY: 130}, ['0']));
    zeroA.arrows.push(new Arrow(zeroA, firstA, ArrowType.CURVED, {cp1x: zeroA.x, cp1y: 300, cp2x: firstA.x, cp2y: 300, x: firstA.x, y: firstA.y, textX: zeroA.x - 80 + ((firstA.x - zeroA.x) / 2), textY: 255}, ['0']));
    zeroA.arrows.push(new Arrow(zeroA, firstA, ArrowType.CURVED, {cp1x: zeroA.x, cp1y: 220, cp2x: firstA.x, cp2y: 220, x: firstA.x, y: firstA.y, textX: zeroA.x + 50 + ((firstA.x - zeroA.x) / 2), textY: 225}, ['1']));

    firstA.arrows.push(new Arrow(firstA, secondF, ArrowType.CURVED, {cp1x: firstA.x, cp1y: 280, cp2x: secondF.x, cp2y: 280, x: secondF.x, y: secondF.y, textX: firstA.x + ((secondF.x - firstA.x) / 2), textY: 290}, ['3']));
    firstA.arrows.push(new Arrow(firstA, secondF, ArrowType.CURVED, {cp1x: firstA.x, cp1y: 350, cp2x: secondF.x, cp2y: 350, x: secondF.x, y: secondF.y, textX: firstA.x + ((secondF.x - firstA.x) / 2), textY: 345}, ['1']));
    firstA.arrows.push(new Arrow(firstA, secondA, ArrowType.CURVED, {cp1x: firstA.x, cp1y: 230, cp2x: secondA.x, cp2y: 230, x: secondA.x, y: secondA.y, textX: firstA.x - 60 + ((secondA.x - firstA.x) / 2), textY: 235}, ['2']));
    firstA.arrows.push(new Arrow(firstA, secondA, ArrowType.CURVED, {cp1x: firstA.x, cp1y: 180, cp2x: secondA.x, cp2y: 180, x: secondA.x, y: secondA.y, textX: firstA.x + 60 + ((secondA.x - firstA.x) / 2), textY: 140}, ['1']));

    firstF.arrows.push(new Arrow(firstF, secondA, ArrowType.CURVED, {cp1x: firstF.x, cp1y: 140, cp2x: secondA.x, cp2y: 140, x: secondA.x, y: secondA.y, textX: firstF.x + 20 + ((secondA.x - firstF.x) / 2), textY: 125}, ['2']));
    firstF.arrows.push(new Arrow(firstF, secondA, ArrowType.CURVED, {cp1x: firstF.x, cp1y: 90, cp2x: secondA.x, cp2y: 90, x: secondA.x, y: secondA.y, textX: firstF.x + 20 + ((secondA.x - firstF.x) / 2), textY: 90}, ['0']));
    firstF.arrows.push(new Arrow(firstF, secondF, ArrowType.CURVED, {cp1x: firstF.x, cp1y: 240, cp2x: secondF.x, cp2y: 240, x: secondF.x, y: secondF.y, textX: firstF.x - 75 + ((secondF.x - firstF.x) / 2), textY: 180}, ['3']));
    firstF.arrows.push(new Arrow(firstF, secondF, ArrowType.CURVED, {cp1x: firstF.x, cp1y: 150, cp2x: secondF.x, cp2y: 150, x: secondF.x, y: secondF.y, textX: firstF.x + 90 + ((secondF.x - firstF.x) / 2), textY: 245}, ['0']));

    secondA.arrows.push(new Arrow(secondA, thirdA, ArrowType.CURVED, {cp1x: secondA.x, cp1y: 90, cp2x: thirdA.x, cp2y: 90, x: thirdA.x, y: thirdA.y, textX: secondA.x + ((thirdA.x - secondA.x) / 2), textY: 100}, ['3']));
    secondA.arrows.push(new Arrow(secondA, thirdA, ArrowType.CURVED, {cp1x: secondA.x, cp1y: 150, cp2x: thirdA.x, cp2y: 150, x: thirdA.x, y: thirdA.y, textX: secondA.x + ((thirdA.x - secondA.x) / 2), textY: 145}, ['2']));

    secondF.arrows.push(new Arrow(secondF, thirdA, ArrowType.CURVED, {cp1x: secondF.x, cp1y: 200, cp2x: thirdA.x, cp2y: 200, x: thirdA.x, y: thirdA.y, textX: secondF.x + ((thirdA.x - secondF.x) / 2), textY: 210}, ['3']));
    secondF.arrows.push(new Arrow(secondF, thirdA, ArrowType.CURVED, {cp1x: secondF.x, cp1y: 300, cp2x: thirdA.x, cp2y: 300, x: thirdA.x, y: thirdA.y, textX: secondF.x + 30 + ((thirdA.x - secondF.x) / 2), textY: 270}, ['0', '1']));



    zeroA.isSelected(true);

    this.states.push(zeroA, firstA, firstF, secondA, secondF, thirdA);

    // Instance Automato
    this.automato = new Automato(this.contextAutomato, this.states);
    this.automatoService.init(this.automato, this.canvasAutomatoWith, this.canvasAutomatoHeight);

  }

  move(floor: number){
    this.elevatorService.updateFloor(floor);
  }

}
