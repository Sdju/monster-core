import { EventEmitter } from 'events';
import { Client } from 'discord.js';

import {
  ConfigLoader,
  Config,
  ConfigParamRequiredError,
  LoaderParams,
} from '../config-loader';
import { PluginLoader } from '../pluginLoader';
import { ModuleLoader } from '../moduleLoader';
import { CoreInitBeforeConfigLoadedError } from './core-init-before-config-loaded-error';

enum CoreEvents {
  RUN_BEFORE = 'run:before',
  RUN_BEFORE = 'run:before',
  INIT = 'init',
}

export class Core extends EventEmitter {
  constructor(configLoader: ConfigLoader) {
    super();
    this.configLoader = configLoader;
  }

  async init(params: LoaderParams) {
    this.config = await this.loadParams(params);
    await this.loadPlugins(this.config);
    await this.initClient(this.config);
    await this.emit(Core.Events.INIT);
  }

  protected async loadParams(params: LoaderParams): Promise<Config> {
    return this.configLoader.load(params);
  }

  protected async loadPlugins(config: Config): Promise<void> {
    if (!config) {
      throw new CoreInitBeforeConfigLoadedError();
    }

    if (config.plugins) {
      this.pluginLoader.add(config.plugins);
    }
    await this.pluginLoader.load(config);
  }

  protected async initClient(config: Config): Promise<void> {
    if (!config) {
      throw new CoreInitBeforeConfigLoadedError();
    }

    if (!config.discordKey) {
      throw new ConfigParamRequiredError('discordKey');
    }

    this.client = new Client(config.discordClientOptions);
  }

  protected async run() {
    this.client.login();
  }

  public configLoader: ConfigLoader;

  public pluginLoader: PluginLoader = new PluginLoader();

  public moduleLoader: ModuleLoader = new ModuleLoader();

  public config: Config | null = null;

  public client!: Client;

  static Events = CoreEvents;
}
