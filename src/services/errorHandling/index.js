// import { enqueueSnackbar } from "../../components/Snackbar";

export const ServerErrorHandling = (err, hasToast = true, status = 0) => {
  switch (status) {
    case 403:
    case 401:
      console.log(err?.message, { variant: "error" });
      break;
    default:
      if (hasToast) {
        if (typeof err?.message === "object" && err?.message !== null) {
          Object.keys(err?.message).forEach(function (key) {
            console.log(err?.message[key][0], { variant: "error" });
            console.log("error::::::::::>", err?.message[key][0]);
          });
        } else {
          console.log(err?.message, { variant: "error" });
          console.log("error::::::::::>", err?.message);
        }
      }
  }
  throw err;
};
