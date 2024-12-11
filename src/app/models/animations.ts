const makeRepeated = <T>(arr: Array<T>, repeats: number) =>
  Array.from({ length: repeats }, () => arr).flat();

export type DealAnimationState =
  | 'hidden'
  | 'void'
  | 'centered'
  | 'dealtToPlayer1'
  | 'dealtToPlayer2'
  | 'dealtToPlayer3'
  | 'dealtToPlayer4';

export const DEAL_CARDS_ANIMATION_STYLE = '300ms ease-out';

export const DEAL_CARDS: DealAnimationState[] = makeRepeated(
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
  13
);
