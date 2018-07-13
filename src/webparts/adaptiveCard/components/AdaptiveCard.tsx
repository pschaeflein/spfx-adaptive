import * as React from 'react';
import * as AdaptiveCards from 'adaptivecards';
import styles from './AdaptiveCard.module.scss';
import { ThemeExample } from './ThemeExampleData';

export interface IAdaptiveCardProps {
  displayModeDark: boolean;
  cardData: object;
}

export class AdaptiveCard extends React.Component<IAdaptiveCardProps> {

  constructor(props: IAdaptiveCardProps) {
    super(props);
  }

  public render(): React.ReactElement<IAdaptiveCardProps> {

    let containerStyle: string = (this.props.displayModeDark) ? styles.containerDark : styles.containerLight;
    let rowStyle: string = (this.props.displayModeDark) ? styles.rowDark : styles.rowLight;
    let cardStyleSet: AdaptiveCards.ContainerStyleSet = null;

    var theme = (window as any).__themeState__.theme || ThemeExample;
    cardStyleSet = (this.props.displayModeDark) ? this.createDarkStyleSet(theme) : this.createLightStyleSet(theme);

    let card: string = "[Card data not provided.]";
    if (this.props.cardData) {
      card = this.renderAdaptiveCard(this.props.cardData, cardStyleSet);
    }

    return (
      <div className={containerStyle}>
        <div className={rowStyle}>
          <div className={styles.column}>

            <div dangerouslySetInnerHTML={{
              __html: card
            }}>
            </div>

          </div>
        </div>
      </div>
    );
  }

  private createDarkStyleSet(theme: any): AdaptiveCards.ContainerStyleSet {
    var s: AdaptiveCards.ContainerStyleSet = new AdaptiveCards.ContainerStyleSet({
      default: {
        backgroundColor: theme.themePrimary,
        foregroundColors: {
          default: {
            default: theme.neutralLighter,
            subtle: theme.neutralLight
          },
          dark: {
            default: theme.themePrimary,
            subtle: theme.themeTertiary
          },
          light: {
            default: theme.white,
            subtle: theme.neutralLight
          },
          accent: {
            default: theme.themeAccent,
            subtle: theme.themeAccentTranslucent10
          },
          good: {
            default: theme.greenDark,
            subtle: theme.greenLight
          },
          warning: {
            default: theme.yellow,
            subtle: theme.yellowLight
          },
          attention: {
            default: theme.redDark,
            subtle: theme.red
          }
        }
      }
    });
    return s;
  }

  private createLightStyleSet(theme: any): AdaptiveCards.ContainerStyleSet {
    var s: AdaptiveCards.ContainerStyleSet = new AdaptiveCards.ContainerStyleSet({
      default: {
        foregroundColors: {
          default: {
            default: theme.neutralPrimary,
            subtle: theme.neutralSecondary
          },
          dark: {
            default: theme.black,
            subtle: theme.neutralSecondary
          },
          light: {
            default: theme.white,
            subtle: theme.neutralLight
          },
          accent: {
            default: theme.themePrimary,
            subtle: theme.themeTertiary
          },
          good: {
            default: theme.greenDark,
            subtle: theme.greenLight
          },
          warning: {
            default: theme.yellow,
            subtle: theme.yellowLight
          },
          attention: {
            default: theme.red,
            subtle: theme.red
          }
        }
      }
    });
    return s;
  }

  private renderAdaptiveCard(card: any, cardStyleSet: AdaptiveCards.ContainerStyleSet) {
    // Create an AdaptiveCard instance
    var adaptiveCard = new AdaptiveCards.AdaptiveCard();

    // Set its hostConfig property unless you want to use the default Host Config
    // Host Config defines the style and behavior of a card
    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: "Segoe UI, Helvetica Neue, sans-serif",
      containerStyles: cardStyleSet
    });

    // Parse the card payload
    adaptiveCard.parse(card);

    // Render the card to an HTML element:
    var renderedCard = adaptiveCard.render();
    return renderedCard.innerHTML;
  }
}
