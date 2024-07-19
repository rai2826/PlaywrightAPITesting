import {expect, test} from '@playwright/test'
import { request } from 'http'
import {body} from '../Test-Data/DynamicPostBody'
import tokenGenerator from './../Test-Data/tokenGenerator.json'
import putRequestBody from './../Test-Data/putRequestBody.json'

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

    const putapiresponse=await request.put(`/booking/${bookingID}`,{
        headers:{
            "Content-Type":"application/json",
            "Cookie":`token=${token}`

        },
        data:putRequestBody
    })
    const putapiresponsebody=await putapiresponse.json()
    console.log("======================putAPI Response==================================================")
    console.log(putapiresponsebody)

    const getAPIresponse= await request.get(`/booking/${bookingID}`)

   console.log("======================Get API after PUT Response=========================================")
   console.log(await getAPIresponse.json())
   expect(getAPIresponse.status()).toBe(200)
})