import { HttpClient, HttpClientConfiguration, HttpClientResponse } from '@microsoft/sp-http';

export interface ICardService {
  getData(endpoint: string): Promise<object>;
}

export class CardService implements ICardService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getData(endpoint: string): Promise<object> {
    return new Promise<Array<object>>((resolve, reject) => {
      this.httpClient.get(endpoint, HttpClient.configurations.v1)
        .then((response: HttpClientResponse) => {
          if (response.ok) {
            response.json()
              .then((data: any) => {
                resolve(data);
              })
              .catch((error) => { reject(error); }
              );
          }
        })
        .catch((error) => { reject(error); }
        );
    });
  }
}