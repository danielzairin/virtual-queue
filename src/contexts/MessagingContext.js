import { useEffect, createContext, useState } from "react";
import { messaging } from "../firebase";
import { useSnackbar } from "notistack";

export const MessagingContext = createContext();

function MessagingContextProvider(props) {
  const [payload, setPayload] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    return messaging.onMessage((payload) => {
      setPayload(payload);

      let variant = "error";

      if (payload.notification.body === "You may now enter the establishment.")
        variant = "success";

      enqueueSnackbar(payload.notification.body, {
        variant: variant,
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
      });
    });
  }, [enqueueSnackbar]);

  return (
    <MessagingContext.Provider value={payload}>
      {props.children}
    </MessagingContext.Provider>
  );
}

export default MessagingContextProvider;
