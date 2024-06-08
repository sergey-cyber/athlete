export class RequestError {
  status: number;
  message: string;

  constructor({ message, status }: { message: string; status: number }) {
    this.status = status;
    this.message = message;
  }
}
