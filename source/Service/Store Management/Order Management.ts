// import modules
import { Response } from '../../helper/API Response'; // import API Response
import { ResponseCode } from '../../config/Keys/General Keys'; // import Response Code
import { randomNumber } from 'uniquegen'; // import Unique Number Generator

// import Data Model
import { StoreManagementModel } from '../../Models'; // import Store Management Model

// global types
type str = string; // string type
type int = number; // number type
type obj = object; // object type
type globe = any; // global type

// interfaces
interface Request {
    body: {
        User_idForBody: int;
        OwnerEmailForBody: str;
        ProductName: str;
        ProductSKU: str;
        ProductPrice: int;
        ProductQuantity: int;
        ProductCatagory: str;
        DeliveryAddress: str;
        DeliveryDate: str;
        DeliveryStatus: str;
        PaymentMethod: str;
        PaymentStatus: str;
        CustomerName: str;
        CustomerEmail: str;
        CustomerPhone: str;
        OrderID: int;
    },
    params : {
        User_idForParams: int;
        OwnerEmailForParams: str;
      }
}
export async function CreateNewOrder(req: Request, res: obj | globe) {
    try {
        const {
            User_idForBody,
            OwnerEmailForBody,
            ProductName,
            ProductSKU,
            ProductCatagory,
            ProductPrice,
            ProductQuantity,
            DeliveryAddress,
            DeliveryDate,
            DeliveryStatus,
            PaymentMethod,
            PaymentStatus,
            CustomerName,
            CustomerEmail,
            CustomerPhone,

        } = req.body; // get the request body

        // Short the Email
        const ShortEmail: str = OwnerEmailForBody.toLowerCase(); // convert the email to lowercase
        // Get the Store Details
        const StoreDetails: globe[] = await StoreManagementModel.find({
            $and: [{ User_id: User_idForBody }, { Email: ShortEmail }]
        });
        if (StoreDetails.length !== 0) {
            const OrderDetails: obj = Object.freeze({
                OrderID: await randomNumber(16), // generate a random number for the order id
                ProductName,
                ProductPrice,
                ProductSKU,
                ProductCatagory,
                ProductQuantity,
                DeliveryAddress,
                DeliveryDate,
                DeliveryStatus,
                PaymentMethod,
                PaymentStatus,
                CustomerName,
                CustomerEmail,
                CustomerPhone
            }); // freeze the object to prevent from modification

            // Update the Product Details
            const FilteredProductDetailsForFind: globe[] = StoreDetails[0].Products.filter(
                (Product: globe) => String(Product.ProductSKU) === String(ProductSKU),
            ); // filter the product details
            if (FilteredProductDetailsForFind.length !== 0) {
                if (FilteredProductDetailsForFind[0].ProductQuantity !== 0) {
                    // Update the Product Details in db
                    for(let index =0; StoreDetails[0].Products.length > index; index++) {
                        if(StoreDetails[0].Products[index].ProductSKU === ProductSKU) {
                            StoreDetails[0].Products[index].ProductQuantity -= ProductQuantity;
                            break;
                        }
                    }
                    // update Customer Details
                    const Filtered = StoreDetails[0].Customers.filter((Customer: globe) => String(Customer.CustomerEmail) === String(CustomerEmail));
                    if (Filtered.length === 0) {
                        StoreDetails[0].Customers.push({
                            CustomerID : await randomNumber(16),
                            CustomerName,
                            CustomerEmail,
                            CustomerPhone,
                            TotalOrders: 1
                        });
                    } else {
                        for(let index =0; StoreDetails[0].Customers.length > index; index++) {
                            if(StoreDetails[0].Customers[index].CustomerEmail === CustomerEmail) {
                                StoreDetails[0].Customers[index].TotalOrders += 1;
                                break;
                            }
                        }
                    }

                    // Update the Product Details in db
                     StoreDetails[0].Orders.push(OrderDetails); // update the order details

                     // Update the Order Details in db
                     await StoreManagementModel.updateOne({$and:[{User_id: User_idForBody}, {Email: ShortEmail}]}, {$set: {Products: StoreDetails[0].Products, Orders: StoreDetails[0].Orders, Customers: StoreDetails[0].Customers}});

                     Response({
                         res,
                         StatusCode: ResponseCode.Created,
                         Status: 'Ok',
                         Message: 'Order Created Successfully',
                         Data: undefined,
                     }); // send the response

                } else {
                    Response({
                        res,
                        StatusCode: ResponseCode.Service_Unavailable,
                        Status: 'Out of Stock',
                        Message: 'Product Out of Stock Please Try Again Later',
                        Data: undefined,
                    }); // send the response
                }
            } else {
                Response({
                    res,
                    StatusCode: ResponseCode.Not_Found,
                    Status: 'Not Found',
                    Message: 'Product Not Found',
                    Data: undefined,
                }); // send the response
            }
        } else {
            Response({
                res,
                StatusCode: ResponseCode.Not_Found,
                Status: 'Not Found',
                Message: 'Store Not Found',
                Data: undefined,
            }); // send the response
        }
    } catch (error) {
        Response({
            res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Error',
            Message: 'Internal Server Error',
            Data: undefined,
        });
    }
} // End CreateNewOrder

/**
 * This function retrieves order details for a specific store based on the provided user ID and email.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and parameters.
 * @param {obj | globe} res - The `res` parameter is the response object that will be sent back to the
 * client making the request. It contains information such as the status code, status message, and any
 * data that is being returned.
 */
export async function GetOrderDetails(req: Request, res: obj | globe) {
    try{
        const {OwnerEmailForParams, User_idForParams} = req.params; // get the request params

        // short the email
        const ShortEmail: str = OwnerEmailForParams.toLowerCase(); // convert the email to lowercase

        // get the store details
        const StoreDetails: globe[] = await StoreManagementModel.find({$and: [{User_id: User_idForParams}, {Email: ShortEmail}]}); // get the store details

        if(StoreDetails.length !== 0) {
            Response({
                res,
                StatusCode: ResponseCode.OK,
                Status: 'Ok',
                Message: 'Order Details',
                Data: StoreDetails[0].Orders,
            }); // send the response
        } else {
            Response({
                res,
                StatusCode: ResponseCode.Not_Found,
                Status: 'Not Found',
                Message: 'Store Not Found',
                Data: undefined
            }); // send the response
        }
    }
    catch {
        Response({
            res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Error',
            Message: 'Internal Server Error',
            Data: undefined
        })
    }
};

export async function UpdateOrderDetails(req: Request, res: obj | globe) {
    try {
        const {OwnerEmailForBody, User_idForBody, OrderID} = req.body; // get the request params
        const {DeliveryAddress, DeliveryDate, DeliveryStatus, PaymentMethod, PaymentStatus} = req.body; // get the request body

        // short the email
        const ShortEmail: str = OwnerEmailForBody.toLowerCase(); // convert the email to lowercase

        // get the store details
        const StoreDetails: globe[] = await StoreManagementModel.find({$and: [{User_id: User_idForBody}, {Email: ShortEmail}]}); // get the store details

        if(StoreDetails.length !== 0) {
            // update the order details
            for(let index =0; StoreDetails[0].Orders.length > index; index++) {
                if(StoreDetails[0].Orders[index].OrderID === OrderID) {
                    StoreDetails[0].Orders[index].DeliveryAddress = DeliveryAddress;
                    StoreDetails[0].Orders[index].DeliveryDate = DeliveryDate;
                    StoreDetails[0].Orders[index].DeliveryStatus = DeliveryStatus;
                    StoreDetails[0].Orders[index].PaymentMethod = PaymentMethod;
                    StoreDetails[0].Orders[index].PaymentStatus = PaymentStatus;
                    break;
                }
            }

            // update the order details in db
            await StoreManagementModel.updateOne({$and: [{User_id: User_idForBody}, {Email: ShortEmail}]}, {$set: {Orders: StoreDetails[0].Orders}});

            Response({
                res,
                StatusCode: ResponseCode.OK,
                Status: 'Ok',
                Message: 'Order Details Updated Successfully',
                Data: undefined
            }); // send the response
        } else {
            Response({
                res,
                StatusCode: ResponseCode.Not_Found,
                Status: 'Not Found',
                Message: 'Store Not Found',
                Data: undefined
            }); // send the response
        }
    }
    catch {
        Response({
            res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Error',
            Message: 'Internal Server Error',
            Data: undefined
        })
    }
}