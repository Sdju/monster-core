
export class Event {
  constructor(name: string, payload: string) {
    this.name = name;
  }

  public name: string;
  public payload: any;
  private canceled: boolean = false;

  stopPropagation() {
    this.canceled = true;
    throw
  }
}
