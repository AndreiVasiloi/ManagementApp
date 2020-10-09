import { FETCH_REASON } from "./appointmentsConstants";

  export function listenToReasons(reasons) {
    const parsedReasons = reasons.map((reason) => ({
      ...reason,
      displayPrice: reason.price + " RON"
    }));
    return {
      type: FETCH_REASON,
      payload: parsedReasons,
    };
  }
  

  