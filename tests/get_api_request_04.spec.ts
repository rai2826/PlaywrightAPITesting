import {expect, test} from '@playwright/test'
import { request } from 'http'
import {body} from '../Test-Data/DynamicPostBody'

test("Get API request  after Post ",async({request})=>{


    const apiresponse=await request.post("/booking",{

        data: body
        
    })

    const apiresponsebody=await apiresponse.json()
    const bookingID=await apiresponsebody.bookingid
    console.log(bookingID)
    console.log("======================POST API Response===============================================")
    console.log(apiresponsebody)
    expect(apiresponse.status()).toBe(200)

   const getAPIresponse= await request.get(`/booking/${bookingID}`)

   console.log("======================Get API Response=================================================")
   console.log(await getAPIresponse.json())
   expect(getAPIresponse.status()).toBe(200)
})