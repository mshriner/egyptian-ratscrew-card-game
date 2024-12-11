import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  createComponent,
  ElementRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CARD_BACK, CARDS, PLAYERS } from '../../models/constants';
import { CardComponent } from '../card/card.component';
import { CardInfo } from '../../models/card';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';
import {
  DEAL_CARDS,
  DEAL_CARDS_ANIMATION_STYLE,
  DealAnimationState,
} from '../../models/animations';

@Component({
  selector: 'app-game',
  imports: [NgOptimizedImage, CardComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  animations: [
    trigger('deal', [
      state(
        'centered',
        style({ position: 'absolute', top: '50%', left: '50%', zIndex: '3' })
      ),
      state('hidden', style({ display: 'none' })),
      state(
        'dealtToPlayer1',
        style({
          position: 'absolute',
          top: `${PLAYERS[1].yPercent}%`,
          left: `${PLAYERS[1].xPercent}%`,
          zIndex: '3',
        })
      ),
      state(
        'dealtToPlayer2',
        style({
          position: 'absolute',
          top: `${PLAYERS[2].yPercent}%`,
          left: `${PLAYERS[2].xPercent}%`,
          zIndex: '3',
        })
      ),
      state(
        'dealtToPlayer3',
        style({
          position: 'absolute',
          top: `${PLAYERS[3].yPercent}%`,
          left: `${PLAYERS[3].xPercent}%`,
          zIndex: '3',
        })
      ),
      state(
        'dealtToPlayer4',
        style({
          position: 'absolute',
          top: `${PLAYERS[4].yPercent}%`,
          left: `${PLAYERS[4].xPercent}%`,
          zIndex: '3',
        })
      ),
      transition('centered => dealtToPlayer1', [
        animate(DEAL_CARDS_ANIMATION_STYLE),
      ]),
      transition('centered => dealtToPlayer2', [
        animate(DEAL_CARDS_ANIMATION_STYLE),
      ]),
      transition('centered => dealtToPlayer3', [
        animate(DEAL_CARDS_ANIMATION_STYLE),
      ]),
      transition('centered => dealtToPlayer4', [
        animate(DEAL_CARDS_ANIMATION_STYLE),
      ]),
      transition('* => centered', [animate('0ms')]),
    ]),
  ],
})
export class GameComponent implements AfterViewInit {
  public CARDS = CARDS;

  vcr = inject(ViewContainerRef);

  @ViewChild('gameCanvas')
  gameCanvas!: ElementRef<HTMLDivElement>;

  @ViewChild('animationCard')
  animationCard!: CardComponent;
  public cardAnimation: DealAnimationState = 'hidden';
  private dealAnimationIndex = -1;

  public cardsOnScreen: CardInfo[] = [];

  constructor(private changeDetection: ChangeDetectorRef) {
    this.cardsOnScreen = JSON.parse(JSON.stringify(PLAYERS));
  }

  public ngAfterViewInit(): void {
    console.log(this.gameCanvas);
    setTimeout(() => {
      this.animationCard.whichCard = CARD_BACK;
      this.nextDeal();
    }, 3000);
  }

  public nextDeal(event?: AnimationEvent): void {
    if (event?.fromState === 'void') {
      return;
    }
    this.dealAnimationIndex++;
    if (this.dealAnimationIndex < DEAL_CARDS.length) {
      console.log('next');
      this.cardAnimation = DEAL_CARDS[this.dealAnimationIndex];
    } else {
      console.log('done');
    }
  }
}
