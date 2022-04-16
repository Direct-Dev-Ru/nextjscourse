export const isDev: boolean = process.env.NODE_ENV === 'development';

export const logga: (message: string, ...restMessages: any[]) => void = (message: string, ...restMessages: any[]) => {
  if (isDev) {
    console.log(message);
    for (const mes of restMessages) {
      console.log(mes);
    }
  }
};
