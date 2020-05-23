export class CoreInitBeforeConfigLoadedError extends Error {
  constructor() {
    super('Core init before config loaded');
    this.name = 'CoreInitBeforeConfigLoadedError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CoreInitBeforeConfigLoadedError);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}
