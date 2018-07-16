import * as React from 'react';

import { IAdaptiveCardWebPartComponentProps } from './IAdaptiveCardWebPartComponentProps';
import { AdaptiveCard } from './AdaptiveCard';
import styles from './AdaptiveCard.module.scss';
import { ICardService, CardService } from '../CardService';
import { AdaptiveCardSampleService } from '../AdaptiveCardSampleService';


export interface IAdaptiveCardWebPartComponentState {
  cardData?: object;
}

export class AdaptiveCardWebPartComponent extends React.Component<IAdaptiveCardWebPartComponentProps, IAdaptiveCardWebPartComponentState> {
  private cardService: ICardService;

  constructor(props: IAdaptiveCardWebPartComponentProps) {
    super(props);

    if (props.cardSourceUrl) {
      this.cardService = new CardService();
    } else {
      this.cardService = new AdaptiveCardSampleService();
    }

    this.state = {
      cardData: null
    };
  }

  public componentDidMount(): void {
    this.getData(this.props.cardSourceUrl);
  }

  public componentWillReceiveProps(nextProps: IAdaptiveCardWebPartComponentProps) {
    if ( nextProps.cardSourceUrl !== this.props.cardSourceUrl){
      this.getData(nextProps.cardSourceUrl);
    }
  }

  private getData(dataUrl: string) {
    this.cardService.getData(dataUrl)
      .then(
        (data) => this.setState({ ...this.state, cardData: data })
      )
      .catch(
        // ToDo: logging, cause likely CORS error or requested from non-HTTPS
        (error) => this.setState({ ...this.state, cardData: error.message })
      );
  }

  public render(): React.ReactElement<IAdaptiveCardWebPartComponentProps> {
    return (
      <div className={ styles.adaptiveCard }>
        <div className={ styles.webPartTitle }>
          <span>{this.props.title}</span>
        </div>
        <AdaptiveCard displayModeDark={this.props.displayModeDark}
                    cardData={this.state.cardData} />
      </div>
    );
  }

}
