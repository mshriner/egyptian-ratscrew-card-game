import { Component, Input, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-stack',
  imports: [CardComponent],
  templateUrl: './card-stack.component.html',
  styleUrl: './card-stack.component.scss',
})
export class CardStackComponent {
  readonly MAX_NUMBER_OF_CARDS_IN_STACK = 11;
  readonly MAX_CARDS_ARR = [
    ...Array(this.MAX_NUMBER_OF_CARDS_IN_STACK).keys(),
  ].reverse();

  heightOfStack = signal<number>(0);

  readonly stackCardXOffsets = this.MAX_CARDS_ARR.map((value) => value * 0.05);
  readonly stackCardYOffsets = this.MAX_CARDS_ARR.map((value) => value * 0.25);

  @Input()
  set numberOfCards(newValue: number | undefined) {
    // const newHeight = 1 + Math.floor(((newValue || 0) - 1) / 5);
    // if (newHeight !== this.heightOfStack()) {
    //   this.heightOfStack.set(newHeight);
    // }
    const newHeight = +!!newValue;
    if (newHeight !== this.heightOfStack()) {
      this.heightOfStack.set(newHeight);
    }
  }
  @Input()
  xPercent: number = 50;
  @Input()
  yPercent: number = 50;
}
