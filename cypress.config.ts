import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  fixturesFolder: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotsFolder: "cypress/reports/screenshots",
  screenshotOnRunFailure: true,

  e2e: {
    setupNodeEvents(on, config) {},
  },
});
