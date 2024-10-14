import { enqueueSnackbar } from "../components/Snackbar";
import { ServerErrorHandling } from "./errorHandling";
import queryBuilder from "../utils/queryBuilder";

const apiUrl = process.env.REACT_APP_SERVER_BASE_URL;

const ApiCreator = async ({
  data,
  headers,
  method,
  query = "",
  token,
  url,
  ott,
  isRefresh,
  isFormData = false,
  isBinary = false,
  collectionName = "",
  signal,
}) => {
  const Authorization_ = localStorage.getItem("access_token") || token;
  const customConfig = {
    headers: {
      "Accept-Language": "fa",
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(Authorization_ &&
        typeof Authorization_ === "string" && {
          Authorization: `Bearer ${Authorization_}`,
        }),
      ...(ott && { token: `${ott}` }),
      ...(headers && { ...headers }),
    },
    method: method,
    body: isFormData ? data : JSON.stringify(data),
    signal,
  };
  try {
    return await fetch(
      `${apiUrl}${url}${query && queryBuilder(query)}`,
      customConfig
    ).then(async (res) => {
      if (isBinary) {
        return res.blob();
      }
      if (res?.status >= 200 && res?.status <= 299) {
        return res.json();
      } else {
        return ServerErrorHandling(await res.json(), isRefresh, res?.status);
      }
    });
  } catch (error) {
    if (error instanceof TypeError) {
      enqueueSnackbar(
        "مشکل در اتصال به اینترنت در صورت استفاده از فیلتر شکن آن را خاموش کنید",
        {
          variant: "error",
        }
      );
    } else {
      throw error;
    }
  }
};

class Api {
  static GET = (props) => ApiCreator({ ...props, method: "GET" });

  static POST = (props) => ApiCreator({ ...props, method: "POST" });

  static PUT = (props) => ApiCreator({ ...props, method: "PUT" });

  static PATCH = (props) => ApiCreator({ ...props, method: "PATCH" });

  static DELETE = (props) => ApiCreator({ ...props, method: "DELETE" });
}

export default Api;
