import parse, { Options } from 'yargs-parser';
import { Loader, makeLoader } from "./loader";

export interface ArgLoaderParams {
  args: string | string[];
  options?: Options;
}

export function argLoader(params: ArgLoaderParams): Loader {
  return makeLoader(async (loaderParams) => {
    const args = loaderParams.args ?? process.argv;
    return parse(args, loaderParams.options);
  }, params);
}
