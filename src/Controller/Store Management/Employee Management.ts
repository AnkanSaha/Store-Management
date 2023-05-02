import { StoreManagementModel, ClientAccountModel } from '../../Models/index'; // Path: Database/Model/Store Management Model.ts

// interface for the employee
interface NewEmployee {
    User_id: number;
    EmployeeName: string;
    EmployeeEmail: string;
    EmployeePhoneNumber: number;
    EmployeeDateOfJoining: string;
    EmployeeRole: string;
    EmployeeMonthlySalary: number;
    res: any;
}

export async function AddnewEmployee({
    User_id,
    EmployeeDateOfJoining,
    EmployeeEmail,
    EmployeeMonthlySalary,
    EmployeeName,
    EmployeePhoneNumber,
    EmployeeRole,
    res,
}: NewEmployee) {
    // Lowercase the email
    let ShortedEmployeeEmail = EmployeeEmail.toLowerCase();

    try {
        let AccountFindStatus = await ClientAccountModel.find({
            User_id: User_id,
        }); // Finding the employee in the database

        if (AccountFindStatus.length == 0) {
            res.status(404).json({
                Status: 'Accont Not Found',
                Message: 'The Account is not found in the database',
            });
        } else if (AccountFindStatus.length > 0) {
            // Finding the employee in the database
            let EmployeeFindStatus: any = await StoreManagementModel.find({
                User_id: User_id,
            });

            //Checking if the employee is already in the array
            let EmployeeAlreadyExist = EmployeeFindStatus[0].Employees.filter((Employee: any) => {
                return (
                    Employee.EmployeeEmail == ShortedEmployeeEmail ||
                    Employee.EmployeePhoneNumber == EmployeePhoneNumber
                );
            });

            if (EmployeeAlreadyExist.length > 0) {
                res.status(404).json({
                    Status: 'Employee Already Exist',
                    Message: 'The Employee is already in the database',
                }); // If the employee is already in the array, do nothing
            } // If the employee is already in the array, do nothing
            else if (EmployeeAlreadyExist.length == 0) {
                EmployeeFindStatus[0].Employees.push({
                    EmployeeName: EmployeeName,
                    EmployeeEmail: ShortedEmployeeEmail,
                    EmployeePhoneNumber: EmployeePhoneNumber,
                    EmployeeDateOfJoining: EmployeeDateOfJoining,
                    EmployeeRole: EmployeeRole,
                    EmployeeMonthlySalary: EmployeeMonthlySalary,
                }); // Pushing the employee to the array

                //After pushing the employee to the array, saving the data to the database
                await StoreManagementModel.findOneAndUpdate({ User_id: User_id }, EmployeeFindStatus[0]);

                res.status(200).json({
                    Status: 'Employee Added',
                    Message: 'The Employee is added to the database',
                }); // If the employee is not in the array, push the employee to the array
            } // If the employee is not in the array, push the employee to the array
        }
    } catch (err) {
        throw err;
    }
} // Adding a new employee

// interface for the employee to get
interface GetEmployee {
    User_id: number;
    OwnerEmail: string;
    res: any;
}

// Getting the employee from the database and sending it to the client
export async function GetEmployee({ User_id, OwnerEmail, res }: GetEmployee) {
    let ShortedEmployeeEmail = OwnerEmail.toLowerCase(); // Lowercase the email

    try {
        let StoreDataFind: any = await StoreManagementModel.find({
            $and: [{ User_id: User_id }, { Email: ShortedEmployeeEmail }],
        }); // Finding the employee in the database
        console.log(StoreDataFind);

        if (StoreDataFind.length == 0) {
            res.status(404).json({
                Status: 'No Employee Found',
                Message: 'No Employee Found in the database',
            });
        } else if (StoreDataFind.length > 0) {
            res.status(200).json({
                Status: 'Employee Found',
                Message: 'Employee Found in the database',
                Employee: StoreDataFind[0].Employees,
            });
        }
    } catch (err) {
        throw err;
    }
} // Getting the employee
