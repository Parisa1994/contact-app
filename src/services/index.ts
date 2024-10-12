import { enqueueSnackbar } from "@/components/Snackbar";
import { ServerErrorHandling } from "./errorHandling";
import queryBuilder from "@/utils/queryBuilder";

interface ApiCreatorProps {
  data?: any;
  headers?: HeadersInit;
  method: string;
  query?: any;
  token?: string;
  url: string;
  ott?: string;
  hasErr?: boolean;
  isRefresh?: boolean;
  isFormData?: boolean;
  isBinary?: boolean;
  collectionName?: string;
  signal?: AbortSignal;
}

export type baseQuery = {
  offset?: number;
  sort?: {
    order?: "asc" | "desc";
    orderBy?: string;
  };
  limit?: number;
  search?: string;
};

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
}: ApiCreatorProps) => {
  const Authorization_ = localStorage.getItem("access_token") || token;
  const customConfig: RequestInit = {
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
      `${process.env.SERVER_BASE_URL}${url}${query && queryBuilder(query)}`,
      customConfig
    ).then(async (res) => {
      if (isBinary) {
        return res.blob();
      }
      if (res?.status >= 200 && res?.status <= 299) {
        switch (res?.status) {
          case 204:
            collectionName &&
              enqueueSnackbar(`${collectionName} موردنظر با موفقیت حذف شد`);
            return true;
          case 200:
            (method == "PUT" || method == "PATCH") &&
              collectionName &&
              enqueueSnackbar(`${collectionName} موردنظر با موفقیت ویرایش شد`);
            break;
          case 201:
            collectionName &&
              enqueueSnackbar(`${collectionName} موردنظر با موفقیت ایجاد شد`);
            break;
        }
        return res.json();
      } else {
        return ServerErrorHandling(await res.json(), isRefresh, res?.status);
      }
    });
  } catch (error: any) {
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
  static GET = (props: Omit<ApiCreatorProps, "method">) =>
    ApiCreator({ ...props, method: "GET" });

  static POST = (props: Omit<ApiCreatorProps, "method">) =>
    ApiCreator({ ...props, method: "POST" });

  static PUT = (props: Omit<ApiCreatorProps, "method">) =>
    ApiCreator({ ...props, method: "PUT" });

  static PATCH = (props: Omit<ApiCreatorProps, "method">) =>
    ApiCreator({ ...props, method: "PATCH" });

  static DELETE = (props: Omit<ApiCreatorProps, "method">) =>
    ApiCreator({ ...props, method: "DELETE" });
}

export default Api;
