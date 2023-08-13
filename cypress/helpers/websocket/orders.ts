import { WebSocketSubjectConfig } from "rxjs/webSocket";

const config: WebSocketSubjectConfig<any> = {
  url: "wss://sandbox-shared.staging.exberry-uat.io",
};
export default class Orders {
  placeOrder() {
    const options = {
      startUpMessage: {
        d: {
          orderType: "Limit",
          side: "Buy",
          quantity: 1.3,
          price: 100.33,
          instrument: "INS1",
          mpOrderId: 1001,
          timeInForce: "GTC",
          userId: "UATUserTest10",
        },
        q: "v1/exchange.market/placeOrder",
        sid: 1,
      },
    };
    cy.streamRequest(config, options).then((results) => {
      expect(results).to.not.be.undefined;
      console.log(results);
    });
  }
}
