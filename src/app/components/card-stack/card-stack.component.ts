import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
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

  heightOfStack = signal<number>(0);

  readonly stackCardXOffsets = this.MAX_CARDS_ARR.map((value) => value * 0.075);
  readonly stackCardYOffsets = this.MAX_CARDS_ARR.map((value) => value * 0.25);

  constructor() // private changeDetection: ChangeDetectorRef
  {}

  @Input()
  set numberOfCards(newValue: number | undefined) {
    const newHeight =
      1 + Math.floor(((newValue || 0) - 1) / this.CARDS_PER_RENDERED_CARD);
    if (newHeight !== this.heightOfStack()) {
      this.heightOfStack.set(newHeight);
    }
    // this.changeDetection.detectChanges();
  }

  @Input()
  xPercent: number = 50;
  @Input()
  yPercent: number = 50;
}
