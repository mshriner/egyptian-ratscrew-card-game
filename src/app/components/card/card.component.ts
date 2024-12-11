import { Component, Input } from '@angular/core';
import { CARD_BACK } from '../../models/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input()
  public whichCard: string = CARD_BACK;
  @Input()
  public xPercent: number = 50;
  @Input()
  public yPercent: number = 50;
  @Input()
  public zIndex: number = 1;
  @Input()
  public angleDegrees: number = 0;
  @Input()
  public transitionMs: number = 0;
  @Input()
  public hide?: boolean;
}
