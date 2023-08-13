import sha256 from "crypto-js/hmac-sha256";
import { WebSocketSubjectConfig } from "rxjs/webSocket";

const config: WebSocketSubjectConfig<any> = {
  url: "wss://sandbox-shared.staging.exberry-uat.io",
};

export default class Auth {
  private getSignature(
    apiKey: string,
    secret: string,
    timestamp: number
  ): string {
    return sha256(
      `"apiKey":"${apiKey}","timestamp":"${String(timestamp)}"`,
      secret
    ).toString();
  }

  login(apiKey: string, secret: string) {
    const timestamp = Date.now();
    const signature = this.getSignature(apiKey, secret, timestamp);

    const options = {
      startUpMessage: {
        d: {
          apiKey: apiKey,
          signature: signature,
          timestamp: timestamp,
        },
        q: "exchange.market/createSession",
        sid: 1,
      },
    };

    cy.streamRequest(config, options).then((results) => {
      expect(results).to.not.be.undefined;
      console.log(results);
    });
  }
}
