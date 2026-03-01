import { dataSource } from './APIConnection';
import Endpoint from './Endpoint';

global.fetch = jest.fn();

describe('fetchCountryStats', () => {

  const apiKey = 'test-api-key';
  const country = 'India';
  const date = '2024-01-01';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return data when response is ok', async () => {
    const mockData = { cases: 1000 };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await dataSource.countryStats(apiKey, country, date);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  test('should throw client error for 4xx response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => 'Not Found'
    });

    await expect(
      dataSource.countryStats(apiKey, country, date)
    ).rejects.toThrow('Client Error (404): Not Found');
  });

  test('should throw server error for 5xx response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    await expect(
      dataSource.countryStats(apiKey, country, date)
    ).rejects.toThrow(
      'Server Error (500). Please try again later.'
    );
  });

  test('should return undefined if country is empty', async () => {
    const result = await dataSource.countryStats(apiKey, '', date);

    expect(fetch).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

});

describe('fetchCountryComparisionStats', () => {

  const apiKey = 'test-api-key';
  const date = '2024-01-01';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should throw error if less than 2 countries provided', async () => {
    await expect(
      dataSource.comparisionStats(apiKey, 'India', '', '', '', date)
    ).rejects.toThrow(
      'At least 2 countries are required for comparison.'
    );

    expect(fetch).not.toHaveBeenCalled();
  });

  test('should return data when response is ok', async () => {
    const mockData = [{ country: 'India' }, { country: 'USA' }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await dataSource.comparisionStats(
      apiKey,
      'India',
      'USA',
      '',
      '',
      date
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  test('should throw client error for 4xx response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => 'Bad Request'
    });

    await expect(
      dataSource.comparisionStats(
        apiKey,
        'India',
        'USA',
        '',
        '',
        date
      )
    ).rejects.toThrow('Client Error (400): Bad Request');
  });

  test('should throw server error for 5xx response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 503
    });

    await expect(
      dataSource.comparisionStats(
        apiKey,
        'India',
        'USA',
        '',
        '',
        date
      )
    ).rejects.toThrow(
      'Server Error (503). Please try again later.'
    );
  });

});