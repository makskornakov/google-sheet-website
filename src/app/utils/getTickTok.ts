export default async function getTickTok(account: string) {
  // https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015

  const url = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${account}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

    cache: 'no-cache',
  });
  const data = await res.json();
  return data;
}
