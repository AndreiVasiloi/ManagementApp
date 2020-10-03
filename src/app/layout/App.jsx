import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import InventoryDashboard from "../../features/inventory/inventoryDashboard/InventoryDashboard";
import NavBar from "../../features/nav/NavBar";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AppointmentsDashboard from "../../features/appointments/appointmentsDashboard/AppointmentsDashboard";
import ProfitDashboard from "../../features/profit/ProfitDashboard";
import InventoryItemForm from "../../features/inventory/inventoryForm/InventoryItemForm";
import InventoryCategoryForm from "../../features/inventory/inventoryForm/InventoryCategoryForm";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import { Container } from "semantic-ui-react";
import {ToastContainer} from 'react-toastify';
import ErrorComponent from "../common/errors/ErrorComponent";
import InventoryCategoriesDashboard from "../../features/inventory/inventoryCategoriesDashboard/InventoryCategoriesDashboard";
import AppointmentsForm from '../../features/appointments/appointmentsForm/AppointmentsForm';
import AppointmentsReasonsDashboard from "../../features/appointments/appointmentsReasons/AppointmentsReasonsDashboard";
import AppointmentsReasonsForm from "../../features/appointments/appointmentsForm/AppointmentsReasonsForm";

function App() {
  const { key } = useLocation();
  return (
    <>
      <ModalManager />
      <ToastContainer  position='bottom-right' hideProgressBar />
      <Route path='/' exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar/>
           
            <Route path='/appointments' component={AppointmentsDashboard} />
            <Route path='/inventory' component={InventoryDashboard} />
            <Route path='/inventoryCategories' component={InventoryCategoriesDashboard} />
            <Route path='/appointmentsReasons' component={AppointmentsReasonsDashboard} />
            <Route path='/sandbox' component={Sandbox} />
            <Route path='/profit' component={ProfitDashboard} />
            <Route
              path={["/createItem", "/editItem/:id"]}
              component={InventoryItemForm}
              key={key}
            />
            <Route path='/error' component={ErrorComponent} />
             <Route
              path={["/createCategory", "/editCategory/:id"]}
              component={InventoryCategoryForm}
            />
             <Route
              path={["/createReason", "/editReason/:id"]}
              component={AppointmentsReasonsForm}
            />
               <Route
              path={["/createAppointment", "/editAppointment/:id"]}
              component={AppointmentsForm}
            />

           
          </>
        )}
      />
    </>
  );
}

export default App;
