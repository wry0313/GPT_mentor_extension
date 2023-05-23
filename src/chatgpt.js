const ExpiryMap = require('expiry-map');

const cache = new ExpiryMap(10*1000);
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

// async function fetchSSE(
//   resource, options
// )

export async function getChatGPTAccessToken() {
  if (cache.get(KEY_ACCESS_TOKEN)) {
    return cache.get(KEY_ACCESS_TOKEN);
  }
  const resp = await fetch('https://chat.openai.com/api/auth/session');
  if (resp.status === 403) {
    throw new Error('CLOUDFLARE');
  }
  const data = await resp.json().catch(() => ({}));
  if (!data.accessToken) {
    throw new Error('UNAUTHORIZED');
  }
  cache.set(KEY_ACCESS_TOKEN, data.accessToken);
  return data.accessToken;
}

export class ChatGPTProvider {
  constructor(token) {
    this.token = token;
  }

  async fetchModels() {
    const resp = await request(this.token, 'GET', '/models').then((r) => r.json());
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

  async generateAnswer(prompt) {
    const modelName = await this.getModelName()
    console.debug('Using model:', modelName)

    const response = await fetch('https://chat.openai.com/backend-api/conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        action: 'next',
        messages: [
          {
            id: "aaa2511b-7914-421d-bf0d-c4d977e3a337",
            author: {role: 'user'},
            content: {
              content_type: 'text',
              parts: [prompt],
            },
          },
        ],
        model: modelName,
        parent_message_id: "e6e170be-5a4a-411d-863e-3e48ebd7d2d7",
      }),
    });
    console.debug(response);
    
    if (response.ok) {
      const responseBody = await response.text();
      console.log(responseBody)
      console.log()
    } else {
      const errorText = await response.text();
      console.log('Request failed:', response.status);
      console.log('Response body:', errorText);
    }    
  }
}
