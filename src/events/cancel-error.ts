export class CancelError extends Error {
  constructor() {
    super();
    this.name = CancelError.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CancelError);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}
