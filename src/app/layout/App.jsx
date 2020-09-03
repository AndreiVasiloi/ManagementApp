import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import InventoryDashboard from "../../features/inventory/inventoryDashboard/InventoryDashboard";
import NavBar from "../../features/nav/NavBar";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AppointmentsDashboard from "../../features/appointments/appointmentsDashboard/AppointmentsDashboard";
import ProfitDashboard from "../../features/profit/profitDashboard/ProfitDashboard";
import InventoryItemForm from "../../features/inventory/inventoryForm/InventoryItemForm";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <>
      <Route path='/' exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route path='/appointments' component={AppointmentsDashboard} />
              <Route path='/inventory' component={InventoryDashboard} />
              <Route path='/profit' component={ProfitDashboard} />
              <Route path={['/createItem', 'editItem/:id']} component={InventoryItemForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
