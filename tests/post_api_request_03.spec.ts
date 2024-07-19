import {expect, test} from '@playwright/test'
import { request } from 'http'
import {body} from './../Test-Data/DynamicPostBody'

test("post using dynamic request body",async({request})=>{


    const apiresponse=await request.post("/booking",{

        data: body
        
    })

    const apiresponsebody=await apiresponse.json()
    const bookingID=await apiresponsebody.bookingid
    console.log(bookingID)
    console.log("======================POST API Response===============================================")
    console.log(apiresponsebody)
    expect(apiresponse.status()).toBe(200)
})