import { socket } from "../socket";
import { orderData } from "../../data/wsData";

export default class Orders {
  place(
    side: string,
    quantity: number
  ): Promise<{ orderId: string; orderStatus: string }> {
    const body = orderData(side, quantity);
    return new Promise((resolve, reject) => {
      socket.send(JSON.stringify(body));
      socket.on("data", function(message: string) {
        let parsed = JSON.parse(message);
        if (parsed?.d?.orderId) {
          resolve(parsed.d);
        }
      });
    });
  }
}
