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
  HostListener,
  inject,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { cloneDeep } from 'lodash';
import {
  DEAL_CARDS_4_PLAYERS,
  DEAL_CARDS_ANIMATION_STYLE,
  DealAnimationState,
  PLAYER_FLIP_ANUMATION_STYLE,
} from '../../models/animations';
import { CardStack, PlayingCard } from '../../models/card';
import { CARD_BACK, CARDS, PLAYERS } from '../../models/constants';
import { GameState } from '../../models/game-state';
import { CardComponent } from '../card/card.component';
import { PlayerComponent } from '../player/player.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  imports: [NgOptimizedImage, CardComponent, CommonModule, PlayerComponent],
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
      state(
        'flipPlayer1',
        style({
          position: 'absolute',
          top: `${PLAYERS[1].yPercent}%`,
          left: `${PLAYERS[1].xPercent}%`,
          zIndex: '3',
        })
      ),
      state(
        'flipPlayer2',
        style({
          position: 'absolute',
          top: `${PLAYERS[2].yPercent}%`,
          left: `${PLAYERS[2].xPercent}%`,
          zIndex: '3',
        })
      ),
      state(
        'flipPlayer3',
        style({
          position: 'absolute',
          top: `${PLAYERS[3].yPercent}%`,
          left: `${PLAYERS[3].xPercent}%`,
          zIndex: '3',
        })
      ),
      state(
        'flipPlayer4',
        style({
          position: 'absolute',
          top: `${PLAYERS[4].yPercent}%`,
          left: `${PLAYERS[4].xPercent}%`,
          zIndex: '3',
        })
      ),
      transition('flipPlayer1 => centered', [
        animate(PLAYER_FLIP_ANUMATION_STYLE),
      ]),
      transition('flipPlayer2 => centered', [
        animate(PLAYER_FLIP_ANUMATION_STYLE),
      ]),
      transition('flipPlayer3 => centered', [
        animate(PLAYER_FLIP_ANUMATION_STYLE),
      ]),
      transition('flipPlayer4 => centered', [
        animate(PLAYER_FLIP_ANUMATION_STYLE),
      ]),
      transition(`centered => dealtToPlayer1`, [
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
export class GameComponent {

  constructor(public gameService: GameService) {
  }

}
