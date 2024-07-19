import { faker } from "@faker-js/faker"


export const body={
    "firstname": faker.person.firstName(),
    "lastname": faker.person.lastName(),
    "totalprice": faker.number.int(1000),
    "depositpaid": faker.datatype.boolean(),
    "bookingdates": {
        "checkin": faker.date.between({from:"2020-07-02",to:"2020-07-05"}),
        "checkout": faker.date.between({from:"2020-07-06",to:"2020-07-18"}),
    },
    "additionalneeds": faker.string.fromCharacters('abc',10)

}