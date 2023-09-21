export type ColorSheet = Record<'Background' | 'Main color' | 'Accent color', string>;
export type FontSheet = Record<'Heading url' | 'Heading name' | 'Body url' | 'Body name', string>;
export type LayoutSheet = Record<'Global alignment' | 'Animated', string>;

export type GlobalSheet = Record<'Title' | 'Subtitle' | 'Email' | 'Description' | 'Logo', string>;
export type SocialLink = Record<'Type' | 'Title' | 'Link', string>;

export type SomeKey = keyof (ColorSheet & FontSheet & LayoutSheet & GlobalSheet & SocialLink);

export interface SocialSheet {
  Colors: ColorSheet[];
  Fonts: FontSheet[];
  Layout: LayoutSheet[];
  Global: GlobalSheet[];
  Links: SocialLink[];
}
