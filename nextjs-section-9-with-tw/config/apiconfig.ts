interface initApiConf {
  [prop: string]: string;
}

export class ApiConfig {
  private static instance: ApiConfig;
  protected __mongoDbURI: string;

  private constructor(initial: initApiConf) {
    this.__mongoDbURI = initial?.defaultMongoDbURI ?? '';
  }

  static getInstance(initial: initApiConf) {
    if (ApiConfig.instance) {
      return this.instance;
    }
    this.instance = new ApiConfig(initial);
    return this.instance;
  }

  public get mongoDbURI(): string {
    return this.__mongoDbURI;
  }
  public set mongoDbURI(v: string) {
    this.__mongoDbURI = v;
  }
}
const envMongoUri: string = process.env?.MONGO_URI ?? '';

export const apiConf = ApiConfig.getInstance({
  defaultMongoDbURI: envMongoUri,
});
