import { Config } from "./config-loader";
import { UrlString, VersionString } from "./internal/types";

export interface PluginLoaderFunction {
  (config: Config): Promise<Plugin> | Plugin;
}

export interface PluginInfo {
  name: string,
  version: VersionString,
  author?: string,
  description?: string,
  homepage?: UrlString,
  git?: UrlString,
}

export class Plugin {
  constructor(config: Config) {
  }

  getInfo(): PluginInfo {
    return {
      name: this.name,
      version: this.version,
    }
  }

  public name: string = '';
  public version: string = '0.0.0';
}
