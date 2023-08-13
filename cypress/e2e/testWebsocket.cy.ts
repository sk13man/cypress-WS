import Auth from "../helpers/websocket/auth";
import { createMpApiKey, setupEntities } from "../helpers/http/token";
import Orders from "../helpers/websocket/orders";

const auth = new Auth();
const orders = new Orders();
let apiKeyData: { apiKey: any; secret: any; mpId?: string };

describe("Demo test suite", () => {
  before(async () => {
    await setupEntities();
    apiKeyData = await createMpApiKey();
  });

  it("Connect WS", () => {
    auth.login(apiKeyData.apiKey, apiKeyData.secret);
    orders.placeOrder();
  });
});
