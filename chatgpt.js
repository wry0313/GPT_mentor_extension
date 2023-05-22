// const ExpiryMap = require('expiry-map');

// const cache = new ExpiryMap(10*1000);
const KEY_ACCESS_TOKEN = 'accessToken';

async function request(token, method, path, data = undefined) {
  return fetch(`https://chat.openai.com/backend-api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
}

export async function getChatGPTAccessToken() {
  // if (cache.get(KEY_ACCESS_TOKEN)) {
  //   return cache.get(KEY_ACCESS_TOKEN);
  // }
  const resp = await fetch('https://chat.openai.com/api/auth/session');
  if (resp.status === 403) {
    throw new Error('CLOUDFLARE');
  }
  const data = await resp.json().catch(() => ({}));
  if (!data.accessToken) {
    throw new Error('UNAUTHORIZED');
  }
  // cache.set(KEY_ACCESS_TOKEN, data.accessToken);
  return data.accessToken;
}

export class ChatGPTProvider {
  constructor(token) {
    this.token = token;
  }

  async fetchModels() {
    const resp = await request(this.token, 'GET', '/models').then((r) => r.json());
    console.log("fetch model respncee:", resp);
    return resp.models;
  }

  async getModelName() {
    try {
      const models = await this.fetchModels();
      return models[0].slug;
    } catch (err) {
      console.error(err);
      return 'text-davinci-002-render';
    }
  }
}
