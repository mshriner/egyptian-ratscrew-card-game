const makeRepeated = <T>(arr: Array<T>, repeats: number) =>
  Array.from({ length: repeats }, () => arr).flat();

export type DealAnimationState =
  | 'hidden'
  | 'void'
  | 'centered'
  | 'dealtToPlayer1'
  | 'dealtToPlayer2'
  | 'dealtToPlayer3'
  | 'dealtToPlayer4'
  | 'flipPlayer1'
  | 'flipPlayer2'
  | 'flipPlayer3'
  | 'flipPlayer4';

export const DEAL_CARDS_ANIMATION_STYLE = '50ms ease-out';
export const PLAYER_FLIP_ANUMATION_STYLE = '400ms ease-out';

export const DEAL_CARDS_2_PLAYERS: DealAnimationState[] = [
  ...makeRepeated<DealAnimationState>(
    ['centered', 'dealtToPlayer1', 'centered', 'dealtToPlayer3'],
    26,
  ),
  'hidden',
];

export const DEAL_CARDS_3_PLAYERS: DealAnimationState[] = [
  ...makeRepeated<DealAnimationState>(
    [
      'centered',
      'dealtToPlayer1',
      'centered',
      'dealtToPlayer2',
      'centered',
      'dealtToPlayer3',
    ],
    17,
  ),
  'centered',
  'dealtToPlayer1',
  'hidden',
];

export const DEAL_CARDS_4_PLAYERS: DealAnimationState[] = [
  ...makeRepeated<DealAnimationState>(
    [
      'centered',
      'dealtToPlayer1',
      'centered',
      'dealtToPlayer2',
      'centered',
      'dealtToPlayer3',
      'centered',
      'dealtToPlayer4',
    ],
    13,
  ),
  'hidden',
];

export type HandAnimationState =
  | 'slap'
  | 'atPlayer1'
  | 'atPlayer2'
  | 'atPlayer3'
  | 'atPlayer4';
