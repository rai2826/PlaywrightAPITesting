// Load playwright Module

import {test,expect} from '@playwright/test'

//Write a test
test("First POST Api request using static body", async({request})=>{

    // Create a POST API request
    const postAPIresponse=await request.post("/booking",{

        data: {
            "firstname": "Gaurav",
            "lastname": "Rai",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
            "additionalneeds": "super bowls"
            }

        })
        
        //validate status code

        expect(postAPIresponse.ok()).toBeTruthy()
        expect(postAPIresponse.status()).toBe(200)

        // Get the response body 
       const postAPIResponseBody= await postAPIresponse.json()
       console.log(postAPIResponseBody)

       //validate JSON api response

       expect(postAPIResponseBody.booking).toHaveProperty("firstname","Gaurav")
       expect(postAPIResponseBody.booking).toHaveProperty("lastname","Rai")

       //Validate nested JSON objects
       expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")
    
    })





