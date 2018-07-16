import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { HttpClient } from '@microsoft/sp-http';

import * as strings from 'AdaptiveCardWebPartStrings';
import { IAdaptiveCardWebPartComponentProps } from './components/IAdaptiveCardWebPartComponentProps';
import { AdaptiveCardWebPartComponent } from './components/AdaptiveCardWebPartComponent';


export interface IAdaptiveCardWebPartProps {
  title: string;
  displayModeDark: boolean;
  cardSourceUrl: string;
}

export default class AdaptiveCardWebPart extends BaseClientSideWebPart<IAdaptiveCardWebPartProps> {

  public render(): void {
    let ctx = this.context;
    let props: IAdaptiveCardWebPartComponentProps = {
      title: this.properties.title,
      displayModeDark: this.properties.displayModeDark,
      cardSourceUrl: this.properties.cardSourceUrl
    };

    const element: React.ReactElement<IAdaptiveCardWebPartComponentProps> = React.createElement(
      AdaptiveCardWebPartComponent,
      props
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
