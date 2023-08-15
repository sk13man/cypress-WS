import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 5000,
  video: false,
  fixturesFolder: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotsFolder: "cypress/reports/screenshots",
  screenshotOnRunFailure: false,

  e2e: {
    setupNodeEvents(on, config) {},
  },
});
