import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToClients } from "../clientsActions";
import ClientsNav from "../clientsNav/ClientsNav";
import ClientsList from "./ClientsList";
import classes from "../../../css/Dashboard.module.css";
import InventoryListItemPlaceholder from "../../inventory/inventoryDashboard/InventoryListItemPlaceholder";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToClientsFromFirestore } from "../../../app/firestore/firestoreService";

export default function ClientsDashboard() {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.client);
  const { currentUser } = useSelector((state) => state.auth);
  const currentUserClients = clients.filter(
    (client) => client?.userUid === currentUser?.uid
  );
  const { loading } = useSelector((state) => state.async);
  const [text, setText] = useState("");
  const textLowered = text.trim().toLowerCase();
  const filteredClients =
    text === ""
      ? currentUserClients
      : currentUserClients.filter((client) =>
          handleFilter(client, textLowered)
        );

  function handleFilter(client, text) {
    const keys = Object.keys(client).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = client[key];
      return value.toString().toLowerCase();
    });

    return values.some((value) => value.includes(text));
  }

  useFirestoreCollection({
    query: () => listenToClientsFromFirestore(),
    data: (clients) => dispatch(listenToClients(clients)),
    deps: [dispatch],
  });

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <ClientsNav setText={setText} />
            {loading && (
              <>
                <InventoryListItemPlaceholder />
                <InventoryListItemPlaceholder />
              </>
            )}
            <ClientsList clients={filteredClients} />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
