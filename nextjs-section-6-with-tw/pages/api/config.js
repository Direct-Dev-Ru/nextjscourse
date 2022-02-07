const apiConfig = {
  URL: `https://test-project-eab59-default-rtdb.firebaseio.com/`,
  fetcher: (url) => fetch(url).then((res) => res.json()),
  defaultPath: 'events.json',
};

export default apiConfig;
