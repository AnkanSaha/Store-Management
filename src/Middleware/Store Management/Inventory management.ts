/* The code is importing two models, `ClientAccountModel` and `StoreManagementModel`, from the
`../../Models/index` file path. It is also importing a custom response called `Failed_Response` from
the `../../helper/API Response` file path. These imports are necessary for the code to use the
models and custom response in the current file. */
// import all models
import { ClientAccountModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts
// EmployeeEmail

// import Custom Response
import { Failed_Response } from '../../helper/API Response'; // Response Path: src/helper/API Response.ts

// interace for Add Inventory
interface AddInventoryInterface{
    OwnerEmail: string,
    User_id: number,
    ProductName: string,
    ProductCategory: string,
    ProductSKU: string,
    ProductQuantity: number,
    ProductPrice: number,
    ProductExpiryDate: string,
    ProductManufacturingDate: string,
    ProductDescription: string
}

/**
 * This TypeScript function is a middleware for inventory management that checks if a given account
 * exists in the database and passes control to the next middleware if it does.
 * @param {any} req - The request object that contains information about the HTTP request made by the
 * client.
 * @param {any} res - The "res" parameter is the response object that is used to send the response back
 * to the client.
 * @param {any} next - next is a function that is called to move to the next middleware function in the
 * chain. It is used to pass control to the next middleware function.
 */
export async function AddInventoryMiddleware (req:any, res:any, next:any){
    try{
        const {User_id, OwnerEmail} :AddInventoryInterface = req.body;
        let ShortedOwnerEmail:string = OwnerEmail.toLowerCase(); // Lowercase the email

        let AccountFindStatus = await ClientAccountModel.find({
           $and: [{User_id: User_id}, {Email: ShortedOwnerEmail}]
        }); // Finding the employee in the database

        if (AccountFindStatus.length == 0) {
            Failed_Response({
                res: res,
                Status: 'Accont Not Found',
                Message: 'The Account is not found in the database',
                Data: {},
            }); // If the employee is not in the array, push the employee to the array
        } else if (AccountFindStatus.length > 0) {
            next(); // Move to next middleware
        }
    }
    catch{
        Failed_Response({res:res, Status:"Internal Error", Message:"There is Some Internal Error Happened", Data:undefined}); // Response Path: src/helper/API Response.ts
    }
}; // Path: src/Middleware/Store Management/Inventory management.ts