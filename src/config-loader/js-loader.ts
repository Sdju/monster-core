import { promises } from 'fs';
import { Loader, makeLoader } from "./loader";

const { readFile } = promises;

export interface JsLoaderParams {
  path: string;
}

export function jsLoader(params: JsLoaderParams): Loader {
  return makeLoader(async (loaderParams) => {
    const options = { encoding: <string>loaderParams.encoding ?? 'UTF-8' };
    return import(params.path);
  }, params);
}
