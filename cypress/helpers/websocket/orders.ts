import { socket } from "../socket";
import { orderData } from "./data";

export default class Orders {
  placeOrder(): Promise<{
    d: { orderId: string; orderStatus: string };
    q: string;
    sid: number;
  }> {
    const timestamp = Date.now();
    const body = orderData(timestamp);
    return new Promise((resolve, reject) => {
      socket.send(JSON.stringify(body));
      socket.on("data", function (message: string) {
        let parsed;
        try {
          parsed = JSON.parse(message);
        } catch (e) {
          reject(e);
        }
        if (parsed?.d?.orderId) {
          resolve(parsed);
        }
      });
    });
  }
}
