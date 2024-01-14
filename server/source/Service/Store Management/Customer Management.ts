import { Response } from "../../helper/API Response" // Response Path: src/helper/API Response.ts
import { StatusCodes } from "outers" // Import Response Code

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
        CustomerID: int;
    }
}


/**
 * This function retrieves a list of customers from a database based on user ID and owner email.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and parameters.
 * @param {globe} res - The "res" parameter is the response object that will be sent back to the client
 * after the function is executed. It contains information such as the status code, status message, and
 * data that will be returned to the client.
 */
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
                StatusCode: StatusCodes.NOT_FOUND,
                Status: 'Not Found',
                Message: 'No customer found',
                Data: undefined,
            })
        }
        else{
            Response({
                res,
                StatusCode: StatusCodes.OK,
                Status: 'OK',
                Message: 'Customer list found',
                Data: CustomerList[0].Customers,
            })
        }
    }
    catch(err) {
        Response({
            res,
            StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Status: 'Internal Server Error',
            Message: 'Something went wrong while getting the customer list',
            Data: undefined,
        })
    }
}; // End of getCustomerList Function

export async function DeleteCustomer(req:Request, res: globe){
    try{
        const {User_idForParams, OwnerEmailForParams, CustomerID} = req.params; // Destructure the request body

        // shorted the email and user id
        const ShortedOwnerEmail:str = OwnerEmailForParams.toLowerCase(); // Lowercase the email

        // find the customer
        const StoreDetails : globe[] = await StoreManagementModel.find({$and: [{User_id:User_idForParams}, {Email: ShortedOwnerEmail}]}); // Finding the customer in the database
        if(StoreDetails.length !== 0){
            const FilteredCustomerList = StoreDetails[0].Customers.filter((customer:globe) => Number(customer.CustomerID) !== Number(CustomerID));
            await StoreManagementModel.updateOne({$and: [{User_id:User_idForParams}, {Email: ShortedOwnerEmail}]}, {Customers: FilteredCustomerList}); // Updating the customer in the database
            const ReFindData : globe[] = await StoreManagementModel.find({$and: [{User_id:User_idForParams}, {Email: ShortedOwnerEmail}]});
            Response({
                res,
                StatusCode: StatusCodes.OK,
                Status: 'OK',
                Message: 'Customer deleted successfully',
                Data: ReFindData[0].Customers
            }); // End of Response
        }
        else if(StoreDetails.length === 0){
            Response({
                res,
                StatusCode: StatusCodes.NOT_FOUND,
                Status: 'Not Found',
                Message: 'No Store found with this user id and email',
                Data: undefined,
            }); // End of Response
        }
    }
    catch{
        Response({
            res,
            StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Status: 'Internal Server Error',
            Message: 'Something went wrong while deleting the customer',
            Data: undefined,
        })
    }
}; // End of DeleteCustomer Function