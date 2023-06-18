// import Modules
import { Response } from '../../helper/API Response'; // Response Module
import { ResponseCode } from '../../config/App Config/General Config'; // General App Config Module
import { randomNumber } from 'uniquegen'; // Unique ID Generator Module

// import Data models
import { StoreManagementModel } from '../../Models'; //  Model

// global types
type str = string; // Define a type for strings
type int = number; // Define a type for numbers
type globe = any; // Define a type for any
type obj = object; // Define a type for objects
type blank = void; // Define a type for void
type bool = boolean; // Define a type for boolean

// Request interfaces
interface Request {
    body: {
        CategoryID: int;
        User_idForBody: int;
        OwnerEmailForBody: str;
        CategoryName: str;
        CategoryDescription: str;
        MaxProduct: int;
        isActivated: bool;
    };
    query: {
        User_idForQuery: int;
        OwnerEmailForQuery: str;
        CategoryID: int;
    };
    params: {
        User_idForParams: int;
        OwnerEmailForParams: str;
    };
}

// export The Controller Function
export default AddNewCategory;

// All  Routes for this Router
export async function AddNewCategory(req: Request, res: obj | globe): Promise<blank> {
    try {
        const { CategoryName, CategoryDescription, MaxProduct, OwnerEmailForBody, User_idForBody, isActivated } =
            req.body; // get the request body

        const ShortedOwnerEmail: str = OwnerEmailForBody.toLocaleLowerCase(); // Short the Owner Email

        // Check if the Category Name is already exist
        const CategoryNameExist: obj | globe = await StoreManagementModel.find({
            $and: [{ User_id: User_idForBody }, { Email: ShortedOwnerEmail }],
        }); // Check if the Category Name is already exist

        const FilteredCategoryName: obj[] | globe = CategoryNameExist[0].Catagories.filter(
            (item: globe) => item.CategoryName === CategoryName,
        ); // Filter the Category Name

        // Check if the Category Name is already exist
        if (FilteredCategoryName.length === 0) {
            CategoryNameExist[0].Catagories.push({
                CategoryID: await randomNumber(10),
                CategoryName,
                CategoryDescription,
                MaxProduct,
                isActivated,
            }); // Add the new Category to the Category List

            await StoreManagementModel.findOneAndUpdate(
                { $and: [{ User_id: User_idForBody }, { Email: ShortedOwnerEmail }] },
                { Catagories: CategoryNameExist[0].Catagories },
            ); // Update the Category List

            Response({
                res,
                StatusCode: ResponseCode.Accepted,
                Status: 'Success',
                Message: 'The Category name added to database',
                Data: undefined,
            }); // Send the Response
        } else if (FilteredCategoryName.length > 0) {
            Response({
                res,
                StatusCode: ResponseCode.Bad_Request,
                Status: 'Bad Request',
                Message: 'Category Name is already exist',
                Data: undefined,
            });
            return;
        }
    } catch (err: globe) {
        Response({
            res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
} // Add New Category

/**
 * This function retrieves the categories of a store based on the owner's email and user ID.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and parameters.
 * @param {obj | globe} res - The `res` parameter is the response object that will be sent back to the
 * client making the request. It contains information such as the status code, status message, and any
 * data that is being returned.
 */
export async function GetCategory(req: Request, res: obj | globe): Promise<blank> {
    try {
        const { OwnerEmailForParams, User_idForParams } = req.params; // get the request body

        // Short the Owner Email
        const ShortedOwnerEmail: str = OwnerEmailForParams.toLocaleLowerCase();

        // Find the Store Details
        const StoreDetails: globe[] = await StoreManagementModel.find({
            $and: [{ User_id: User_idForParams }, { Email: ShortedOwnerEmail }],
        }); // Find the Store Details

        if (StoreDetails.length !== 0) {
            Response({
                res,
                StatusCode: ResponseCode.Accepted,
                Status: 'Success',
                Message: 'Store Details',
                Data: StoreDetails[0].Catagories,
            });
        } else {
            Response({
                res,
                StatusCode: ResponseCode.Not_Found,
                Status: 'Not Found',
                Message: 'Store Not Found',
                Data: undefined,
            });
        }
    } catch (err: globe | unknown) {
        Response({
            res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
} // Get Category

export async function UpdateCategory(req: Request, res: obj | globe): Promise<blank> {
    try {
        const {
            User_idForBody,
            OwnerEmailForBody,
            CategoryID,
            CategoryName,
            CategoryDescription,
            MaxProduct,
            isActivated,
        } = req.body; // get the request body

        // Short the Owner Email
        const ShortedOwnerEmail: str = OwnerEmailForBody.toLocaleLowerCase();

        // Find the Store Details
        const StoreDetails: globe[] = await StoreManagementModel.find({
            $and: [{ User_id: User_idForBody }, { Email: ShortedOwnerEmail }],
        }); // Find the Store Details

        if (StoreDetails.length !== 0) {
            const FilteredCategoryForFind: globe[] = StoreDetails[0].Catagories.filter(
                (item: globe) => item.CategoryID === CategoryID,
            ); // Filter the Category
            if (FilteredCategoryForFind.length === 0) {
                Response({
                    res,
                    StatusCode: ResponseCode.Not_Found,
                    Status: 'Category Not Found',
                    Message: 'Category Not Found in the Database',
                    Data: undefined,
                }); // Send the Response
            } else if (FilteredCategoryForFind.length !== 0) {
                const FilteredCategoryForUpdate: globe[] = StoreDetails[0].Catagories.filter(
                    (item: globe) => item.CategoryID !== CategoryID,
                ); // Filter the Category

                FilteredCategoryForUpdate.push({
                    CategoryID,
                    CategoryName,
                    CategoryDescription,
                    MaxProduct,
                    isActivated,
                }); // Push the new Category

                await StoreManagementModel.findOneAndUpdate(
                    { $and: [{ User_id: User_idForBody }, { Email: ShortedOwnerEmail }] },
                    { Catagories: FilteredCategoryForUpdate },
                ); // Update the Category

                Response({
                    res,
                    StatusCode: ResponseCode.Accepted,
                    Status: 'Success',
                    Message: 'Category Updated Successfully',
                    Data: FilteredCategoryForUpdate,
                }); // Send the Response
            }
        } else if (StoreDetails.length === 0) {
            Response({
                res,
                StatusCode: ResponseCode.Not_Found,
                Status: 'Store Not Found',
                Message: 'Store Not Found in the Database',
                Data: undefined,
            });
        } // Check if the Store Details is exist
    } catch (err: globe | unknown) {
        Response({
            res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
} // Update Category

export async function DeleteCategory(req: Request, res: obj | globe): Promise<blank> {
    try {
        const { User_idForQuery, OwnerEmailForQuery, CategoryID } = req.query; // get the request body

        // Short the Owner Email
        const ShortedOwnerEmail: str = OwnerEmailForQuery.toLocaleLowerCase();

        // Find the Store Details
        const StoreDetails: globe[] = await StoreManagementModel.find({
            $and: [{ User_id: User_idForQuery }, { Email: ShortedOwnerEmail }],
        }); // Find the Store Details

        if (StoreDetails.length === 0) {
            Response({
                res,
                StatusCode: ResponseCode.Not_Found,
                Status: 'Store Not Found',
                Message: 'Store Not Found in the Database',
                Data: undefined,
            });
        } else if (StoreDetails.length !== 0) {
            const FilteredCategoryDetailsForExist: globe[] = (StoreDetails[0].Catagories =
                StoreDetails[0].Catagories.filter((item: globe) => String(item.CategoryID) === String(CategoryID))); // Filter the Category
            if (FilteredCategoryDetailsForExist.length === 0) {
                Response({
                    res,
                    StatusCode: ResponseCode.Not_Found,
                    Status: 'Category Not Found',
                    Message: 'Category Not Found in the Database',
                    Data: undefined,
                }); // Send the Response
            } else if (FilteredCategoryDetailsForExist.length !== 0) {
                const FilteredCategoryDetailsForDelete: globe[] = (StoreDetails[0].Catagories =
                    StoreDetails[0].Catagories.filter((item: globe) => String(item.CategoryID) !== String(CategoryID))); // Filter the Category

                StoreDetails[0].Catagories = FilteredCategoryDetailsForDelete; // Update the Category

                await StoreManagementModel.findOneAndUpdate(
                    { $and: [{ User_id: User_idForQuery }, { Email: ShortedOwnerEmail }] },
                    { Catagories: StoreDetails[0].Catagories },
                ); // Update the Category

                Response({
                    res,
                    StatusCode: ResponseCode.Accepted,
                    Status: 'Success',
                    Message: 'Category Deleted Successfully',
                    Data: [],
                }); // Send the Response
            }
        }
    } catch (err: globe | unknown) {
        Response({
            res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
}
