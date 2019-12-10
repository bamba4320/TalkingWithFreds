export interface SiteConfigurations {
	messagesKeys: number[];
	imagesPath: string;
	faqImplement: number;
	productToMemberAnimationTime: number;
	headCategoryId: number;
	giftsToFamilyAndFriendsID: number;
	homepageCyclicImageSpeed: number;
	numOfBenefitsInGifts: number;
}

export default class ConfigurationStore {
	// tslint:disable-next-line: variable-name
	private _configuration!: SiteConfigurations;

	constructor(configurationStoreInitialData?: ConfigurationStore) {
		if (configurationStoreInitialData) {
			this._configuration = configurationStoreInitialData._configuration;
		}
	}

	/**
	 * This method should call once - In _app - `App` component of next/js
	 * return the configuration loaded (should be static `configuration.json` file)
	 * return replicated item, not the cachedConfiguration
	 */
	public async loadConfiguration(configurationJson: SiteConfigurations): Promise<SiteConfigurations> {
		this._configuration = configurationJson;
		return configurationJson;
	}

	get configuration() {
		return this._configuration;
	}
}
