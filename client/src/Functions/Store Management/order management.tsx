// This file is created by Ankan Saha

/* Importing functions and validators from other files to be used in the current file. Specifically, it
is importing the HTTP POST and PUT functions from a file located in the "../Most Used Functions"
directory, as well as the ValidateAddEmployee and ValidateUpdateEmployee functions from a file
located in the "../../Validator/Store Management/Manage Employee Validate" directory. */
// Import Functions
import { HTTP_POST, HTTP_PUT } from "../Most Used Functions"; // import HTTP POST Function
import { ValidateOrderDetails } from "../../Validator/Store Management/order management"; // import Validate Add Employee Function

// Typescript type
type globe = any;
type obj = object;

/**
 * This function adds an employee by validating the data and sending a POST request to create the
 * employee.
 * @param {EmployeeAddProps}  - - `AddEmployee_Function`: the name of the function being exported
 * @returns either the result of adding an employee (if validation is successful) or false (if
 * validation fails).
 */
// function  for add employee
export async function PlaceOrder_Function(OrderData: globe | obj) {
  // Let's validate the data
  let ValidateStatus = await ValidateOrderDetails(OrderData);

  // If validation is successful
  if (ValidateStatus === true) {
    // Let's add the employee
    let AddEmployeeStatus = await HTTP_POST({
      PostPath: "/post/order/create-new-order",
      SendData: OrderData,
    });
    return AddEmployeeStatus;
  } else if (ValidateStatus === false) {
    return false;
  }
}

// Typescript Interface
// interface EmployeeUpdateProps {
//   UpdateEmployeeData: obj | globe;
// }

// /**
//  * This function updates employee data after validating it.
//  * @param {EmployeeUpdateProps}  - The function `UpdateEmployee` takes in an object with a property
//  * `UpdateEmployeeData` of type `EmployeeUpdateProps`. `EmployeeUpdateProps` is likely an interface or
//  * type that defines the shape of the data expected for updating an employee. The function then calls a
//  * `ValidateUpdateEmployee` function
//  * @returns either the result of the HTTP_PUT request if the validation is successful, or false if the
//  * validation fails.
//  */
export async function UpdateOrder(UpdateOrderData: globe) {
  let result = await HTTP_PUT({
    PostPath: "/put/order/update-order-details",
    SendData: UpdateOrderData,
  });
  return result;
}
