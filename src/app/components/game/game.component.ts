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
export class GameComponent implements AfterViewInit {
  public CARDS = CARDS;
  private gameAnimations: DealAnimationState[];

  vcr = inject(ViewContainerRef);

  public cardAnimation = signal<DealAnimationState>('hidden');
  public animationCard = signal<PlayingCard>({
    whichCard: CARD_BACK,
    xPercent: 50,
    yPercent: 50,
    angleDegrees: 0,
  });
  private dealAnimationIndex = -1;
  private gamePhase = signal<GameState>(GameState.DEAL);
  private playerTurn = signal<number>(0);
  private slaps = signal<number[]>([]);

  public players: CardStack[] = [];
  public cardsInPileBottomToTop: PlayingCard[] = [];

  @HostListener('window:keydown.ArrowUp', ['$event'])
  handleUpArrowKey(event: KeyboardEvent) {
    if (
      this.gamePhase() === GameState.PLAY &&
      this.playerTurn() === 1 &&
      this.slaps().length === 0 &&
      this.players[1].cards.length > 0 &&
      this.cardAnimation() === 'hidden'
    ) {
      this.animationCard.update((prev) => {
        return { ...prev, hide: false };
      });
      this.cardAnimation.set('flipPlayer1');
    }
  }

  @HostListener('window:keydown.space', ['$event'])
  handleSpaceKey(event: KeyboardEvent) {
    if (this.gamePhase() === GameState.PLAY) {
      this.slaps.update((prev) => {
        if (!prev.includes(1)) {
          prev.push(1);
        }
        return cloneDeep(prev);
      });
      this.cardAnimation.set('flipPlayer1');
    }
  }

  constructor() {
    this.players = cloneDeep(PLAYERS);
    this.gameAnimations = DEAL_CARDS_4_PLAYERS;
    effect(() => {
      if (this.gamePhase() === GameState.PLAY) {
        this.playerTurn.set(1);
        // this.cardAnimation.whichCard = CARD_BACK;
        // this.cardAnimation.hide = true;
      }
    });
    // effect(() => {
    //   switch (this.playerTurn()) {
    //     case 0:
    //       break;
    //     case 1:
    //       this.cardAnimation.set('dealtToPlayer1');
    //       break;
    //     case 2:
    //       this.cardAnimation.set('dealtToPlayer2');
    //       break;
    //     case 3:
    //       this.cardAnimation.set('dealtToPlayer3');
    //       break;
    //     case 4:
    //       this.cardAnimation.set('dealtToPlayer4');
    //       break;
    //   }
    // });
  }

  public ngAfterViewInit(): void {
    this.players[0].cards = this.shuffleDeck();
    setTimeout(() => {
      this.animationCard.update((prev) => {
        return { ...prev, whichCard: CARD_BACK };
      });
      this.cardAnimationDone();
    }, 500);
  }

  private shuffleDeck(): PlayingCard[] {
    return [...this.CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return {
          whichCard: card,
          xPercent: 50,
          yPercent: 50,
          angleDegrees: 0,
        };
      });
  }

  public cardAnimationStart(event: AnimationEvent): void {
    if (event?.fromState === 'void') {
      return;
    }
    switch (this.gamePhase()) {
      case GameState.DEAL: {
        if (event?.toState?.includes('Player')) {
          this.animationCard.update((prev) => {
            return {
              ...prev,
              whichCard: this.players[0].cards.pop()?.whichCard!,
            };
          });
        }
        break;
      }
    }
  }

  public cardAnimationDone(event?: AnimationEvent): void {
    if (event?.fromState === 'void') {
      return;
    }
    switch (this.gamePhase()) {
      case GameState.DEAL: {
        this.dealAnimationIndex++;
        if (this.dealAnimationIndex < this.gameAnimations.length) {
          this.cardAnimation.set(this.gameAnimations[this.dealAnimationIndex]);
        } else {
          this.gamePhase.set(GameState.PLAY);
        }
        if (event?.toState?.includes('Player1')) {
          this.players[1].cards.push(this.animationCard());
        } else if (event?.toState?.includes('Player2')) {
          this.players[2].cards.push(this.animationCard());
        } else if (event?.toState?.includes('Player3')) {
          this.players[3].cards.push(this.animationCard());
        } else if (event?.toState?.includes('Player4')) {
          this.players[4].cards.push(this.animationCard());
        }
        break;
      }
      // else if (event?.fromState?.includes('centered')) {
      // }

      case GameState.PLAY: {
        if (event?.toState?.includes('Player')) {
          this.cardAnimation.set('centered');
        } else if (event?.fromState?.includes('Player')) {
          let poppedCard: PlayingCard;
          if (event?.fromState?.includes('Player1')) {
            poppedCard = this.players[1].cards.pop()!;
          } else if (event?.fromState?.includes('Player2')) {
            poppedCard = this.players[2].cards.pop()!;
          } else if (event?.fromState?.includes('Player3')) {
            poppedCard = this.players[3].cards.pop()!;
          } else if (event?.fromState?.includes('Player4')) {
            poppedCard = this.players[4].cards.pop()!;
          } else {
            throw new Error('Invalid player turn');
          }

          poppedCard.angleDegrees = Math.floor(Math.random() * 360);
          poppedCard.xPercent = Math.floor(50 + (Math.random() - 0.5) * 4);
          poppedCard.yPercent = Math.floor(50 + (Math.random() - 0.5) * 4);
          this.cardsInPileBottomToTop.push(poppedCard);
          this.animationCard.update((prev) => {
            return { ...prev, hide: true };
          });
          this.cardAnimation.set('hidden');
        }
        break;
      }
    }
  }
}
