import Auth from "../helpers/websocket/auth";
import { createMpApiKey, setupEntities } from "../helpers/http/token";
import Orders from "../helpers/websocket/orders";

const auth = new Auth();
const orders = new Orders();
let apiKeyData: { apiKey: any; secret: any; mpId: string };

describe("Demo test suite", () => {
  before(async () => {
    await setupEntities();
    apiKeyData = await createMpApiKey();
  });

  it("Can create session", async () => {
    const loginData = await auth.login(apiKeyData.apiKey, apiKeyData.secret);
    expect(loginData).to.haveOwnProperty("sig", 1);
  });

  it("Place Order request returns orderId and orderStatus", async () => {
    const orderData = await orders.placeOrder();
    expect(orderData.d.orderId).to.be.an("number");
    expect(orderData.d).to.haveOwnProperty("orderStatus", "Pending");
  });
});
