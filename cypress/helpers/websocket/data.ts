export const loginData = (
  apiKey: string,
  signature: string,
  timestamp: number
) => {
  return {
    d: {
      apiKey: apiKey,
      signature: signature,
      timestamp: timestamp,
    },
    q: "exchange.market/createSession",
    sid: 1,
  };
};
export const orderData = (timestamp: number) => {
  return {
    d: {
      orderType: "Limit",
      side: "Buy",
      quantity: 1.3,
      price: 100.33,
      instrument: "INS1",
      mpOrderId: timestamp,
      timeInForce: "GTC",
      userId: "UATUserTest1",
    },
    q: "v1/exchange.market/placeOrder",
    sid: 1,
  };
};
