// import Modules
import { Response } from '../../helper/API Response'; // Response Module
import { ResponseCode } from '../../config/App Config/General Config'; // General App Config Module

// import Data models
import { StoreManagementModel } from '../../Models'; //  Model

// global types
type str = string; // Define a type for strings
type num = number; // Define a type for numbers
type globe = any; // Define a type for any
type obj = object; // Define a type for objects
type blank = void; // Define a type for void
type bool = boolean; // Define a type for boolean

// Request interfaces
interface Request {
    body: {
        User_id: num;
        OwnerEmail: str;
        CategoryName: str;
        CategoryDescription: str;
        MaxProduct: num;
        isActivated: bool;
    };
}

// export The Controller Function
export default AddNewCategory;

// All  Routes for this Router
export async function AddNewCategory(req: Request, res: obj | globe): Promise<blank> {
    try {
        const { CategoryName, CategoryDescription, MaxProduct, OwnerEmail, User_id, isActivated } = req.body; // get the request body

        const ShortedOwnerEmail: str = OwnerEmail.toLocaleLowerCase(); // Short the Owner Email

        // Check if the Category Name is already exist
        const CategoryNameExist: obj | globe = await StoreManagementModel.find({
            $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }],
        }); // Check if the Category Name is already exist

        const FilteredCategoryName: obj[] | globe = CategoryNameExist[0].Catagories.filter(
            (item: globe) => item.CategoryName === CategoryName,
        ); // Filter the Category Name

        // Check if the Category Name is already exist
        if (FilteredCategoryName.length === 0) {
            CategoryNameExist[0].Catagories.push({
                CategoryName: CategoryName,
                CategoryDescription: CategoryDescription,
                MaxProduct: MaxProduct,
                isActivated: isActivated,
            }); // Add the new Category to the Category List

            await StoreManagementModel.findOneAndUpdate(
                { $and: [{ User_id: User_id }, { Email: ShortedOwnerEmail }] },
                CategoryNameExist[0],
            ); // Update the Category List

            Response({
                res: res,
                StatusCode: ResponseCode.Accepted,
                Status: 'Success',
                Message: 'The Category name added to database',
                Data: undefined,
            }); // Send the Response
        } else if (FilteredCategoryName.length > 0) {
            Response({
                res: res,
                StatusCode: ResponseCode.Bad_Request,
                Status: 'Bad Request',
                Message: 'Category Name is already exist',
                Data: undefined,
            });
            return;
        }
    } catch (err: globe) {
        Response({
            res: res,
            StatusCode: ResponseCode.Internal_Server_Error,
            Status: 'Internal Server Error',
            Message: err.message,
            Data: undefined,
        });
    }
} // Add New Category
