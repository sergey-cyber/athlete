export class RequestExeption {
  constructor(public status: number | undefined, public message: string) {
    this.status = status;
    this.message = message;
  }
}
