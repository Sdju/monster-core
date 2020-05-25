import type { EventEmitter } from './extended-emitter';

export class Event {
  constructor(name: string, payload: any = undefined) {
    this.name = name;
    this.payload = payload;
  }

  public name: string;

  public payload: any;

  public emitter: null | EventEmitter = null;
}
