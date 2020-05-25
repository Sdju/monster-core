import { Event } from './event';

export interface EventMiddleware {
  (event: Event): void | Promise<void>;
}
