import { AnimationEvent } from '@angular/animations';
import { Component, effect, input, OnInit, signal } from '@angular/core';
import { HandAnimationState } from '../../models/animations';
import { CardStack } from '../../models/card';
import { GameState } from '../../models/game-state';
import { GameService } from '../../services/game.service';
import { CardStackComponent } from '../card-stack/card-stack.component';

@Component({
  selector: 'app-player',
  imports: [CardStackComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  animations: [],
})
export class PlayerComponent implements OnInit {
  public player = input.required<CardStack>();
  public playerNumber = input.required<number>();
  public handAnimation = signal<HandAnimationState | null>(null);
  private isUser = false;

  constructor(private readonly gameService: GameService) {
    effect(() => {
      if (!this.isUser && gameService.playerTurn() === this.playerNumber()) {
        // play your turn
      }
    });
  }

  ngOnInit(): void {
    this.handAnimation.set(
      `atPlayer${this.playerNumber()}` as HandAnimationState,
    );
    if (this.playerNumber() === 1) {
      this.isUser = true;
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
          this.handleUpArrowKey();
        }
        if (event.key === ' ') {
          this.handleSpaceKey(event);
        }
      });
    }
  }

  private handleUpArrowKey(): void {
    if (
      this.gameService.gamePhase() === GameState.PLAY &&
      this.gameService.playerTurn() === 1 &&
      this.gameService.slaps().length === 0 &&
      this.gameService.players[1].cards.length > 0 &&
      this.gameService.cardAnimation() === 'hidden'
    ) {
      this.gameService.animationCard.update((prev) => {
        return { ...prev, invisible: false };
      });
      this.gameService.cardAnimation.set('flipPlayer1');
    }
  }

  private handleSpaceKey(event: KeyboardEvent): void {
    if (this.gameService.gamePhase() === GameState.PLAY) {
    }
  }
  public handAnimationStart($event: AnimationEvent): void {}
  public handAnimationDone($event: AnimationEvent): void {}
}
