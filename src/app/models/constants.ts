import { CardStack } from './card';

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

export const PLAYERS: CardStack[] = [
  {
    // dummy card / starting deck
    // keep this card hidden (after dealing) to make player indexes more intuitive,
    xPercent: 50,
    yPercent: 50,
    cards: [],
  },
  {
    xPercent: 50,
    yPercent: 85,
    cards: [], // Player 1 (you)
  },
  {
    xPercent: 10,
    yPercent: 50,
    cards: [], // Player 2
  },
  {
    xPercent: 50,
    yPercent: 15,
    cards: [], // Player 3 (or 2 in 2 player game)
  },
  {
    xPercent: 90,
    yPercent: 50,
    cards: [], // Player 4
  },
];
