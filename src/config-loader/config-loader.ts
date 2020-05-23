import { ClientOptions } from 'discord.js'

import { Loader, LoaderParams } from "./loader";


export interface ConfigLoaderOptions {
  loaders?: Loader[],
  resolvers?: Resolver[],
}

export interface Config {
  discordKey?: string;
  discordClientOptions?: ClientOptions;
  plugins?: string[];
  modules?: string[];
  [option: string]: any;
}

export interface Resolver {
  (config: Config, params: ConfigLoaderOptions): Config
}

export class ConfigParamRequiredError extends Error {
  constructor(param: string) {
    super();
    this.name = 'ConfigParamRequiredError';
    this.param = param;
    this.message = `Config param '${param}' is required`;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConfigParamRequiredError);
    } else {
      this.stack = (new Error()).stack;
    }
  }

  public readonly param: String;
}

export class ConfigLoader {
  public constructor(options: ConfigLoaderOptions) {
    this.loaders = options.loaders ?? [];
    this.resovlers = options.resolvers ?? [];
  }

  public async load(params: LoaderParams = {}): Promise<Config> {
    const configs = await Promise.all(this.loaders.map(loader => loader(params)));
    const config = Object.assign({}, ...configs);
    const resolverApply = (config: Config, resolver: Resolver) => resolver(config, params);
    return this.resovlers.reduce(resolverApply, config);
  }

  protected loaders: Loader[];
  protected resovlers: Resolver[] = [];
}
