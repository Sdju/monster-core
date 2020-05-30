export class ConfigParamRequiredError extends Error {
  constructor(param: string) {
    super();
    this.name = 'ConfigParamRequiredError';
    this.param = param;
    this.message = `Config param '${param}' is required`;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConfigParamRequiredError);
    } else {
      this.stack = (new Error()).stack;
    }
  }

  public readonly param: String;
}
