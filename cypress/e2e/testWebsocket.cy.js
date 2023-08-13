import { createMpApiKey, setupEntities } from "../helpers/token";
let apiKeyData;

describe("Demo test suite", () => {
  before(async () => {
    await setupEntities();
    apiKeyData = await createMpApiKey();
  });

  it("Connect WS", () => {
    cy.log(apiKeyData.secret);
  });
});
