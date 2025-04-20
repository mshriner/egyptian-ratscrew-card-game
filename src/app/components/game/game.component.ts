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
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { cloneDeep } from 'lodash';
import {
  DEAL_CARDS_2_PLAYERS,
  DEAL_CARDS_3_PLAYERS,
  DEAL_CARDS_4_PLAYERS,
  DEAL_CARDS_ANIMATION_STYLE,
  DealAnimationState,
} from '../../models/animations';
import { CardInfo } from '../../models/card';
import { CARD_BACK, CARDS, PLAYERS } from '../../models/constants';
import { GameState } from '../../models/game-state';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements AfterViewInit {
  public CARDS = CARDS;
  private gameAnimations: DealAnimationState[];

  vcr = inject(ViewContainerRef);

  animationCard = viewChild.required(CardComponent);
  public cardAnimation = signal<DealAnimationState>('hidden');
  private dealAnimationIndex = -1;
  private gamePhase = signal<GameState>(GameState.DEAL);

  public players: CardInfo[] = [];
  public cardsInPile: CardInfo[] = [];

  constructor() {
    this.players = cloneDeep(PLAYERS);
    this.gameAnimations = DEAL_CARDS_2_PLAYERS;
    effect(() => {
      if (this.gamePhase() === GameState.PLAY) {
        // this.cardAnimation.whichCard = CARD_BACK;
        // this.cardAnimation.hide = true;
      }
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.animationCard().whichCard = CARD_BACK;
      this.nextDeal();
    }, 3000);
  }

  public nextDeal(event?: AnimationEvent): void {
    if (event?.fromState === 'void') {
      return;
    }
    this.dealAnimationIndex++;
    if (this.dealAnimationIndex < this.gameAnimations.length) {
      this.cardAnimation.set(this.gameAnimations[this.dealAnimationIndex]);
    } else {
      this.gamePhase.set(GameState.PLAY);
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
