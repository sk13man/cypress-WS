## demo work

## Dear colleagues!

According to spec.feature - I should receive 4 messages from execution report - 2 MessageType: "Add" and 2
MessageType: "Executed". But I have 1 "Add" and 3 "Executed".
I have re-checked manually a lot of times - but still have the same result
Actually it is demo work - so it is just for demonstrating my skills (I can finish if you show me how to do it manually)

Also, I've spent a lot of time in attempting to use cypress plugin https://github.com/lensesio/cypress-websocket-testing
It looks very outdated and seems that it can only listen to ws and send only one message on connect - so I've chosen a
different one

The task was actually very interesting - so I'm looking forward to hear response from you!

Best wishes!

### install dependencies

npm install

### to run tests with Cypress UI

npm run cy:open

### to run tests in headless

npm run cy:open

# Requirement

Implement an automational test based on the scenario from https://github.com/dmitriyslaym/qa-test/blob/main/spec.feature
with the help of Cypress tool (https://www.cypress.io).
The result should be provided in a git repository with two commands available:

- run in debug mode (when Cypress opens the browser)
- run in headless mode (suitable for running in CI)

# Guidelines

## Admin part

In order to create the resources for trading you should use admin functionality of the system within REST API.

Origin:
https://admin-api-shared.staging.exberry-uat.io

### Authorization

Credentials:

```
{
  "email": "qacandidate@gmail.com",
  "password": "p#xazQI!Y%z^L34a#"
}
```

Use Get Token route (https://documenter.getpostman.com/view/6229811/TzCV3jcq#9e78837d-11af-4f2e-8e11-35275b86acc1) and
then include the received JWT token in the "Authorization" header of each request to a protected route (make sure that
the value of this header always starts with "Bearer " and then the token).

### Create Calendar

Use Create Calendar protected
route (https://documenter.getpostman.com/view/6229811/TzCV3jcq#6f1b40e0-f805-4898-af1a-ecb06dd83f0c).

### Create Instrument

Use Create Instrument protected
route (https://documenter.getpostman.com/view/6229811/TzCV3jcq#30c1cfb0-4620-40a8-96c6-ba459a8f5887).
In **calendarId** value use the id of a calendar that you created in the previous step.

### Create MP

Use Create MP protected
route (https://documenter.getpostman.com/view/6229811/TzCV3jcq#9dcaa8cd-c893-4469-b908-f752c56176f0).

### Create APIKey for MP

Use Create APiKey protected
route (https://documenter.getpostman.com/view/6229811/TzCV3jcq#12e42f32-7258-4e6d-bf78-447e8cf8471d).
In **mpId** value in URL (instead of _2087505413_ from the docs) use the **id** of an MP that you created in the
previous step.

## Exchange GW (Trading) part

WS GW is available with the following DNS:

**wss://sandbox-shared.staging.exberry-uat.io**

You can use Sandbox application with the list of methods that you will need in this scenario - there you can send
requests and see all the responses.
https://sandbox.exberry.io/?url=https://raw.githubusercontent.com/dmitriyslaym/qa-test/main/exchange-gw-sandbox-data.json

### Attention!

In the implementation of the test you should NOT open Sandbox application and execute the steps from that UI app.
Sandbox is provided for you only for a manual usage to get more familiar with the API.
In the test implementation for Exchange GW you should use directly WebSocket (some external npm package, that simplifies
the usage of WS is allowed), not execute the steps from Sandbox app.

### Create session

Take apiKey and secret values from the APIKey, that you generated for MP before.

#### Sandbox application (to see the example of request)

- In "Message Builder" section put the APIKey and Secret values of the APIKey that you have just generated.
- In "Message Builder" section in Timestamp input click on "Refresh" icon.
- In "Message Builder" section click on "Build" button.
- Notice, that the content of JSON block in the middle was updated. Click on "Send" button there. If everything is
  successfull, from now on you can use any endpoints from the list while having the current WS connection opened.

#### In automational test

Establish a WS connection with Exchange GW.
You can use any kind of external package, that simplifies working with WS. We recommend to use this one:
https://github.com/lensesio/cypress-websocket-testing
(command "stream").
Make sure that through the whole test you use only one WS connection and don't accidentally open multiple ones.

Generate required data for the request:

```
import sha256 from "crypto-js/hmac-sha256";

const apiKey = 'your-api-key';
const secret = 'your secret-from-api-key';
const signature = sha256(`"apiKey":"${apiKey}","timestamp":"${String(Date.now())}"`, secret).toString()
```

Within currently opened WS connection send the request to "createSession" endpoint.

### Place order

#### Sandbox application (to see the example of request)

Select "placeOrder" method within TRADING API section on the left corner. In JSON block use the required values of the
props in the "d", click "Send".

#### In automational test

Within currently opened WS connection send the request to "placeOrder" endpoint.

### Execution reports and Trades

#### Sandbox application (to see the example of request)

Select those methods within PRIVATE DATA API section on the left corner. No need to change anything in JSON block, just
click "Send".

#### In automational test

Within currently opened WS connection send the request to "executionReports" and "trades" endpoints.

## General recommendations

Please notice again, that in the test implementation you should NOT use Sandbox application, use WS directly (so it will
be API testing, not UI testing).

We recommend firstly to try to implement all the required steps in the test and make sure that it properly executs the
logic. If after that you still have some time left - try to build reusable commands for working with Admin REST API and
Exchange WS GW (since this logic will be required in a lot of tests in the system).

Don't hesitate to ask questions/clarifications if you stuck. Good questions will not reduce your chances during the
evaluation, but the lack of understanding and the lack of interest actually will.

Good luck!
