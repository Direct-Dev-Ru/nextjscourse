interface initConfiguration {
  [prop: string]: string;
}

export class AppConfig {
  private static instance: AppConfig;
  protected __baseURL: string;
  protected __defaultPath: string;
  protected __fetcher = (url: string) => fetch(url).then((res) => res.json());
  protected __defaultFilterEventsFunction = (e: any | undefined) => true;

  private constructor(initial: initConfiguration) {
    this.__baseURL = initial?.baseURL ?? 'http://localhost:3000/api/';
    this.__defaultPath = initial?.defaultPath ?? '';
  }

  static getInstance(initial: initConfiguration) {
    if (AppConfig.instance) {
      return this.instance;
    }
    this.instance = new AppConfig(initial);
    return this.instance;
  }

  public get fetcher() {
    return this.__fetcher;
  }

  public get defaultFilterEventsFunction() {
    return this.__defaultFilterEventsFunction;
  }

  public get URL(): string {
    return this.__baseURL;
  }

  public set URL(v: string) {
    this.__baseURL = v;
  }
  public get defaultPath(): string {
    return this.__defaultPath;
  }

  public set defaultPath(v: string) {
    this.__defaultPath = v;
  }
}

const apiConfig = {
  extURL: `https://test-project-eab59-default-rtdb.firebaseio.com/`,
  URL: `http://localhost:3000/api/`,

  fetcher: (url: string) => fetch(url).then((res) => res.json()),
  ext_defaultPath: 'events.json',
  defaultPath: 'events',
  defaultFilterEventsFunction: (e: any | undefined) => true,
};

export const appConfig = AppConfig.getInstance({ baseURL: 'http://localhost:3000/api/', defaultPath: 'events' });

export default apiConfig;
