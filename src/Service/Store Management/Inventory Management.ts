// This File is used to CRUD the data from the database and send the response to the user for Inventory

// import all modules
import { Failed_Response, Success_Response, NotAllowed_Response } from '../../helper/API Response'; // Importing the Failed_Response function

import { StoreManagementModel } from '../../Models/index'; // Importing the StoreManagementModel

// Global Types
type str = string; // type for string
type num = number; // type for number
type obj = object; // type for object
type globe = any; // type for any
type blank = void; // type for void

// interface for Request/* The `interface Request` is defining the structure of the request object that
/*will be received by the `AddInventory` function. It specifies that the
request object should have a `body` property which is an object with
specific properties such as `OwnerEmail`, `User_id`, `ProductName`,
`ProductCategory`, `ProductSKU`, `ProductQuantity`, `ProductPrice`,
`ProductExpiryDate`, `ProductManufacturingDate`, and `ProductDescription`.
This interface helps to ensure that the request object received by the
function has the required properties and types. */

interface Request {
    body: {
        OwnerEmail: str;
        User_id: num;
        ProductName: str;
        ProductCategory: str;
        ProductSKU: str;
        ProductQuantity: num;
        ProductPrice: num;
        ProductExpiryDate: str;
        ProductManufacturingDate: str;
        ProductDescription: str;
    },
    params : {
        User_id : num;
        OwnerEmail : str;
        ProductSKU: str;
    }
}

// Function for Add Inventory
/**
 * This function adds a new product to a store's inventory in a database, after checking if the store
 * and product already exist.
 * @param {Request} req - The request object containing information about the HTTP request made by the
 * client.
 * @param {obj | globe} res - The response object that will be sent back to the client.
 */
    export async function AddInventory(req: Request, res: obj | globe): Promise<blank> {
    try {
        // Get Data from Request Body
        const {
            OwnerEmail,
            ProductCategory,
            ProductDescription,
            ProductExpiryDate,
            ProductManufacturingDate,
            ProductName,
            ProductPrice,
            ProductQuantity,
            ProductSKU,
            User_id,
        } = req.body;

        // Lowercase the email
        let ShortedOwnerEmail: str = OwnerEmail.toLowerCase();
        let ShortedProductSKU : str = ProductSKU.toLowerCase();

        // Finding the employee in the database
        let StoreDataFind: globe[] = await StoreManagementModel.find({
            $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }],
        }); // Finding the owner store in the database
        
            // check if the product is already in the store
            let ProductExist: globe[] = StoreDataFind[0].Products.filter(
                (Product: globe) => Product.ProductSKU === ShortedProductSKU,
            );

            if (ProductExist.length > 0) {
                NotAllowed_Response({
                    res: res,
                    Status: 'Product Already Exist',
                    Message: 'The Product is already exist in the store',
                    Data: undefined,
                }); // If the employee is not in the array, send a response to the client
            } else if (ProductExist.length === 0) {
                StoreDataFind[0].Products.push({
                    ProductName: ProductName,
                    ProductCategory: ProductCategory,
                    ProductSKU: ShortedProductSKU,
                    ProductQuantity: ProductQuantity,
                    ProductPrice: ProductPrice,
                    ProductExpiryDate: ProductExpiryDate,
                    ProductManufacturingDate: ProductManufacturingDate,
                    ProductDescription: ProductDescription,
                }); // Pushing the new product to the array

                await StoreManagementModel.findOneAndUpdate(
                    { User_id: User_id },
                    { Products: StoreDataFind[0].Products },
                ); // Updating the database
                Success_Response({
                    res: res,
                    Status: 'Product Added',
                    Message: 'The Product is added to the store',
                    Data: undefined,
                }); // Sending a Success Response to the client
            }
    } catch {
        Failed_Response({ res: res, Status: 'fail', Message: 'Something went wrong!', Data: undefined }); // Sending a Failed Response to the client
    }
}; // Add Inventory Function


// Get All Inventory Function

/**
 * This function retrieves inventory data from a store based on the user ID and owner email provided in
 * the request parameters.
 * @param {Request} req - The request object containing information about the incoming HTTP request.
 * @param {obj | globe} res - The response object that will be sent back to the client.
 */
export async function GetAllInventory(req: Request, res: obj | globe): Promise<blank> {
    const { User_id, OwnerEmail } = req.params; // Get Data from Request params
    // Shorting email
    let ShortedOwnerEmail: str = OwnerEmail.toLowerCase(); // Convert Email to Lower Case

    try {
        // Finding the employee in the database
        let StoreDataFind: globe[] = await StoreManagementModel.find({
            $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }],
        }); // Finding the owner store in the database

        if (StoreDataFind.length > 0) {
            Success_Response({
                res: res,
                Status: 'Success',
                Message: 'The Inventory is found',
                Data: StoreDataFind[0].Products,
            }); // Sending a Success Response to the client
        } else if (StoreDataFind.length === 0) {
            Failed_Response({
                res: res,
                Status: 'Inventory Not Found',
                Message: 'The Inventory is not found in the store',
                Data: undefined,
            }); // Sending a Failed Response to the client
        }
    }
    catch {
        Failed_Response({ res: res, Status: 'fail', Message: 'Something went wrong!', Data: undefined }); // Sending a Failed Response to the client
    }
};


// Function for Update Inventory
/**
 * This function updates a product in a store's inventory based on the provided request body data.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, and body.
 * @param {obj | globe} res - The "res" parameter is the response object that will be sent back to the
 * client after the function is executed. It contains information such as the status code, headers, and
 * response body.
 */
export async function UpdateInventory(req: Request, res: obj | globe): Promise<blank> {
    try{
         // Get Data from Request Body
         const {
            OwnerEmail,
            ProductCategory,
            ProductDescription,
            ProductExpiryDate,
            ProductManufacturingDate,
            ProductName,
            ProductPrice,
            ProductQuantity,
            ProductSKU,
            User_id,
        } = req.body;

        // Lowercase the email and SKU
        let ShortedOwnerEmail: str = OwnerEmail.toLowerCase(); // Convert Email to Lower Case
        let ShortedProductSKU : str = ProductSKU.toLowerCase(); // Convert Email to Lower Case

        // Finding the product in the database
        let StoreDataFind: globe[] = await StoreManagementModel.find({
            $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }]
        }); // Finding the owner store in the database

            // check if the product is already in the store
            let ProductExist: globe[] = StoreDataFind[0].Products.filter(
                (Product: globe) => Product.ProductSKU === ShortedProductSKU,
            ); // Finding the product in the array

            if (ProductExist.length > 0) {
            //  find Index of the product
            let ProductIndex: num = StoreDataFind[0].Products.indexOf(ProductExist[0]); // Finding the index of the product in the array
            if(ProductIndex >= 0){ // Check if the product is in the array
                StoreDataFind[0].Products.splice(ProductIndex, 1); // Removing the product from the array
                let NewData = {
                    ProductName: ProductName,
                    ProductCategory: ProductCategory,
                    ProductSKU: ShortedProductSKU,
                    ProductQuantity: ProductQuantity,
                    ProductPrice: ProductPrice,
                    ProductExpiryDate: ProductExpiryDate,
                    ProductManufacturingDate: ProductManufacturingDate,
                    ProductDescription: ProductDescription
                }  // Creating a new object for the product data

                StoreDataFind[0].Products.push(NewData); // Pushing the new product to the array
                 await StoreManagementModel.findOneAndUpdate({$and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }] }, { Products: StoreDataFind[0].Products }); // Finding the owner store in the database
                 Success_Response({
                    res: res,
                    Status: 'Product Updated',
                    Message: 'The Product is updated in the store',
                    Data: undefined
                 }); // Sending a Success Response to the client
                }
            }
            else if (ProductExist.length === 0) {
                Failed_Response({
                    res: res,
                    Status: 'Product Not Found',
                    Message: 'The Product is not found in the store',
                    Data: undefined
                });
            }
    }catch(err:globe){
        Failed_Response({ res: res, Status: 'fail', Message: 'Something went wrong!', Data: err }); // Sending a Failed Response to the client
    }
}; // Update Inventory Function

/**
 * This function deletes a product from a store in the database based on the provided owner email,
 * product SKU, and user ID.
 * @param {Request} req - The request object containing information about the HTTP request made by the
 * client.
 * @param {obj | globe} res - The "res" parameter is an object or a global variable that represents the
 * response object in an HTTP request. It is used to send the response back to the client after
 * processing the request.
 */
export async function DeleteInventory(req: Request, res: obj | globe): Promise<blank> {
    try{
                 // Get Data from Request Body
                 const {
                    OwnerEmail,
                    ProductSKU,
                    User_id,
                } = req.params;
        
                // Lowercase the email and SKU
                let ShortedOwnerEmail: str = OwnerEmail.toLowerCase(); // Convert Email to Lower Case
                let ShortedProductSKU : str = ProductSKU.toLowerCase(); // Convert Email to Lower Case
        
                // Finding the product in the database
                let StoreDataFind: globe[] = await StoreManagementModel.find({
                    $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }]
                }); // Finding the owner store in the database
        
                if(StoreDataFind.length > 0){
                    // check if the product is already in the store
                    let ProductExist: globe[] = StoreDataFind[0].Products.filter(
                        (Product: globe) => Product.ProductSKU === ShortedProductSKU,
                    ); // Finding the product in the array
                    
                    if (ProductExist.length > 0) {
                        const ProductIndex: num = StoreDataFind[0].Products.indexOf(ProductExist[0]); // Finding the index of the product in the array
                        if(ProductIndex >= 0){ // Check if the product is in the array
                            StoreDataFind[0].Products.splice(ProductIndex, 1); // Removing the product from the array
                            await StoreManagementModel.findOneAndUpdate({$and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }] }, { Products: StoreDataFind[0].Products }); // Finding the owner store in the database
                            Success_Response({
                               res: res,
                               Status: 'Product Deleted',
                               Message: 'The Product is Deleted in the store',
                               Data: undefined
                            }); // Sending a Success Response to the client
                        }
                    }
                    else if (ProductExist.length === 0) {
                        Failed_Response({
                            res: res,
                            Status: 'Product Not Found',
                            Message: 'The Product is not found in the store',
                            Data: undefined
                        });
                    }
                }
                else {
                    Failed_Response({
                        res: res,
                        Status: 'Store Not Found',
                        Message: 'The Store is not found',
                        Data: undefined
                    });
                }
    }catch (err:globe){
        Failed_Response({ res: res, Status: 'fail', Message: 'Something went wrong!', Data: err }); // Sending a Failed Response to the client
    }
}; // Delete Inventory Function