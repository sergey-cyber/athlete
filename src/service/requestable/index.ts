interface RequestParams {
  path: string;
}

export class Requestable {
  protected path: string;
  constructor(path: string) {
    this.path = process.env.API_URL + path;
  }

  protected async makeRequest<T>({ path }: RequestParams) {
    console.info("Start request to " + this.path + path);
    const response = await fetch(this.path + path);
    return (await response.json()) as T;
  }
}
