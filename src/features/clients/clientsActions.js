import { FETCH_CLIENT } from "./clientsConstants";

export function listenToClients(clients) {
    return {
      type: FETCH_CLIENT,
      payload: clients,
    };
  }
