import { State } from './../model/state.model';
import { AutomatoService } from './automato.service';
import { Button } from './../model/button.model';
import { Product } from './../model/product.model';
import { React } from './../model/react.model';
import { Note } from './../model/note.model';
import { ElementRef, Injectable } from '@angular/core';
import { Text } from '../model/text.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Automato } from '../model/automato.model';

@Injectable({
  providedIn: 'root'
})
export class CandyMachineService {

  context: CanvasRenderingContext2D;
  canvasWidth: number = 750;
  canvasHeight: number = 250;

  automato: Automato;

  // Notes
  noteOne: Note;
  noteTwo: Note;
  noteFive: Note;

  // Products
  candyBullet: Product;
  candyIceCream: Product;
  candyLollipop: Product;

  // Buttons
  resetButton: Button;
  okButton: Button;

  requestAnimationId;

  // Utils
  _totalInsert: BehaviorSubject<number> = new BehaviorSubject(null);
  _totalRequest: BehaviorSubject<number> = new BehaviorSubject(null);
  _transshipment: BehaviorSubject<number> = new BehaviorSubject(null);
  _info: BehaviorSubject<Array<string>> = new BehaviorSubject(new Array);

  totalInsert = 0;
  totalRequest = 0;
  itemSelected: number = 0;

  constructor(private automatoService: AutomatoService) { }

  init(context: CanvasRenderingContext2D, canvas: ElementRef<HTMLCanvasElement>, canvasWidth: number, canvasHeight: number, automato: Automato){
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.automato = automato;
    this.build();
    this.requestAnimationId = requestAnimationFrame(() => this.loop());
    this.onClick(canvas);
  }

  build(){
    const reactFull = new React(0, 0, this.context.canvas.width, this.context.canvas.height, '#404752');
    reactFull.drawFill(this.context, false);

    const reactNotes = new React((this.canvasWidth * 0.6), (this.canvasHeight * 0.05), 160, 230, '#646C78');
    reactNotes.drawFill(this.context, true);

    this.drawOkButton();

    this.noteOne = new Note((this.canvasWidth * 0.65), (this.canvasHeight * 0.08), 100, 50, 1, '../../assets/candy-machine/images/notas/1-real.jpg');
    this.noteOne.load(this.context);

    this.noteTwo = new Note((this.canvasWidth * 0.65), (this.canvasHeight * 0.2), 100, 50, 2, '../../assets/candy-machine/images/notas/2-reais.jpg');
    this.noteTwo.load(this.context);

    this.noteFive = new Note((this.canvasWidth * 0.65), (this.canvasHeight * 0.32), 100, 50, 5, '../../assets/candy-machine/images/notas/5-reais.jpg');
    this.noteFive.load(this.context);

    this.candyBullet = new Product(1, (this.canvasWidth * 0.14), (this.canvasHeight * 0.1), 80, 80, 6, '../../assets/candy-machine/images/produtos/candy-1.png', new Text('R$ 6,00', (this.canvasWidth * 0.23), (this.canvasHeight * 0.28), null, '16px', 'black'));
    this.candyBullet.load(this.context);

    this.candyIceCream = new Product(2, (this.canvasWidth * 0.14), (this.canvasHeight * 0.4), 80, 80, 7, '../../assets/candy-machine/images/produtos/candy-2.png', new Text('R$ 7,00', (this.canvasWidth * 0.23), (this.canvasHeight * 0.60), null, '16px', 'black'));
    this.candyIceCream.load(this.context);

    this.candyLollipop = new Product(3, (this.canvasWidth * 0.14), (this.canvasHeight * 0.73), 80, 80, 8, '../../assets/candy-machine/images/produtos/candy-3.png', new Text('R$ 8,00', (this.canvasWidth * 0.23), (this.canvasHeight * 0.91), null, '16px', 'black'));
    this.candyLollipop.load(this.context);

    this._info.next(['Estado Inicial q1', 'Clique em "OK" para iniciar!.']);
  }

  loop(){
    this.clear();
    this.draw();
    this.requestAnimationId = requestAnimationFrame(() => this.loop());
  }

  onClick(canvas: ElementRef<HTMLCanvasElement>){
    var el = canvas.nativeElement;
    el.addEventListener('click', event => {
      var state: State = this.automatoService.getActuallyState();
      var x = event.offsetX;
      var y = event.offsetY;

      // Click Notes
      if(x >= this.noteOne.x && (x <= this.noteOne.x + this.noteOne.w) && y >= this.noteOne.y && (y <= this.noteOne.y + this.noteOne.h)){
        if(state.content === 'q2'){
          this.automatoService.next('q2', 'q3');
          this._info.next(['Estado q3', 'Insira as notas desejadas.']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q3'){
          this.automatoService.next('q3', 'q4');
          this._info.next(['Estado q4', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q4'){
          this.automatoService.next('q4', 'q5');
          this._info.next(['Estado q5', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q5'){
          this.automatoService.next('q5', 'q6');
          this._info.next(['Estado q6', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q6'){
          this.automatoService.next('q6', 'q7');
          this._info.next(['Estado q7', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q7'){
          this.automatoService.next('q7', 'q8');
          this._info.next(['Estado q8', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q8'){
          this.automatoService.next('q8', 'q9');
          this._info.next(['Estado q9', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q9'){
          this.automatoService.next('q9', 'q10');
          this._info.next(['Estado q10', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q10'){
          this.automatoService.next('q10', 'q11');
          this._info.next(['Estado q11', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteOne.value;
        }
        else if (state.content === 'q11'){
          this.totalInsert += this.noteOne.value;
        }
      }

      if(x >= this.noteTwo.x && (x <= this.noteTwo.x + this.noteTwo.w) && y >= this.noteTwo.y && (y <= this.noteTwo.y + this.noteTwo.h)){
        if(state.content === 'q2'){
          this.automatoService.next('q2', 'q4');
          this._info.next(['Estado q4', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q3'){
          this.automatoService.next('q3', 'q5');
          this._info.next(['Estado q5', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q4'){
          this.automatoService.next('q4', 'q6');
          this._info.next(['Estado q6', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q5'){
          this.automatoService.next('q5', 'q7');
          this._info.next(['Estado q7', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q6'){
          this.automatoService.next('q6', 'q8');
          this._info.next(['Estado q8', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q7'){
          this.automatoService.next('q7', 'q9');
          this._info.next(['Estado q9', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q8'){
          this.automatoService.next('q8', 'q10');
          this._info.next(['Estado q10', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q9'){
          this.automatoService.next('q9', 'q11');
          this._info.next(['Estado q11', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q10'){
          this.automatoService.next('q10', 'q11');
          this.totalInsert += this.noteTwo.value;
        }
        else if (state.content === 'q11'){
          this.totalInsert += this.noteTwo.value;
        }

      }

      if(x >= this.noteFive.x && (x <= this.noteFive.x + this.noteFive.w) && y >= this.noteFive.y && (y <= this.noteFive.y + this.noteFive.h)){
        if(state.content === 'q2'){
          this.automatoService.next('q2', 'q7');
          this._info.next(['Estado q7', 'Valor insuficiente, insira mais notas!']);
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q3'){
          this.automatoService.next('q3', 'q8');
          this._info.next(['Estado q8', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q4'){
          this.automatoService.next('q4', 'q9');
          this._info.next(['Estado q9', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q5'){
          this.automatoService.next('q5', 'q10');
          this._info.next(['Estado q10', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q6'){
          this.automatoService.next('q6', 'q11');
          this._info.next(['Estado q11', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q7'){
          this.automatoService.next('q7', 'q11');
          this._info.next(['Estado q11', 'Você pode inserir mais notas ou selecionar o item disponível clicando em OK']);
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q8'){
          this.automatoService.next('q8', 'q11');
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q9'){
          this.automatoService.next('q9', 'q11');
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q10'){
          this.automatoService.next('q10', 'q11');
          this.totalInsert += this.noteFive.value;
        }
        else if(state.content === 'q11'){
          this.totalInsert += this.noteFive.value;
        }
      }

      // Click Candys
      if(this.itemSelected === 0){

        if(this.candyBullet.available && x >= this.candyBullet.x && (x <= this.candyBullet.x + this.candyBullet.w) && y >= this.candyBullet.y && (y <= this.candyBullet.y + this.candyBullet.h)){
          if(state.content === 'q8'){
            this._info.next([`Estado Final q8`, 'Item selecionado: Bala']);
          }
          else if(state.content === 'q9'){
            this.automatoService.next('q9', 'q11');
            this._info.next([`Estado Final q11`, 'Item selecionado: Bala']);
          }
          else if(state.content === 'q10'){
            this.automatoService.next('q10', 'q11');
            this._info.next([`Estado Final q11`, 'Item selecionado: Bala']);
          }
          else if(state.content === 'q11'){
            this._info.next([`Estado Final q11`, 'Item selecionado: Bala']);
          }
          this.itemSelected = this.candyBullet.id;
          this.totalRequest = this.candyBullet.value;
          this._transshipment.next(this.totalInsert - this.totalRequest);
        }

        if(this.candyIceCream.available && x >= this.candyIceCream.x && (x <= this.candyIceCream.x + this.candyIceCream.w) && y >= this.candyIceCream.y && (y <= this.candyIceCream.y + this.candyIceCream.h)){
          if(state.content === 'q9'){
            this._info.next([`Estado Final q9`, 'Item selecionado: Sorvete']);
          }
          else if(state.content === 'q10'){
            this.automatoService.next('q10', 'q11');
            this._info.next([`Estado Final q11`, 'Item selecionado: Sorvete']);
          }
          else if(state.content === 'q11'){
            this._info.next([`Estado Final q11`, 'Item selecionado: Sorvete']);
          }
          this.itemSelected = this.candyIceCream.id;
          this.totalRequest = this.candyIceCream.value;
          this._transshipment.next(this.totalInsert - this.totalRequest);
        }

        if(this.candyLollipop.available && x >= this.candyLollipop.x && (x <= this.candyLollipop.x + this.candyLollipop.w) && y >= this.candyLollipop.y && (y <= this.candyLollipop.y + this.candyLollipop.h)){
          if(state.content === 'q10'){
            this._info.next([`Estado Final q10`, 'Item selecionado: Pirulito']);
          }
          else if(state.content === 'q11'){
            this._info.next([`Estado Final q11`, 'Item selecionado: Pirulito']);
          }
          this.itemSelected = this.candyLollipop.id;
          this.totalRequest = this.candyLollipop.value;
          this._transshipment.next(this.totalInsert - this.totalRequest);
        }

        this._totalInsert.next(this.totalInsert);
        this._totalRequest.next(this.totalRequest);
      }


      // Click OK Button
      if(x >= this.okButton.react.x && (x <= this.okButton.react.x + this.okButton.react.w) && y >= this.okButton.react.y && (y <= this.okButton.react.y + this.okButton.react.h)){
        if(state.content === 'q1'){
          this.automatoService.next('q1', 'q2');
          this.redraw();
          this._info.next(['Estado q2', 'Insira as notas desejadas.']);
        }
        if(this.itemSelected === 0){
          if(state.content === 'q8' || state.content === 'q9' || state.content === 'q10' || state.content === 'q11'){
            this._info.next([`Estado Final ${state.content}`, 'Selecione o Produto!']);
          }
        }
      }

      this.redraw();

    });
  }

  draw() {
    const reactFull = new React(0, 0, this.context.canvas.width, this.context.canvas.height, '#404752');
    reactFull.drawFill(this.context, false);

    const reactNotes = new React((this.canvasWidth * 0.6), (this.canvasHeight * 0.05), 160, 230, '#646C78');
    reactNotes.drawFill(this.context, true);

    this.drawNotes();
    this.drawProducts();
    this.drawOkButton();
  }

  redraw(){
    this.clear();
    this.draw();
  }

  drawNotes(){
    this.noteOne.draw(this.context);
    this.noteTwo.draw(this.context);
    this.noteFive.draw(this.context);
  }

  drawProducts(){

    this.verifyAvailableProducts();

    // Bullet
    if(this.candyBullet.id != this.itemSelected){
      var reactBullet: React;
      if(!this.candyBullet.available) reactBullet = new React((this.canvasWidth * 0.08), (this.canvasHeight * 0.05), 150, 150, '#dff9fb');
      else reactBullet = new React((this.canvasWidth * 0.08), (this.canvasHeight * 0.05), 150, 150, '#2ecc71');
      reactBullet.drawFill(this.context, true);
      this.candyBullet.draw(this.context);
    }

    // Ice Cream
    if(this.candyIceCream.id != this.itemSelected){
      var reactIceCream: React;
      if(!this.candyIceCream.available) reactIceCream = new React((this.canvasWidth * 0.08), (this.canvasHeight * 0.36), 150, 150, '#dff9fb');
      else reactIceCream = new React((this.canvasWidth * 0.08), (this.canvasHeight * 0.36), 150, 150, '#2ecc71');
      reactIceCream.drawFill(this.context, true);
      this.candyIceCream.draw(this.context);
    }

    // Lollipop
    if(this.candyLollipop.id != this.itemSelected){
      var reactLollipop: React;
      if(!this.candyLollipop.available) reactLollipop = new React((this.canvasWidth * 0.08), (this.canvasHeight * 0.67), 150, 150, '#dff9fb');
      else reactLollipop = new React((this.canvasWidth * 0.08), (this.canvasHeight * 0.67), 150, 150, '#2ecc71');
      reactLollipop.drawFill(this.context, true);
      this.candyLollipop.draw(this.context);
    }
  }

  drawOkButton(){
    this.okButton = new Button(new React((this.canvasWidth * 0.60), (this.canvasHeight * 0.9), 170, 40, 'white'), new Text('Ok', (this.canvasWidth * 0.77), (this.canvasHeight * 0.945), null, '18px', 'black'));
    this.okButton.draw(this.context);
  }

  clear(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  verifyAvailableProducts(){
    if(this._totalInsert.getValue() == 6 && this.candyBullet.available != true){
      this.candyBullet.available = true;
    }
    if(this._totalInsert.getValue() == 7 && this.candyIceCream.available != true){
      this.candyBullet.available = true;
      this.candyIceCream.available = true;
    }
    if(this._totalInsert.getValue() >= 8 && this.candyLollipop.available != true){
      this.candyBullet.available = true;
      this.candyIceCream.available = true;
      this.candyLollipop.available = true;
    }
  }


}
