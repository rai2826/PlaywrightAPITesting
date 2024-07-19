import {expect, test} from '@playwright/test'
import { request } from 'http'
import {body} from '../Test-Data/DynamicPostBody'
import tokenGenerator from '../Test-Data/tokenGenerator.json'
import patchRequestBody from '../Test-Data/patchRequestBody.json'

test("put API request using Query Params after Post call",async({request})=>{


    const apiresponse=await request.post("/booking",{

        data: body
        
    })

    const apiresponsebody=await apiresponse.json()
    const bookingID=await apiresponsebody.bookingid
    console.log(bookingID)
    console.log("======================POST API Response===============================================")
    console.log(apiresponsebody)
    expect(apiresponse.status()).toBe(200)

    const tokenresponse= await request.post("/auth",{
        data: tokenGenerator
    })
    const tokenresponsebody=(await tokenresponse.json())
    const token=tokenresponsebody.token
    console.log("======================token Generated to be used in next PUT call======================")
    console.log(token)

    const patchapiresponse=await request.patch(`/booking/${bookingID}`,{
        headers:{
            "Content-Type":"application/json",
            "Cookie":`token=${token}`

        },
        data:patchRequestBody
    })
    const patchapiresponsebody=await patchapiresponse.json()
    console.log("======================patchAPI Response==================================================")
    console.log(patchapiresponsebody)

    const getAPIresponse= await request.get(`/booking/${bookingID}`)

   console.log("======================Get API after PATCH Response=========================================")
   console.log(await getAPIresponse.json())
   expect(getAPIresponse.status()).toBe(200)
})