import { ICardService, CardService } from './CardService';
import { HttpClient, HttpClientConfiguration, HttpClientResponse } from '@microsoft/sp-http';

export class AdaptiveCardSampleService extends CardService {
  private sampleUrl: string = "https://adaptivecardsampleservice.azurewebsites.net/api/samples/FlightItinerary";

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async getData(endpoint: string): Promise<object> {
    return await super.getData(this.sampleUrl);
  }
}