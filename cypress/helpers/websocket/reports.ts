import { socket } from "../socket";
import { reportData, tradesData } from "../../data/wsData";

export default class Reports {
  exec(): Promise<object[]> {
    const body = reportData;
    return new Promise((resolve, reject) => {
      socket.send(JSON.stringify(body));
      let messagesArr: object[] = [];
      socket.on("data", function(message: any) {
        messagesArr.push(JSON.parse(message));
        if (messagesArr.length === 4) {
          resolve(messagesArr);
        }
      });
    });
  }

  trades(): Promise<object[]> {
    const body = tradesData;
    return new Promise((resolve, reject) => {
      socket.send(JSON.stringify(body));
      let messagesArr: object[] = [];
      socket.on("data", function(message: string) {
        messagesArr.push(JSON.parse(message));

        if (messagesArr.length === 2) {
          resolve(messagesArr);
        }
      });
    });
  }
}
