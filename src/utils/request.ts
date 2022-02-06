import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TOKEN_KEY } from 'app/components/common/Constants';

interface IToken {
  headers?: {
    [key: string]: string;
  };
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [configs] The configs we want to pass to "axios"
 *
 * @return {object}           The response data
 */
export async function request(
  config: AxiosRequestConfig,
): Promise<AxiosResponse> {
  const token = window.localStorage[TOKEN_KEY];
  const withData = config.data ? { data: config.data } : {};
  const withBearerToken = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
  const args = { ...config, ...withData, ...withBearerToken };
  const fetchResponse = await axios(args);
  return fetchResponse;
}
