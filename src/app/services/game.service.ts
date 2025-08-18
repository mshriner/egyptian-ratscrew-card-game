import { AnimationEvent } from '@angular/animations';
import { computed, effect, Injectable, signal } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DEAL_CARDS_4_PLAYERS, DealAnimationState } from '../models/animations';
import { CardStack, PlayingCard } from '../models/card';
import { CARD_BACK, CARDS, PLAYERS } from '../models/constants';
import { GameState, SlappableState } from '../models/game-state';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public CARDS = CARDS;
  private gameAnimations: DealAnimationState[];
  private dealAnimationIndex = -1;

  public readonly cardAnimation = signal<DealAnimationState>('hidden');
  public readonly animationCard = signal<PlayingCard>({
    whichCard: CARD_BACK,
    xPercent: 50,
    yPercent: 50,
    angleDegrees: 0,
  });
  public readonly gamePhase = signal<GameState>(GameState.DEAL);
  public readonly playerTurn = signal<number>(0);
  public readonly slaps = signal<number[]>([]);
  public readonly isPileSlappable = computed<SlappableState>(() => {
    const state: SlappableState = {
      doubles: false,
      sandwich: false,
    };
    if (
      this.gamePhase() !== GameState.PLAY ||
      !this.playerTurn() ||
      !this.animationCard()
    ) {
      return state;
    }
    const stack = this.cardsInPileBottomToTop;
    if (
      stack.length > 1 &&
      stack.at(-1)!.whichCard[1] == stack.at(-2)!.whichCard[1]
    ) {
      state.doubles = true;
    }
    if (
      stack.length > 2 &&
      stack.at(-1)!.whichCard[1] == stack.at(-3)!.whichCard[1]
    ) {
      state.sandwich = true;
    }
    return state;
  });

  public players: CardStack[] = [];
  public cardsInPileBottomToTop: PlayingCard[] = [];

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

    this.players[0].cards = this.shuffleDeck();
    setTimeout(() => {
      this.animationCard.update((prev) => {
        return { ...prev, whichCard: CARD_BACK };
      });
      this.cardAnimationDone();
    }, 500);
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
    // }); }
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
