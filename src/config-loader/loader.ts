import { Config } from "./config-loader";

export interface LoaderParams {
  [param: string]: any;
}

export interface Loader {
  (params: LoaderParams): Config | Promise<Config>
}

export function makeLoader(handler: Loader, params: LoaderParams): Loader {
  return (loaderParams: LoaderParams) => {
    return handler({ ...loaderParams, ...params })
  }
}
