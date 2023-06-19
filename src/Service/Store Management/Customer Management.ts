import { Response } from "../../helper/API Response" // Response Path: src/helper/API Response.ts
import { ResponseCode } from "../../config/App Config/General Config" // Import Response Code

// import Data Models
import { StoreManagementModel } from "../../Models" // Path: Database/Model/Store Management Model.ts

// global types
type str = string
type int = number
type globe = any

// interfaces
type Request = {
    params: {
        User_idForParams: int;
        OwnerEmailForParams: str;
    }
}


export async function getCustomerList(req:Request, res: globe) {
    try{
        const {User_idForParams, OwnerEmailForParams} = req.params; // Destructure the request body

        // Shorted the email and user id
        const ShortedOwnerEmail:str = OwnerEmailForParams.toLowerCase(); // Lowercase the email

        // gather the customer list
        const CustomerList:globe[] = await StoreManagementModel.find({$and: [{User_id:User_idForParams}, {Email: ShortedOwnerEmail}]}); // Finding the employee in the database
        if(CustomerList[0].Customers.length === 0){
            Response({
                res,
                StatusCode: ResponseCode.Not_Found,
                Status: 'Not Found',
                Message: 'No customer found',
                Data: undefined,
            })
        }
        else{
            Response({
                res,
                StatusCode: ResponseCode.OK,
                Status: 'OK',
                Message: 'Customer list found',
                Data: CustomerList[0].Customers,
            })
        }
    }
    catch(err) {
        Response({
            res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Internal Server Error',
            Message: 'Something went wrong while getting the customer list',
            Data: undefined,
        })
    }
}