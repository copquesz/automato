import { BehaviorSubject } from 'rxjs';
import { React } from './../model/react.model';
import { Elevator } from './../model/elevator.model';
import { Automato } from './../model/automato.model';
import { AutomatoService } from './automato.service';
import { State } from './../model/state.model';
import { ElementRef, Injectable } from '@angular/core';
import { Text } from '../model/text.model';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {

  context: CanvasRenderingContext2D;
  canvasWidth: number = 750;
  canvasHeight: number = 250;

  automato: Automato;

  elevator0: Elevator;
  elevator1: Elevator;
  elevator2: Elevator;
  elevator3: Elevator;

  floor: number = 0;

  requestAnimationId;
  openDoorInterval;
  closeDoorInterval;
  updateInterval;

  _runing: BehaviorSubject<boolean> = new BehaviorSubject(false);
  _floor: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private automatoService: AutomatoService) { }

  init(context: CanvasRenderingContext2D, canvas: ElementRef<HTMLCanvasElement>, canvasWidth: number, canvasHeight: number){
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.build();
    this.requestAnimationId = requestAnimationFrame(() => this.loop());
  }

  loop(){
    this.clear();
    this.draw();
    this.requestAnimationId = requestAnimationFrame(() => this.loop());
  }

  build(){
    this.elevator0 = new Elevator(
      0, 0, this.canvasWidth, this.canvasHeight, '../../assets/elevator/bg-0.png',
      new React((this.canvasWidth * 0.257), (this.canvasHeight * 0.136), (this.canvasWidth * 0.1), (this.canvasHeight * 0.775), '#4188E4'),
      new React((this.canvasWidth * 0.635), (this.canvasHeight * 0.136), (this.canvasWidth * 0.1), (this.canvasHeight * 0.775), '#4188E4'),
      0
    );
    this.elevator0.load(this.context);

    this.elevator1 = new Elevator(
      0, (0 - (this.canvasHeight * 1)), this.canvasWidth, this.canvasHeight, '../../assets/elevator/bg-1.png',
      new React((this.canvasWidth * 0.257), (this.canvasHeight * 0.136 - (this.canvasHeight * 1)), (this.canvasWidth * 0.25), (this.canvasHeight * 0.775), '#4188E4'),
      new React((this.canvasWidth * 0.485), (this.canvasHeight * 0.136 - (this.canvasHeight * 1)), (this.canvasWidth * 0.25), (this.canvasHeight * 0.775), '#4188E4'),
      1
    );
    this.elevator1.load(this.context);

    this.elevator2 = new Elevator(
      0, (0 - (this.canvasHeight * 2)), this.canvasWidth, this.canvasHeight, '../../assets/elevator/bg-2.png',
      new React((this.canvasWidth * 0.257), (this.canvasHeight * 0.136 - (this.canvasHeight * 2)), (this.canvasWidth * 0.25), (this.canvasHeight * 0.775), '#4188E4'),
      new React((this.canvasWidth * 0.485), (this.canvasHeight * 0.136 - (this.canvasHeight * 2)), (this.canvasWidth * 0.25), (this.canvasHeight * 0.775), '#4188E4'),
      2
    );
    this.elevator2.load(this.context);

    this.elevator3 = new Elevator(
      0, (0 - (this.canvasHeight * 3)), this.canvasWidth, this.canvasHeight, '../../assets/elevator/bg-3.png',
      new React((this.canvasWidth * 0.257), (this.canvasHeight * 0.136 - (this.canvasHeight * 3)), (this.canvasWidth * 0.25), (this.canvasHeight * 0.775), '#4188E4'),
      new React((this.canvasWidth * 0.485), (this.canvasHeight * 0.136 - (this.canvasHeight * 3)), (this.canvasWidth * 0.25), (this.canvasHeight * 0.775), '#4188E4'),
      3
    );
    this.elevator3.load(this.context);

  }

  draw(){
    this.elevator0.draw(this.context);
    this.elevator1.draw(this.context);
    this.elevator2.draw(this.context);
    this.elevator3.draw(this.context);
  }

  async updateFloor(floor: number){

    // Case stay in floor
    if(this.floor === 0 && floor === 0){
      this._runing.next(true);
      this.closeDoor(this.elevator0);
      await this.delay(1500).then(() => {this.openDoor(this.elevator0)});
      await this.delay(500).then(() => {this._runing.next(false)});
    }
    else if(this.floor === 1 && floor === 1){
      this._runing.next(true);
      this.closeDoor(this.elevator1);
      await this.delay(1500).then(() => {this.openDoor(this.elevator1)});
      await this.delay(500).then(() => {this._runing.next(false)});
    }
    else if(this.floor === 2 && floor === 2){
      this._runing.next(true);
      this.closeDoor(this.elevator2);
      await this.delay(1500).then(() => {this.openDoor(this.elevator2)});
      await this.delay(500).then(() => {this._runing.next(false)});
    }
    else if(this.floor === 3 && floor === 3){
      this._runing.next(true);
      this.closeDoor(this.elevator3);
      await this.delay(1500).then(() => {this.openDoor(this.elevator3)});
      await this.delay(500).then(() => {this._runing.next(false)});
    }

    // Case floor 0 to x
    else if(this.floor === 0 && floor === 1){
      this._runing.next(true);
      this.closeDoor(this.elevator0);
      this.updateInterval = setInterval(async () => {
        if(this.elevator1.y <= 0){
          this.moveUp();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 1;
          this._floor.next(1);
          this.automatoService.next('0A', '1A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator1)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
    else if(this.floor === 0 && floor === 2){
      this._runing.next(true);
      this.closeDoor(this.elevator0);
      this.updateInterval = setInterval(async () => {
        if(this.elevator2.y <= 0){
          if(this.elevator1.y == 0){
            this.floor = 1;
            this._floor.next(1);
            this.automatoService.next('0A', '1F');
          }
          this.moveUp();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 2;
          this._floor.next(2);
          this.automatoService.next('1F', '2A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator2)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
    else if(this.floor === 0 && floor === 3){
      this._runing.next(true);
      this.closeDoor(this.elevator0);
      this.updateInterval = setInterval(async () => {
        if(this.elevator3.y <= 0){
          if(this.elevator1.y == 0){
            this._floor.next(1);
            this.automatoService.next('0A', '1F');
          }
          if(this.elevator2.y == 0){
            this._floor.next(2);
            this.automatoService.next('1F', '2F');
          }
          this.moveUp();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 3;
          this._floor.next(3);
          this.automatoService.next('2F', '3A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator3)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }

    // Case floor 1 to x
    else if(this.floor === 1 && floor === 0){
      this._runing.next(true);
      this.closeDoor(this.elevator1);
      this.updateInterval = setInterval(async () => {
        if(this.elevator0.y >= 0){
          this.moveDown();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 0;
          this._floor.next(0);
          this.automatoService.next('1A', '0A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator0)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
    else if(this.floor === 1 && floor === 2){
      this._runing.next(true);
      this.closeDoor(this.elevator1);
      this.updateInterval = setInterval(async () => {
        if(this.elevator2.y <= 0){
          this.moveUp();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 2;
          this._floor.next(2);
          this.automatoService.next('1A', '2A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator2)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
    else if(this.floor === 1 && floor === 3){
      this._runing.next(true);
      this.closeDoor(this.elevator1);
      this.updateInterval = setInterval(async () => {
        if(this.elevator3.y <= 0){
          if(this.elevator2.y == 0){
            this._floor.next(2);
            this.automatoService.next('1A', '2F');
          }
          this.moveUp();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 0;
          this._floor.next(3);
          this.automatoService.next('2F', '3A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator3)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }

    // Case floor 2 to x
    else if(this.floor === 2 && floor === 0){
      this._runing.next(true);
      this.closeDoor(this.elevator2);
      this.updateInterval = setInterval(async () => {
        if(this.elevator0.y >= 0){
          if(this.elevator1.y == 0){
            this._floor.next(1);
            this.automatoService.next('2A', '1F');
          }
          this.moveDown();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 0;
          this._floor.next(0);
          this.automatoService.next('1F', '0A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator0)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
    else if(this.floor === 2 && floor === 1){
      this._runing.next(true);
      this.closeDoor(this.elevator2);
      this.updateInterval = setInterval(async () => {
        if(this.elevator1.y >= 0){
          this.moveDown();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 1;
          this._floor.next(1);
          this.automatoService.next('2A', '1A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator1)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
    else if(this.floor === 2 && floor === 3){
      this._runing.next(true);
      this.closeDoor(this.elevator2);
      this.updateInterval = setInterval(async () => {
        if(this.elevator3.y <= 0){
          this.moveUp();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 3;
          this._floor.next(3);
          this.automatoService.next('2A', '3A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator3)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }

    // Case floor 3 to x
    else if(this.floor === 3 && floor === 0){
      this._runing.next(true);
      this.closeDoor(this.elevator3);
      this.updateInterval = setInterval(async () => {
        if(this.elevator0.y >= 0){
          if(this.elevator2.y == 0){
            this._floor.next(2);
            this.automatoService.next('3A', '2F');
          }
          if(this.elevator1.y == 0){
            this._floor.next(1);
            this.automatoService.next('2F', '1F');
          }
          this.moveDown();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 0;
          this._floor.next(0);
          this.automatoService.next('1F', '0A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator0)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
    else if(this.floor === 3 && floor === 1){
      this._runing.next(true);
      this.closeDoor(this.elevator3);
      this.updateInterval = setInterval(async () => {
        if(this.elevator1.y >= 0){
          if(this.elevator2.y == 0){
            this._floor.next(2);
            this.automatoService.next('3A', '2F');
          }
          this.moveDown();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 1;
          this._floor.next(1);
          this.automatoService.next('2F', '1A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator1)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
    else if(this.floor === 3 && floor === 2){
      this._runing.next(true);
      this.closeDoor(this.elevator3);
      this.updateInterval = setInterval(async () => {
        if(this.elevator2.y >= 0){
          this.moveDown();
        }
        else{
          clearInterval(this.updateInterval);
          this.floor = 2;
          this._floor.next(2);
          this.automatoService.next('3A', '2A');
          await this.delay(1500).then(() => {this.openDoor(this.elevator2)});
          await this.delay(500).then(() => {this._runing.next(false)});
        }
      }, 5);
    }
  }

  moveUp(){
    this.elevator0.y++;
    this.elevator0.leftDoor.y++;
    this.elevator0.rightDoor.y++;

    this.elevator1.y++;
    this.elevator1.leftDoor.y++;
    this.elevator1.rightDoor.y++;

    this.elevator2.y++;
    this.elevator2.leftDoor.y++;
    this.elevator2.rightDoor.y++;

    this.elevator3.y++;
    this.elevator3.leftDoor.y++;
    this.elevator3.rightDoor.y++;
  }

  moveDown(){
    this.elevator0.y--;
    this.elevator0.leftDoor.y--;
    this.elevator0.rightDoor.y--;

    this.elevator1.y--;
    this.elevator1.leftDoor.y--;
    this.elevator1.rightDoor.y--;

    this.elevator2.y--;
    this.elevator2.leftDoor.y--;
    this.elevator2.rightDoor.y--;

    this.elevator3.y--;
    this.elevator3.leftDoor.y--;
    this.elevator3.rightDoor.y--;
  }

  openDoor(elevator: Elevator){

    this.openDoorInterval = setInterval(() => {
      if(elevator.leftDoor.w >= this.canvasWidth * 0.1 || elevator.rightDoor.x <= this.canvasWidth * 0.635) {
        if(elevator.leftDoor.x >= this.canvasHeight * 0.257){
          elevator.leftDoor.x--;
        }
        elevator.leftDoor.w--;
        if(elevator.rightDoor.x <= this.canvasWidth * 0.635){
          elevator.rightDoor.x++;
          elevator.rightDoor.w--;
        }
      }
      else{
        clearInterval(this.openDoorInterval);
      }
    }, 5);
  }

  closeDoor(elevator: Elevator){
    this.closeDoorInterval = setInterval(() => {
      if(elevator.leftDoor.x + elevator.leftDoor.w <= this.canvasWidth * 0.5 || elevator.rightDoor.x >= this.canvasWidth * 0.5) {
        elevator.leftDoor.w++;
        elevator.rightDoor.x--;
        elevator.rightDoor.w++;
      }
      else{
        clearInterval(this.closeDoorInterval);
      }
    }, 5);
  }

  clear(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  async delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

}


