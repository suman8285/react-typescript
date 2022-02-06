import axios from 'axios';
import { request } from '../request';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('request', () => {
  let apiConfig;
  beforeEach(() => {
    apiConfig = {
      url: '/thosdoesnotexist',
      method: 'get',
    };
  });

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    let response;
    beforeEach(() => {
      response = {
        data: {
          hello: 'world',
        },
        status: 200,
      };

      mockedAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    });

    it('should format the response correctly', () => {
      request(apiConfig).then(response => {
        expect(response.status).toBe(200);
        expect(response.data).toBe({ hello: 'world' });
      });
    });
  });

  describe('stubbing error response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const error = {
        response: {
          status: 404,
          statusText: 'Not Found',
          headers: {
            'Content-type': 'application/json',
          },
        },
      };

      mockedAxios.get.mockReturnValue(Promise.reject(error));
    });

    it('should catch errors', () => {
      request(apiConfig).catch(err => {
        expect(err.response.status).toBe(404);
        expect(err.response.statusText).toBe('Not Found');
      });
    });
  });
});
