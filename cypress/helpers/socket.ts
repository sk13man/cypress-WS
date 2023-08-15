import Socket from "simple-websocket";

export const socket = new Socket({
  url: "wss://sandbox-shared.staging.exberry-uat.io",
  objectMode: true,
});

export function closeSocket() {
  return new Promise((resolve, reject) => {
    socket.on("close", () => {
      resolve(true);
    });
    try {
      socket.destroy();
    } catch (e) {
      reject(e);
    }
  });
}

export function isSocketAlive() {
  try {
    socket.send("ping");
  } catch (err) {
    return false;
  }
  return true;
}
