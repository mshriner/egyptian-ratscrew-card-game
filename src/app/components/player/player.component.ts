import { Component, input } from '@angular/core';
import { CardStack } from '../../models/card';
import { CardStackComponent } from '../card-stack/card-stack.component';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-player',
  imports: [CardStackComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  public player = input.required<CardStack>();
  public playerNumber = input.required<number>();

  public handAnimation(): void {}
  public handAnimationStart($event: AnimationEvent): void {}
  public handAnimationDone($event: AnimationEvent): void {}
}
