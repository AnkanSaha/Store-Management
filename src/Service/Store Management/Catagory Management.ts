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
        User_id: num,
        OwnerEmail: str,
        CategoryName: str,
        CategoryDescription: str,
        MaxProduct: num,
        isActivated: bool
    }
}

// export The Controller Function
export default AddNewCategory

// All  Routes for this Router
export async function AddNewCategory(req: Request, res : obj | globe) : Promise<blank> {
    console.log(req.body, res.send)

}; // Add New Category