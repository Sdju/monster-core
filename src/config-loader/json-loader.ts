import { promises } from 'fs';
import { Loader, makeLoader } from "./loader";

const { readFile } = promises;

export interface JsonLoaderParams {
  path: string;
  encoding?: string;
}

export default function JsonLoader(params: JsonLoaderParams): Loader {
  return makeLoader(async (loaderParams) => {
    const options = { encoding: <string>loaderParams.encoding ?? 'UTF-8' };
    const file = <string>await readFile(loaderParams.path, options);
    return JSON.parse(file);
  }, params);
}
