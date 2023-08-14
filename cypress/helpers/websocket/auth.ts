import sha256 from "crypto-js/hmac-sha256";
import { socket } from "../socket";
import { loginData } from "./data";

export default class Auth {
  private getSignature(
    apiKey: string,
    secret: string,
    timestamp: number
  ): string {
    return sha256(
      `"apiKey":"${apiKey}","timestamp":"${String(timestamp)}"`,
      secret
    ).toString();
  }

  login(apiKey: string, secret: string): Promise<object> {
    const timestamp = Date.now();
    const signature = this.getSignature(apiKey, secret, timestamp);
    const body = loginData(apiKey, signature, timestamp);

    return new Promise((resolve, reject) => {
      socket.send(JSON.stringify(body));
      socket.on("data", function (message: string) {
        if (JSON.parse(message)["sig"] === 1) {
          resolve(JSON.parse(message));
        }
      });
    });
  }
}
