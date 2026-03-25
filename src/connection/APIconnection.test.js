import { dataSource } from './APIConnection';
import Endpoint from './Endpoint';
import errors from '../error/Errors';

global.fetch = jest.fn();

jest.mock('./Endpoint', () => ({
  latestStat: 'https://api.com/{country}/{referencedDate}',
  getComparision: 'https://api.com/compare'
}));

jest.mock('../error/Errors', () => ({
  clientError: class ClientError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
  },
  serverError: class ServerError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
  },
  networkError: class NetworkError extends Error {}
}));

test('fetchCountryStats returns data on success', async () => {
  const mockData = { cases: 100 };

  fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockData)
  });

  const result = await dataSource.countryStats('key', 'India', '2024');

  expect(result).toEqual(mockData);
  expect(fetch).toHaveBeenCalled();
});

test('fetchCountryStats throws clientError on 4xx', async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 404,
    text: jest.fn().mockResolvedValue('Not Found')
  });

  await expect(
    dataSource.countryStats('key', 'India', '2024')
  ).rejects.toBeInstanceOf(errors.clientError);
});

test('fetchCountryStats throws serverError on 5xx', async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 500
  });

  await expect(
    dataSource.countryStats('key', 'India', '2024')
  ).rejects.toBeInstanceOf(errors.serverError);
});

test('fetchCountryStats throws networkError on fetch failure', async () => {
  fetch.mockRejectedValue(new TypeError('Failed to fetch'));

  await expect(
    dataSource.countryStats('key', 'India', '2024')
  ).rejects.toBeInstanceOf(errors.networkError);
});

test('fetchCountryStats returns undefined if country is empty', async () => {
  const result = await dataSource.countryStats('key', '   ', '2024');
  expect(result).toBeUndefined();
  expect(fetch).not.toHaveBeenCalled();
});

test('fetchCountryComparisionStats builds query params correctly', async () => {
  const mockData = { result: 'ok' };

  fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockData)
  });

  const countries = ['India', 'USA'];

  const result = await dataSource.comparisionStats('key', countries, '2024');

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('country1=India'),
    expect.any(Object)
  );

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('country2=USA'),
    expect.any(Object)
  );

  expect(result).toEqual(mockData);
});

test('fetchCountryComparisionStats throws networkError on failure', async () => {
  fetch.mockRejectedValue(new TypeError('Failed to fetch'));

  await expect(
    dataSource.comparisionStats('key', ['India'], '2024')
  ).rejects.toBeInstanceOf(errors.networkError);
});