import { EventMiddleware } from './event-middleware';
import { Listener } from './listener';
import { Event } from './event';
import { CancelError } from "./cancel-error";

export class EventEmitter {
  on(eventName: string, listener: Listener) {
    const curListeners = this.eventListeners.get(eventName);
    if (curListeners instanceof Set) {
      curListeners.add(listener);
    } else if (typeof curListeners === 'function') {
      this.eventListeners.set(eventName, new Set([
        curListeners,
        listener,
      ]));
    } else if (typeof listener === 'function') {
      this.eventListeners.set(eventName, listener);
    }
    return this;
  }

  once(eventName: string, listener: Listener) {
    const cancel = (event: Event) => {
      listener(event);
      this.off(eventName, listener);
    };
    this.on(eventName, cancel);
  }

  off(eventName: string, listener: Listener) {
    const curListeners = this.eventListeners.get(eventName);
    if (curListeners instanceof Set) {
      curListeners.delete(listener);
    } else if (curListeners === listener) {
      this.eventListeners.delete(eventName);
    }
    return this;
  }

  async emit(event: Event) {
    const eventName = event.name;
    event.emitter = this;
    try {
      const middlewares = this.eventMiddlewares.get(eventName);
      if (middlewares) {
        for (const middleware of middlewares) {
          await middleware(event);
        }
      }

      const listeners = this.eventMiddlewares.get(eventName);
      if (listeners instanceof Set) {
        const results = Array
          .from(listeners)
          .map(listener => listener(event));
        await Promise.all(results);
      } else if (typeof listeners === 'function') {
        await listeners(event);
      }
    } catch (error) {
      if (error instanceof CancelError) {
        return;
      }
      throw error;
    }
  }

  eventListeners: Map<string, Listener | Set<Listener>> = new Map();

  eventMiddlewares: Map<string, EventMiddleware[]> = new Map();
}
