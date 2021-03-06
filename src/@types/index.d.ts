declare module "*.jpg" {
  const content: string;
  export default content;
}

type Mode = 'light' | 'dark';

declare module "*.png" {
  const content: string;
  export default content;
}

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown' | undefined;

interface ItemProps {
  item: any;
  navigation: any;
}

interface IDaySelectionAnimationBorder {
  type: "border";
  duration: number;
  borderWidth: number;
  borderHighlightColor: string;
  animType: any;
  animUpdateType: any;
  animProperty: any;
  animSpringDamping: any;
}

interface IDaySelectionAnimationBackground {
  type: "background";
  duration: number;
  highlightColor: string;
  animType: any;
  animUpdateType: any;
  animProperty: any;
  animSpringDamping: any;
}


type TDaySelectionAnimation =
  | IDaySelectionAnimationBorder
  | IDaySelectionAnimationBackground;