import EnvConfig from './env.config';

// import siteConfiguration from './site.config';

describe('envConfiguration tests', () => {
	it('All env variables exists', async () => {
		expect(EnvConfig.getNodeEnv()).toBe('test');
		expect(EnvConfig.getAppEnv()).toBeDefined();
	});
});

describe('siteConfiguration tests', () => {
	it('configuration return', async () => {
		const response = {data: {data: {messagesKeys: [1, 2, 3, 4]}}};
		jest.mock('axios', () => {
			return jest.fn().mockImplementation(() => {
				return {get: response};
			});
		});

		// expect(siteConfiguration.configuration).toBeUndefined();
		// await siteConfiguration.loadConfiguration();
		// expect(siteConfiguration.configuration).toBeDefined();
	});
});
