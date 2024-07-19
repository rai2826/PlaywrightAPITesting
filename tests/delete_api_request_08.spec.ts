import {expect, test} from '@playwright/test'
import { request } from 'http'
import {body} from '../Test-Data/DynamicPostBody'
import tokenGenerator from '../Test-Data/tokenGenerator.json'


test("Delete API request after Post call",async({request})=>{


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

    const deleteapiresponse=await request.delete(`/booking/${bookingID}`,{
        headers:{
            "Content-Type":"application/json",
            "Cookie":`token=${token}`

        }
       
    })
    const deleteresponse=await deleteapiresponse.text()
    console.log("======================deleteAPI Response==================================================")
    console.log(deleteresponse)
    expect(deleteresponse).toBe("Created")

    const getAPIresponse= await request.get(`/booking/${bookingID}`)

   console.log("======================Get API after DELETE Response=========================================")
   //console.log(await getAPIresponse.json())
   expect(getAPIresponse.status()).toBe(404)
})