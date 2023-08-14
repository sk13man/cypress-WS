import Socket from "simple-websocket";

export const socket = new Socket({
  url: "wss://sandbox-shared.staging.exberry-uat.io",
  objectMode: true,
});
