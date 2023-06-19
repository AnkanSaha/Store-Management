// import modules
import { Response } from '../../helper/API Response'; // import API Response
import { ResponseCode } from '../../config/App Config/General Config'; // import Response Code
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
    };
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
