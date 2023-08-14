import Chance from "chance";
const chance = new Chance()
export const calendarData = {
    tradingDays: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
    ],
    name: "name " +  chance.guid()
    ,
    timeZone: "+00:00",
    marketOpen: "08:00",
    marketClose: "16:30",
    holidays: [
        {
            date: "2022-01-01",
            closeTime: "13:00",
            name: "New Year"
        }
    ]
};
export const createInstrumentsData = (calendarId: string) => {
    return {
        symbol: "Test" + chance.integer({ min: 100000, max: 999999 }),
        quoteCurrency: "USD",
        calendarId: calendarId,
        pricePrecision: "6",
        quantityPrecision: "4",
        minQuantity: "0.0001",
        maxQuantity: "10000000",
        activityStatus: "ACTIVE",
        description: "Testing instrument"
    };
};
export const mpData = {
    "name":  chance.name(),
    "compId":  chance.string({ length: 10 })
}
export const mpApiKeyData = {
    "label": "label1",
    "permissions": ["market-service:market:order_book_depth",
        "market-service:market:order_book_state",
        "market-service:market:place_order",
        "market-service:market:cancel_order",
        "market-service:market:modify_order",
        "market-service:market:replace_order",
        "market-service:market:mass_cancel",
        "market-service:market:execution_reports",
        "market-service:market:mass_order_status",
        "market-service:market:trades",
        "reporting:mp:orders",
        "reporting:mp:trades"
    ],
    "cancelOnDisconnect": false
}
