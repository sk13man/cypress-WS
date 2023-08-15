export const loginData = (
  apiKey: string,
  signature: string,
  timestamp: number
) => {
  return {
    d: {
      apiKey: apiKey,
      signature: signature,
      timestamp: timestamp
    },
    q: "exchange.market/createSession",
    sid: 1
  };
};
export const orderData = (
  side: string,
  quantity: number
) => {
  return {
    d: {
      orderType: "Limit",
      side: side,
      quantity: quantity,
      price: 100.33,
      instrument: "Ins1",
      mpOrderId: Date.now(),
      timeInForce: "GTC",
      userId: "UATUserTest1"
    },
    q: "v1/exchange.market/placeOrder",
    sid: 1
  };
};
export const reportData = {
  d: {
    trackingNumber: 0
  },
  q: "v1/exchange.market/executionReports",
  sid: 103
};
export const tradesData = {
  d: {
    trackingNumber: 0
  },
  q: "v1/exchange.market/trades",
  sid: 104
};
