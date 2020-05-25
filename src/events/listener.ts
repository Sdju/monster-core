import { Event } from './event';

export interface Listener {
  (event: Event): void | Promise<void>;
}
