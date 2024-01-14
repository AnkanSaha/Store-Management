// import Modules
import { Response } from '../../helper/API Response'; // Response Module
import { StatusCodes } from 'outers'; // General App Config Module
import { methods } from 'outers'; // Unique ID Generator Module

// import Data models
import { StoreManagementModel } from '../../Models'; //  Model

// global types
type str = string; // Define a type for strings
type int = number; // Define a type for numbers
type globe = any; // Define a type for any
type obj = object; // Define a type for objects
type blank = void; // Define a type for void

// Request interfaces
interface Request {
    body: {
        CategoryID: int;
        User_idForBody: int;
        OwnerEmailForBody: str;
        CategoryName: str;
        CategoryDescription: str;
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
/**
 * This function adds a new category to a store's category list and checks if the category name already
 * exists.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and request body.
 * @param {obj | globe} res - The `res` parameter is the response object that will be sent back to the
 * client after the function is executed. It contains information such as the status code, status
 * message, and any data that needs to be returned.
 * @returns It seems that nothing is being returned explicitly from the `AddNewCategory` function.
 * However, it is returning a Promise that resolves to a blank value (`Promise<blank>`). The function
 * is mainly performing some operations and sending a response to the client using the `Response`
 * function.
 */
export async function AddNewCategory(req: Request, res: obj | globe): Promise<blank> {
    try {
        const { CategoryName, CategoryDescription, OwnerEmailForBody, User_idForBody } =
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
                CategoryID: new methods.UniqueGenerator(10).RandomNumber(true),
                CategoryName,
                CategoryDescription
            }); // Add the new Category to the Category List

            await StoreManagementModel.findOneAndUpdate(
                { $and: [{ User_id: User_idForBody }, { Email: ShortedOwnerEmail }] },
                { Catagories: CategoryNameExist[0].Catagories },
            ); // Update the Category List

            Response({
                res,
                StatusCode: StatusCodes.ACCEPTED,
                Status: 'Success',
                Message: 'The Category name added to database',
                Data: undefined,
            }); // Send the Response
        } else if (FilteredCategoryName.length > 0) {
            Response({
                res,
                StatusCode: StatusCodes.BAD_REQUEST,
                Status: 'Bad Request',
                Message: 'Category Name is already exist',
                Data: undefined,
            });
            return;
        }
    } catch (err: globe) {
        Response({
            res,
            StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
}; // Add New Category

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
                StatusCode: StatusCodes.ACCEPTED,
                Status: 'Success',
                Message: 'Category Details Found on Server',
                Data: StoreDetails[0].Catagories,
            });
        } else {
            Response({
                res,
                StatusCode: StatusCodes.NOT_FOUND,
                Status: 'Not Found',
                Message: 'Store Not Found',
                Data: undefined,
            });
        }
    } catch (err: globe | unknown) {
        Response({
            res,
            StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
}; // Get Category

/**
 * This is an async function in TypeScript that updates a category in a store management system based
 * on the request body.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and request body.
 * @param {obj | globe} res - The `res` parameter is the response object that will be sent back to the
 * client after the function is executed. It contains information such as the status code, status
 * message, and data.
 */
export async function UpdateCategory(req: Request, res: obj | globe): Promise<blank> {
    try {
        const {
            User_idForBody,
            OwnerEmailForBody,
            CategoryID,
            CategoryName,
            CategoryDescription
        } = req.body; // get the request body

        // Short the Owner Email
        const ShortedOwnerEmail: str = OwnerEmailForBody.toLocaleLowerCase();

        // Find the Store Details
        const StoreDetails: globe[] = await StoreManagementModel.find({
            $and: [{ User_id: User_idForBody }, { Email: ShortedOwnerEmail }],
        }); // Find the Store Details

        if (StoreDetails.length !== 0) {
            const FilteredCategoryForFind: globe[] = StoreDetails[0].Catagories.filter(
                (item: globe) => String(item.CategoryID) === String(CategoryID),
            ); // Filter the Category
            if (FilteredCategoryForFind.length === 0) {
                Response({
                    res,
                    StatusCode: StatusCodes.NOT_FOUND,
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
                    CategoryDescription
                }); // Push the new Category

                await StoreManagementModel.findOneAndUpdate(
                    { $and: [{ User_id: User_idForBody }, { Email: ShortedOwnerEmail }] },
                    { Catagories: FilteredCategoryForUpdate },
                ); // Update the Category

                Response({
                    res,
                    StatusCode: StatusCodes.ACCEPTED,
                    Status: 'Success',
                    Message: 'Category Updated Successfully',
                    Data: FilteredCategoryForUpdate,
                }); // Send the Response
            }
        } else if (StoreDetails.length === 0) {
            Response({
                res,
                StatusCode: StatusCodes.NOT_FOUND,
                Status: 'Store Not Found',
                Message: 'Store Not Found in the Database',
                Data: undefined,
            });
        } // Check if the Store Details is exist
    } catch (err: globe | unknown) {
        Response({
            res,
            StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
}; // Update Category

/**
 * This is a TypeScript function that deletes a category from a store based on the provided query
 * parameters.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {obj | globe} res - The `res` parameter is the response object that will be sent back to the
 * client after the function is executed. It contains information such as the status code, status
 * message, and data.
 */
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
                StatusCode: StatusCodes.NOT_FOUND,
                Status: 'Store Not Found',
                Message: 'Store Not Found in the Database',
                Data: undefined,
            });
        } else if (StoreDetails.length !== 0) {
            const FilteredCategoryDetailsForExist: globe[] = StoreDetails[0].Catagories.filter((item: globe) => String(item.CategoryID) === String(CategoryID)); // Filter the Category
            if (FilteredCategoryDetailsForExist.length === 0) {
                Response({
                    res,
                    StatusCode: StatusCodes.NOT_FOUND,
                    Status: 'Category Not Found',
                    Message: 'Category Not Found in the Database',
                    Data: undefined,
                }); // Send the Response
            } else if (FilteredCategoryDetailsForExist.length !== 0) {
                const FilteredCategoryDetailsForDelete: globe[] = StoreDetails[0].Catagories.filter((item: globe) => String(item.CategoryID) !== String(CategoryID)); // Filter the Category

                StoreDetails[0].Catagories = FilteredCategoryDetailsForDelete; // Update the Category

                await StoreManagementModel.findOneAndUpdate(
                    { $and: [{ User_id: User_idForQuery }, { Email: ShortedOwnerEmail }] },
                    { Catagories: StoreDetails[0].Catagories },
                ); // Update the Category
                const FindCategoryAfterDelete: globe[] = await StoreManagementModel.find({$and:[{ User_id: User_idForQuery }, { Email: ShortedOwnerEmail }]}); // Find the Store Details
                Response({
                    res,
                    StatusCode: StatusCodes.ACCEPTED,
                    Status: 'Success',
                    Message: 'Category Deleted Successfully',
                    Data: FindCategoryAfterDelete[0].Catagories,
                }); // Send the Response
            }
        }
    } catch (err: globe | unknown) {
        Response({
            res,
            StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
}; // Delete Category
