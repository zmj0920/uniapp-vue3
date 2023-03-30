const apiEnv: ApiEnv = 'dev';

const envMap = {
  dev: {
    baseUrl: 'http://demo.rageframe.com',
    apiBaseUrl: 'http://demo.rageframe.com/api'
  },
  beta: {
    baseUrl: 'http://demo.rageframe.com',
    apiBaseUrl: 'https://m.betaapi.xxx.com'
  },
  prod: {
    baseUrl: 'http://demo.rageframe.com',
    apiBaseUrl: 'https://m.api.xxx.com'
  },
  local: {
    baseUrl: 'http://demo.rageframe.com',
    apiBaseUrl: 'https://m.devapi.xxx.com'
  }
};

type ApiEnv = keyof typeof envMap;
type Env<T extends ApiEnv> = {
  apiEnv: T;
} & (typeof envMap)[T];

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
  return Object.assign({ apiEnv }, envMap[apiEnv]);
}

const env = createEnv(apiEnv);
export default env;
