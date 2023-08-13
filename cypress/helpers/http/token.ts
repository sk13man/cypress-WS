import axios from "axios";
import {
  calendarData,
  createInstrumentsData,
  mpApiKeyData,
  mpData,
} from "../data";

const adminApiBaseUrl = "https://admin-api-shared.staging.exberry-uat.io";
const email = "qacandidate@gmail.com";
const password = "p#xazQI!Y%z^L34a#";
let token;

async function httpPost(url: string, body: object) {
  return await axios.post(url, body, {
    headers: getHeaders(await getToken()),
  });
}
async function getToken(): Promise<string> {
  if (token) {
    return token;
  }
  const response = await axios.post(`${adminApiBaseUrl}/api/auth/token`, {
    email,
    password,
  });

  if (response.status === 200 && typeof response.data.token === "string") {
    token = response.data.token;
    return response.data.token;
  } else {
    throw new Error("Failed to get token");
  }
}

function getHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

 async function createCalendar(): Promise<string> {
  const response = await httpPost(
    `${adminApiBaseUrl}/api/v2/calendars`,
    calendarData
  );
  return response.data.id;
}
 async function createInstrument(): Promise<object> {
  const calendarId = await createCalendar();
  const response = await httpPost(
    `${adminApiBaseUrl}/api/v2/instruments`,
    createInstrumentsData(calendarId)
  );
  return response.data;
}
export async function setupEntities() {
  await createInstrument()
}
async function createMp(): Promise<string> {
  const response = await httpPost(`${adminApiBaseUrl}/api/mps`, mpData);
  return response.data.id;
}
export async function createMpApiKey(): Promise<{
  mpId: string;
  secret: string;
  apiKey: string;
}> {
  const mp = await createMp();
  const response = await httpPost(
    `${adminApiBaseUrl}/api/mps/${mp}/api-keys`,
    mpApiKeyData
  );
  return {
    mpId: response.data.mpId,
    secret: response.data.secret,
    apiKey: response.data.apiKey,
  };
}
