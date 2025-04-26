export interface CardStack {
  xPercent: number;
  yPercent: number;
  cards: PlayingCard[];
}

export interface PlayingCard {
  xPercent: number;
  yPercent: number;
  angleDegrees: number;
  faceUp?: boolean;
  hide?: boolean;
  whichCard: string;
}
