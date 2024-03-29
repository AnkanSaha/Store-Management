// Function declaration for the Router component
// This function returns a Router component with a Routes component that contains a Route component that renders the HomePage component when the path is '/' and a Route component that renders the NotFound component when the path is '*'.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // import All the required components

// Common Pages
import HomePage from "../Pages/Home/Home Page"; // import HomePage from "./Pages/Home Page";
import NotFound from "../Pages/Home/Not Found Page"; // import NotFound from "./Pages/Not Found";
import PrivacyPolicy from "../Pages/Privacy Policy & About US & Contact us Page/Privacy Policy Page"; // import PrivacyPolicy from "./Pages/Privacy Policy";
import AboutUs from "../Pages/Privacy Policy & About US & Contact us Page/About Us Page"; // import AboutUs from "./Pages/Aout Us Page";
import ContactPage from "../Pages/Privacy Policy & About US & Contact us Page/Contact us page";

// Auth Pages
import Signup_Page from "../Pages/Authentication/Signup Page"; // import Signup_Page from "./Pages/Auth/Signup Page";
import Signup_Terms_and_Conditions_Section from "../Components/Authentication/Signup/Signup Terms & Conditions Section"; // import Signup_Terms_and_Conditions_Section from "./Components/Auth/Signup Terms & Conditions Section";
import Login_Page from "../Pages/Authentication/Login Page"; // import Login_Page from "./Pages/Auth/Login Page";

// Dashboard Components
import Dashboard from "../Pages/Dashboard/Dashboard Page"; // import Dashboard Page
import Manage_Single_Employee from "../Components/Dashboard Components/Dashboard Sub Components/Employee Management/Manage Single Employee"; // import Manage Single Employee
import Edit_Employee_Details from "../Components/Dashboard Components/Dashboard Sub Components/Employee Management/Edit Employee Details"; // import Edit Employeee Data
import Single_Inventory from "../Components/Dashboard Components/Dashboard Sub Components/Inventory Management/Manage Single Product";
import Edit_Inventory_Details from "../Components/Dashboard Components/Dashboard Sub Components/Inventory Management/Edit Inventory Details";
import Single_Order from "../Components/Dashboard Components/Dashboard Sub Components/Order Management/View Single Order Details";
import Edit_Order_Details from "../Components/Dashboard Components/Dashboard Sub Components/Order Management/Edit Single Order Details";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Privacy" element={<PrivacyPolicy />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Contact" element={<ContactPage />} />

        <Route path="/signup" element={<Signup_Page />} />
        <Route
          path="/signup/process/terms-andconditions"
          element={<Signup_Terms_and_Conditions_Section />}
        />
        <Route path="/login" element={<Login_Page />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/dashboard/employee/:Email/:Phone"
          element={<Manage_Single_Employee />}
        />
        <Route
          path="/dashboard/employee/:Email/:Phone/edit"
          element={<Edit_Employee_Details />}
        />

        <Route
          path="/dashboard/inventory/:Email/:ProductSKU"
          element={<Single_Inventory />}
        />
        <Route
          path="/dashboard/inventory/:Email/:ProductSKU/edit"
          element={<Edit_Inventory_Details />}
        />

        <Route
          path="/dashboard/orders/:Email/:User_id/:OrderID"
          element={<Single_Order />}
        />
        <Route
          path="/dashboard/orders/:Email/:User_id/:OrderID/edit"
          element={<Edit_Order_Details />}
        />
      </Routes>
    </Router>
  );
} // AppRouter is a function that returns a Router component with a Routes component that contains a Route component that renders the HomePage component when the path is '/' and a Route component that renders the NotFound component when the path is '*'.
