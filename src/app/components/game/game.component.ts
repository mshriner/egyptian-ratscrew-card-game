import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  DEAL_CARDS_4_PLAYERS,
  DEAL_CARDS_ANIMATION_STYLE,
  DealAnimationState,
} from '../../models/animations';
import { CardInfo } from '../../models/card';
import { CARD_BACK, CARDS, PLAYERS } from '../../models/constants';
import { CardStackComponent } from '../card-stack/card-stack.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-game',
  imports: [NgOptimizedImage, CardComponent, CommonModule, CardStackComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  animations: [
    trigger('cardMove', [
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

  public players: CardInfo[] = [];
  public cardsInPile: CardInfo[] = [];

  constructor(private changeDetection: ChangeDetectorRef) {
    this.players = JSON.parse(JSON.stringify(PLAYERS));
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
    if (this.dealAnimationIndex < DEAL_CARDS_4_PLAYERS.length) {
      console.log('next');
      this.cardAnimation = DEAL_CARDS_4_PLAYERS[this.dealAnimationIndex];
    } else {
      console.log('done');
    }
    if (event?.fromState?.includes('Player1')) {
      this.players[1].numberOfCards++;
    } else if (event?.fromState?.includes('Player2')) {
      this.players[2].numberOfCards++;
    } else if (event?.fromState?.includes('Player3')) {
      this.players[3].numberOfCards++;
    } else if (event?.fromState?.includes('Player4')) {
      this.players[4].numberOfCards++;
    } else if (event?.fromState?.includes('centered')) {
      this.players[0].numberOfCards--;
    }
  }
}
