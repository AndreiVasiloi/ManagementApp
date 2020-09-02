import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import InventoryDashboard from "../../features/inventory/inventoryDashboard/InventoryDashboard";
import NavBar from "../../features/nav/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <InventoryDashboard />
    </>
  );
}

export default App;
