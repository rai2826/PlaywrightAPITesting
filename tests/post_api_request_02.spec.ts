import {expect, test} from '@playwright/test'
import { request } from 'http'
import postRequestBody from './../Test-Data/postRequestBody.json'

test("Post request using json file body", async({request})=>{

    const postAPIresponse=await request.post("/booking",{

        data: postRequestBody
    })

    const postAPIresponsebody=await postAPIresponse.json()
    console.log(postAPIresponsebody)

    expect(postAPIresponsebody.booking).toHaveProperty("firstname","Gaurav")
   // expect(postAPIresponsebody.booking.firstname).toHaveProperty("booking.firstname","Gaurav")

})