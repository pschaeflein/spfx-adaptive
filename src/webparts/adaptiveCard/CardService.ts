import { HttpClient, HttpClientConfiguration, HttpClientResponse } from '@microsoft/sp-http';

export interface ICardService {
  getData(endpoint: string): Promise<object>;
}

export class CardService implements ICardService {

  public async getData(endpoint: string): Promise<object> {
    return new Promise<Array<object>>((resolve, reject) => {
      fetch(endpoint)
        .then((response: Response) => {
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