// import all models
import { ClientAccountModel, StoreManagementModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts

// import Custom Response
import { Failed_Response } from '../../helper/API Response'; // Response Path: src/helper/API Response.ts

// interface for the employee Add Middleware
interface EmployeeAdd {
    User_id: number;
}

// Employee Add Middleware
export const CheckEmployeeAddMiddleware = async (req: any, res: any, next: any) => {
    let { User_id }: EmployeeAdd = req.body; // Getting the data from the request body

    let AccountFindStatus = await ClientAccountModel.find({
        User_id: User_id,
    }); // Finding the employee in the database

    if (AccountFindStatus.length == 0) {
        Failed_Response({
            res: res,
            StatusCode: 404,
            Status: 'Accont Not Found',
            Message: 'The Account is not found in the database',
            Data: {},
        }); // If the employee is not in the array, push the employee to the array
    } else if (AccountFindStatus.length > 0) {
        next(); // Move to next middleware
    }
};

// Employee Delete Middleware
export const CheckEmployeeDeleteMiddleware = async (req: any, res: any, next: any) => {
    const {User_id, OwnerEmail} = req.query; // Getting the data from the request query

    let ShortedEmployeeEmail = OwnerEmail.toLowerCase(); // Lowercase the email

    let AccountFindStatus = await ClientAccountModel.find({
        User_id: User_id,
    }); // Finding the employee in the database

    if (AccountFindStatus.length == 0) {
        Failed_Response({
            res: res,
            StatusCode: 404,
            Status: 'Accont Not Found',
            Message: 'The Account is not found in the database',
            Data: {},
        }); // If the employee is not in the array, push the employee to the array
    } else if (AccountFindStatus.length > 0) {
        let StoreDataFind: any = await StoreManagementModel.find({
            $and: [{ User_id: User_id }, { Email: ShortedEmployeeEmail }],
        }); // Finding the employee in the database

        if (StoreDataFind.length == 0) {
            Failed_Response({res:res, StatusCode:404, Status:"No Store Found", Message:"No Store Found in the database", Data:{}}) // If the employee is not in the array, do nothing
        } else if (StoreDataFind.length > 0) {
            next(); // Move to next middleware
        }
    }
}
