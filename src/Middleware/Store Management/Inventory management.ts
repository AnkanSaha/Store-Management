/* The code is importing two models, `ClientAccountModel` and `StoreManagementModel`, from the
`../../Models/index` file path. It is also importing a custom response called `Failed_Response` from
the `../../helper/API Response` file path. These imports are necessary for the code to use the
models and custom response in the current file. */
// import all models
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts
// EmployeeEmail

// import Custom Response
import { Failed_Response } from '../../helper/API Response'; // Response Path: src/helper/API Response.ts

// global types
type str = string; // type for string
type num = number; // type for number
type obj = object; // type for object
type globe = any; // type for any
type blank = void; // type for void

// interace for Add Inventory
interface InventoryInterface{
   body : {
    OwnerEmail: str,
    User_id: num,
    ProductName: str,
    ProductCategory: str,
    ProductSKU: str,
    ProductQuantity: num,
    ProductPrice: num,
    ProductExpiryDate: str,
    ProductManufacturingDate: str,
    ProductDescription: str
   }
}

/**
 * This TypeScript function is a middleware for inventory management that checks if a given account
 * exists in the database and passes control to the next middleware if it does.
 * @param {globe} req - The request object that contains information about the HTTP request made by the
 * client.
 * @param {globe} res - The "res" parameter is the response object that is used to send the response back
 * to the client.
 * @param {globe} next - next is a function that is called to move to the next middleware function in the
 * chain. It is used to pass control to the next middleware function.
 */
export async function AddInventoryMiddleware (req:InventoryInterface, res:obj|globe, next:any) : Promise<blank>{
    try{
        const {User_id, OwnerEmail} = req.body;
        let ShortedOwnerEmail:str = OwnerEmail.toLowerCase(); // Lowercase the email

        let AccountFindStatus : obj[] = await ClientAccountModel.find({
           $and: [{User_id: User_id}, {Email: ShortedOwnerEmail}]
        }); // Finding the employee in the database

        if (AccountFindStatus.length == 0) {
            Failed_Response({
                res: res,
                Status: 'Accont Not Found',
                Message: 'The Account is not found in the database',
                Data: undefined,
            }); // If the employee is not in the array, push the employee to the array
        } else if (AccountFindStatus.length > 0) {
            // If the account is found, find the store of the account
            let StoreDataFind: obj[] = await StoreManagementModel.find({
                $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }],
            }); // Finding the owner store in the database

            // If the store is not found, send a response to the client
            if (StoreDataFind.length == 0) {
                Failed_Response({
                    res: res,
                    Status: 'Store Not Found',
                    Message: 'The Store is not found in the database',
                    Data: undefined,
                }); // If the employee is not in the array, push the employee to the array
            }
            // If the store is found, call the next middleware
            else if (StoreDataFind.length > 0) {
                next(); // Calling the next middleware
            };
        };
    }
    catch{
        Failed_Response({res:res, Status:"Internal Error", Message:"There is Some Internal Error Happened", Data:undefined}); // Response Path: src/helper/API Response.ts
    }
}; // Path: src/Middleware/Store Management/Inventory management.ts