export default async function getTickTok(account: string) {
  const url = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${account}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // ! remove for production
    // mode: 'cors',

    cache: 'no-cache',
  });
  const data = await res.json();
  return data;
}
