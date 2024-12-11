import { CardInfo } from './card';

export const APP_NAME = 'Egyptian Ratscrew';

export const APP_ROUTES = {
  GAME: 'game',
};

export const CARD_BACK = '_card_back';

export const CARDS = ['c', 'd', 'h', 's'].flatMap((suit) =>
  [...Array(10).keys(), 't', 'j', 'q', 'k']
    .slice(1) // remove 0
    .map((rank) => `${suit}${rank}`)
);

console.log(CARDS);

export const PLAYERS: CardInfo[] = [
  {
    // dummy card
    xPercent: 50,
    yPercent: 50,
    angleDegrees: 0,
    hidden: false, // keep this card hidden (after dealing) to make player indexes more intuitive,
    numberOfCards: 52,
  },
  {
    xPercent: 50,
    yPercent: 85,
    angleDegrees: 0,
    hidden: true, // Player 1 (you)
    numberOfCards: 0,
  },
  {
    xPercent: 10,
    yPercent: 50,
    angleDegrees: 0,
    hidden: true, // Player 2
    numberOfCards: 0,
  },
  {
    xPercent: 50,
    yPercent: 15,
    angleDegrees: 0,
    hidden: true, // Player 3
    numberOfCards: 0,
  },
  {
    xPercent: 90,
    yPercent: 50,
    angleDegrees: 0,
    hidden: true, // Player 4
    numberOfCards: 0,
  },
];
