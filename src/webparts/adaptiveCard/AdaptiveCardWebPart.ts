import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'AdaptiveCardWebPartStrings';
import { AdaptiveCardWebPartComponent, IAdaptiveCardWebPartComponentProps } from './components/AdaptiveCardWebPartComponent';


export interface IAdaptiveCardWebPartProps {
  title: string;
  displayModeDark: boolean;
  cardSourceUrl: string;
}

export default class AdaptiveCardWebPart extends BaseClientSideWebPart<IAdaptiveCardWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IAdaptiveCardWebPartProps> = React.createElement(
      AdaptiveCardWebPartComponent,
      {
        title: this.properties.title,
        displayModeDark: this.properties.displayModeDark,
        httpClient: this.context.httpClient,
        cardSourceUrl: this.properties.cardSourceUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.CardSourceGroupName,
              groupFields: [
                PropertyPaneTextField('cardSourceUrl', {
                  label: strings.CardSourceFieldLabel
                }),
              ]
            },
            {
              groupName: strings.DisplayPropertiesGroupLabel,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneToggle('displayModeDark', {
                  label: strings.DisplayModeFieldLabel,
                  offText: strings.DisplayModeToggleLabelLight,
                  onText: strings.DisplayModeToggleLabelDark
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
