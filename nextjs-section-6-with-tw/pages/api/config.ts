const apiConfig = {
  URL: `https://test-project-eab59-default-rtdb.firebaseio.com/`,
  fetcher: (url: string) => fetch(url).then((res) => res.json()),
  defaultPath: 'events.json',
  defaultFilterEventsFunction: (e: any | undefined) => true,
};

export default apiConfig;
