// import { reduce, takeUntil } from "rxjs/operators";
// import { timer } from "rxjs";
// import { StreamRequestOptions } from "@lensesio/cypress-websocket-testing";
//
// describe("Cypress works", () => {
//   it("open browser", () => {
//     cy.visit("https://github.com", { timeout: 30000 });
//     cy.url().then((url) => {
//       expect(url).to.equal("https://github.com/");
//     });
//   });
//   ///
//
//   it("use WS", () => {
//     const config = {
//       url: "ws://localhost:8080/",
//     };
//
//     let options: Partial<StreamRequestOptions<any>> = {}
//
//     cy.streamRequest(config, options).then((results?) => {
//       expect(results).to.not.be.undefined;
//     });
//     cy.stream(config).then((subject) => {
//       subject
//         .pipe(
//           takeUntil(timer(1000)),
//             reduce<any, any>((acc, val) => acc.concat([val]), []) // Provide type annotations here
//         )
//         .subscribe({
//           next: (results?) => {
//             expect(results).to.not.be.undefined;
//           },
//           error: (err: any) => {},
//         });
//     });
//   });
// });
