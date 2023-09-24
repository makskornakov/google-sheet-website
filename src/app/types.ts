export type ColorSheet = Record<'Background' | 'Main color' | 'Accent color', string>;
export type FontSheet = Record<'Heading url' | 'Heading name' | 'Body url' | 'Body name', string>;
export type LayoutSheet = Record<'Global alignment' | 'Animated' | 'Display credentials', string>;

export type GlobalSheet = Record<'Title' | 'Subtitle' | 'Email' | 'Description' | 'Logo', string>;
export type SocialLink = Record<'Type' | 'Title' | 'Link', string>;
export type AllSheet = ColorSheet & FontSheet & LayoutSheet & GlobalSheet & SocialLink;
export type SomeKey = keyof AllSheet;

export interface SocialSheet {
  Colors: ColorSheet[];
  Fonts: FontSheet[];
  Layout: LayoutSheet[];
  Global: GlobalSheet[];
  Links: SocialLink[];
}
