// This component is used to add new employee
// import UI components
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react"; // Chakra UI

// import react hooks
import { useState, useContext } from "react"; // React Hooks
import Decode_Token from "../../../../Functions/JWT/Decode"; // Decode Token
// import functions
import { Update_Document_Title } from "../../../../Functions/Most Used Functions"; // Update Document Title
import { AddEmployee_Function } from "../../../../Functions/Store Management/Employee Management Function"; // Add Employee Function

//import Components
import { Alert } from "../../../Most Used Components/Alert"; // Alert Component

// import variables & context
import { AppName } from "../../../../Global/Global variables"; // App Name
import { GlobalContext } from "../../../../Context/Context API"; // Context API

// types
type props = {
  StoreName: string;
};

export default function Add_New_Employee({ StoreName }: props) {
  // Context API
  const {
    UpdateLoading,
    AuthDetails,
    AlertMessage,
    UpdateAlert,
    UpdateSidebarOption,
  }: any = useContext(GlobalContext); // Set Document Title

  // Decode Token
  const Decoded: any = Decode_Token(AuthDetails.Data.AccountDetails); // decode token

  // Update Document Title with logic
  Update_Document_Title({ TitleName: `Add New Employee - ${StoreName}` }); // Update Document Title

  // State for Employee Details
  const [EmployeeDetails, setEmployeeDetails] = useState({
    User_idForBody: Decoded.User_id,
    OwnerEmailForBody: Decoded.Email,
    EmployeeName: "",
    EmployeeEmail: "",
    EmployeePhoneNumber: "",
    EmployeeMonthlySalary: 0,
    EmployeeRole: "",
    EmployeeDateOfJoining: "",
  });

  // State Updater for Employee Details
  const UpdateState = (element: any) => {
    setEmployeeDetails({
      ...EmployeeDetails,
      [element.target.name]: element.target.value,
    });
  };

  // Handle Submit
  async function HandleSubmit() {
    UpdateLoading(true); // Update Loading State to false
    let AddStatus = await AddEmployee_Function({
      AddEmployeeData: EmployeeDetails,
    }); // Add Employee Function

    if (AddStatus === false) {
      UpdateLoading(false); // Update Loading State to false
    } else {
      UpdateLoading(false); // Update Loading State to false
      UpdateAlert(AddStatus); // Update Alert Message
    }
  }

  return (
    <div className="rounded-xl ml-[13.25rem] shadow-2xl bg-slate-50 min-w-[83%] min-h-fit mb-5 py-10 absolute top-[5rem] ">
      {AlertMessage.Status === "Accont Not Found" ? (
        <Alert
          Title={AlertMessage.Status}
          Message={AlertMessage.Message}
          ButtonText="Ok"
          ButtonFunc={() => {
            UpdateAlert({}); // Update Alert Message to empty
          }}
        />
      ) : AlertMessage.Status === "Employee Already Exist" ? (
        <Alert
          Title={AlertMessage.Status}
          Message={AlertMessage.Message}
          ButtonText="Manage Employees"
          ButtonFunc={() => {
            UpdateSidebarOption("manage-employees"); // Update Sidebar Option to Manage Employees
            UpdateAlert({}); // Update Alert Message to empty
          }}
        />
      ) : AlertMessage.Status === "Employee Added" ? (
        <Alert
          Title={AlertMessage.Status}
          Message={AlertMessage.Message}
          ButtonText="Manage Employees"
          ButtonFunc={() => {
            UpdateSidebarOption("manage-employees"); // Update Sidebar Option to Manage Employees
            UpdateAlert({}); // Update Alert Message to empty
          }}
        />
      ) : null}
      <Heading className="ml-[20.5rem]">Add New Employee</Heading>
      <FormControl className="px-10 mt-[3.5rem]" isRequired>
        <FormLabel>Enter Employee Name</FormLabel>
        <Input
          type="text"
          name="EmployeeName"
          id="EmployeeName"
          onChange={UpdateState}
          value={EmployeeDetails.EmployeeName}
          isRequired
        />
        <FormLabel className="mt-[2.25rem]">Enter Employee Email ID</FormLabel>
        <Input
          type="email"
          name="EmployeeEmail"
          id="EmployeeEmail"
          onChange={UpdateState}
          value={EmployeeDetails.EmployeeEmail}
          isRequired
        />
        <FormLabel className="mt-[2.25rem]">
          Enter Employee Phone Number
        </FormLabel>
        <Input
          type="tel"
          name="EmployeePhoneNumber"
          id="EmployeePhoneNumber"
          onChange={UpdateState}
          value={EmployeeDetails.EmployeePhoneNumber}
          isRequired
        />
        <FormLabel className="mt-[2.25rem]">
          Enter Employee Monthly Salary (in INR)
        </FormLabel>
        <Input
          type="number"
          name="EmployeeMonthlySalary"
          id="EmployeeMonthlySalary"
          onChange={UpdateState}
          value={EmployeeDetails.EmployeeMonthlySalary}
          isRequired
        />
        <FormLabel className="mt-[2.25rem]">
          Enter Employee Role in Company
        </FormLabel>
        <Select
          name="EmployeeRole"
          id="EmployeeRole"
          onChange={UpdateState}
          value={EmployeeDetails.EmployeeRole}
          isRequired
        >
          <option value="">Select Employee Role</option>
          <option value="Manager">Manager</option>
          <option value="Cashier">Cashier</option>
          <option value="Salesman">Salesman</option>
          <option value="Store Keeper">Store Keeper</option>
          <option value="Owner">Owner</option>
          <option value="other">Other</option>
        </Select>
        <FormLabel className="mt-[2.25rem]">
          Enter Employee Date of Joining
        </FormLabel>
        <Input
          type="date"
          name="EmployeeDateOfJoining"
          onChange={UpdateState}
          id="EmployeeDateOfJoining"
          value={EmployeeDetails.EmployeeDateOfJoining}
          isRequired
        />
      </FormControl>
      <Button
        variant="solid"
        colorScheme="linkedin"
        className="mt-[3.5rem] ml-[27.25rem]"
        onClick={HandleSubmit}
      >
        <span className="text-sm">Add Employee</span>
      </Button>
    </div>
  );
}

// default props
Add_New_Employee.defaultProps = {
  StoreName: AppName,
};
