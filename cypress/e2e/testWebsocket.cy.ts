import Auth from "../helpers/websocket/auth";
import { createMpApiKey, setupEntities } from "../helpers/http/token";
import Orders from "../helpers/websocket/orders";
import Reports from "../helpers/websocket/reports";
import { closeSocket, isSocketAlive } from "../helpers/socket";

const auth = new Auth();
const orders = new Orders();
const report = new Reports();
let apiKeyData: { apiKey: any; secret: any; mpId: string };

describe("Demo test suite", () => {
  before(async () => {
    await setupEntities();
    apiKeyData = await createMpApiKey();
    await auth.login(apiKeyData.apiKey, apiKeyData.secret);
  });
  after(async () => {
    if (isSocketAlive()) {
      await closeSocket();
    }
  });

  it("Place 2 orders  for buy and sell side", async () => {
    const buyOrder = await orders.place("Buy", 76.55);
    expect(buyOrder.orderId).to.be.an("number");
    expect(buyOrder.orderStatus).to.eq("Pending");
    const sellOrder = await orders.place("Sell", 77.55);
    expect(sellOrder.orderId).to.be.an("number");
    expect(sellOrder.orderStatus).to.eq("Pending");
  });

  it(
    "Run execution reports and check received data",
    {
      defaultCommandTimeout: 40000
    },
    async () => {
      const reports = await report.exec();
      expect(reports.length).to.eq(4);
      // here we can test any report data - I just made a few examples
      reports.forEach(report => {
        expect(report["d"]).to.haveOwnProperty("mpOrderId");
        expect(report["d"]).to.haveOwnProperty("userId", "UATUserTest1");
      });
      const sellFiltered = reports.filter(report => report["d"].side == "Sell");
      expect(sellFiltered.length).to.eq(2);
    }
  );

  it("Can get trades ", {
    defaultCommandTimeout: 40000
  }, async () => {
    const trades = await report.trades();
    // here we have a lot of data that can be checked in any way
    trades.forEach(trade => {
      expect(trade["d"]).to.haveOwnProperty("actionType", "MatchedTrade");
      expect(trade["d"].trackingNumber).to.be.an("number");
    });
  });
});
