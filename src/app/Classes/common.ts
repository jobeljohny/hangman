import { Vals } from '../enums/config';

export function setPanelMsg(type: any, value: string): string {
  const gbuValue = gbu(value);
  const gbValue = gb(value);

  switch (type) {
    case Vals.CORRECT:
      return `${gbuValue} is a correct guess ${Vals.SMILE_EMOJI}`;
    case Vals.INCORRECT_MSG:
      return `${gbuValue} is an incorrect guess ${Vals.CONF_EMOJI}`;
    case Vals.ERRORLIST_MSG:
      return `${gbuValue} is already in the error list`;
    case Vals.WIN_MSG:
      return `You Won! ${Vals.SMILE_EMOJI} Yes, The Movie was ${gbValue}`;
    case Vals.LOST_MSG:
      return `You lost ${Vals.CONF_EMOJI}, The Movie was ${gbValue}`;
    default:
      return '';
  }
}

function gbu(text: string): string {
  return `<b>${text.toUpperCase()}</b>`;
}

function gb(text: string): string {
  return `<b>${text}</b>`;
}
