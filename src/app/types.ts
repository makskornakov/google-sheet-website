export type StylesSheet = Record<'Background' | 'Main color' | 'Accent color', string>;
export type GlobalSheet = Record<'Title' | 'Subtitle' | 'Email' | 'Description' | 'Logo', string>;
export type SocialLink = Record<'Type' | 'Title' | 'Link', string>;

export type SomeKey = keyof SocialLink | keyof GlobalSheet | keyof StylesSheet;

export interface SocialSheet {
  Style: StylesSheet[];
  Global: GlobalSheet[];
  Links: SocialLink[];
}
