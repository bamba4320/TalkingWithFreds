import {AxiosResponse} from 'axios';
import {BaseFetcher} from './Base.fetcher';

describe('BaseFetchers tests', () => {
	it('BaseFetcher to github, return AxiosResponse', async () => {
		const newBaseFetcher = new BaseFetcher('', 'http://www.github.com');
		const response: AxiosResponse = await newBaseFetcher.get('/');
		expect(response.status).toBeGreaterThanOrEqual(200);
		expect(response.status).toBeLessThan(300);
	});
});
