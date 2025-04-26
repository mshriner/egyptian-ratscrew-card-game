import { Component, computed, input } from '@angular/core';
import { CARD_BACK } from '../../models/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public whichCard = input(CARD_BACK);
  public faceUp = input(false);
  public xPercent = input.required({ transform: (value) => value ?? 50 });
  public yPercent = input.required({ transform: (value) => value ?? 50 });
  public zIndex = input(1);
  public angleDegrees = input.required({ transform: (value) => value ?? 0 });
  public hide = input<boolean | undefined>(false);
  public whichCardToShow = computed(() => {
    if (this.hide()) {
      return CARD_BACK;
    }
    return this.whichCard();
  });
}
