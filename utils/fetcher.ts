export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('エラーが発生したため、データの取得が発生しました。');
  }
  const json = await response.json();
  return json;
};

export const searchFetcher = async (url: string, params: any) => {
  const query_params = new URLSearchParams(params);

  const response = await fetch(url + query_params);
  if (!response.ok) {
    throw new Error('エラーが発生したため、データの取得が発生しました。');
  }
  const json = await response.json();
  return json;
};
