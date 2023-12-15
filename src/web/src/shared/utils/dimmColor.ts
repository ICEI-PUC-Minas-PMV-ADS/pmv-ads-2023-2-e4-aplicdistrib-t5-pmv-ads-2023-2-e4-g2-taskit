import { readableColor, darken, lighten } from 'polished';


export function dimmColor(color: string) {
  const isLight = readableColor(color) === '#000';
  if (isLight) {
    return darken(0.5, color);
  }
  return lighten(0.4, color);
}
