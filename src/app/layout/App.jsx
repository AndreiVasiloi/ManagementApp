import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import InventoryDashboard from "../../features/inventory/inventoryDashboard/InventoryDashboard";
import NavBar from "../../features/nav/NavBar";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AppointmentsDashboard from "../../features/appointments/appointmentsDashboard/AppointmentsDashboard";
import ProfitDashboard from "../../features/profit/profitDashboard/ProfitDashboard";
import InventoryItemForm from "../../features/inventory/inventoryForm/InventoryItemForm";
import Sandbox from "../../features/sandbox/Sandbox";

function App() {
  const { key } = useLocation();
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Route path="/appointments" component={AppointmentsDashboard} />
            <Route path="/inventory" component={InventoryDashboard} />
            <Route path="/sandbox" component={Sandbox} />
            <Route path="/profit" component={ProfitDashboard} />
            <Route
              path={["/createItem", "/editItem/:id"]}
              component={InventoryItemForm}
              key={key}
            />
          </>
        )}
      />
    </>
  );
}

export default App;
