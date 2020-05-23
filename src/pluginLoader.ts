import { PathString } from "./internal/types";
import { Plugin, PluginLoaderFunction } from "./plugin";
import { Config } from "./config-loader";

export class PluginLoader {
  constructor() {
  }

  add(pluginsList: PathString | PathString[]) {
    if (typeof pluginsList === 'string') {
      this.pluginsPaths.push(pluginsList);
    } else {
      this.pluginsPaths.push(...pluginsList);
    }
  }

  async load(config: Config) {
    for (const pluginPath of this.pluginsPaths) {
      const pluginLoader: PluginLoaderFunction = <any>import(pluginPath);
      this.plugins.push(await pluginLoader(config));
    }
  }

  async run() {

  }

  pluginsPaths: PathString[] = [];
  plugins: Plugin[] = [];
}
