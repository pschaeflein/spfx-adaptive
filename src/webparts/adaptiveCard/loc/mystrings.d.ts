declare interface IAdaptiveCardWebPartStrings {
  PropertyPaneDescription: string;
  CardSourceGroupName: string;
  CardSourceFieldLabel: string;
  DisplayPropertiesGroupLabel: string;
  TitleFieldLabel: string;
  DisplayModeFieldLabel: string;
  DisplayModeToggleLabelDark: string;
  DisplayModeToggleLabelLight: string;
}

declare module 'AdaptiveCardWebPartStrings' {
  const strings: IAdaptiveCardWebPartStrings;
  export = strings;
}
