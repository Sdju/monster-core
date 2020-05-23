import { parse } from 'dotenv'

import { Options } from "yargs-parser";
import { Loader, makeLoader } from "./loader";

export interface EnvLoaderParams {
  args: string | string[];
  options?: Options;
}

export function envLoader(params: EnvLoaderParams): Loader {
  return makeLoader(async (loaderParams) => {
    const args = loaderParams.args ?? process.env;
    return parse(args, loaderParams.options);
  }, params);
}
