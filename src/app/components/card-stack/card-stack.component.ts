import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-stack',
  imports: [CardComponent],
  templateUrl: './card-stack.component.html',
  styleUrl: './card-stack.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStackComponent {
  readonly CARDS_PER_RENDERED_CARD = 4;
  readonly MAX_NUMBER_OF_CARDS_IN_STACK = Math.ceil(
    52 / this.CARDS_PER_RENDERED_CARD
  );
  readonly MAX_CARDS_ARR = [
    ...Array(this.MAX_NUMBER_OF_CARDS_IN_STACK).keys(),
  ].reverse();

  heightOfStack = computed<number>(() => {
    return (
      1 +
      Math.floor(
        ((this.numberOfCards() || 0) - 1) / this.CARDS_PER_RENDERED_CARD
      )
    );
  });

  readonly stackCardXOffsets = this.MAX_CARDS_ARR.map((value) => value * 0.075);
  readonly stackCardYOffsets = this.MAX_CARDS_ARR.map((value) => value * 0.25);

  constructor() {}

  public numberOfCards = input<number>();
  public xPercent = input(50);
  public yPercent = input(50);
}
