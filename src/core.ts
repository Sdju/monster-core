import { Client } from'discord.js';
import { Hook, Controller, Container } from "hooking/lib";
import ConfigLoader from "./config-loader/config-loader";

export default class Core {
  constructor() {
  }

  public readonly controller: Controller = new Controller();
  public readonly client!: Client;
}
