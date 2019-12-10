import OptionsDTO from 'common/models/DTOs/Options.dto';
import RegionDTO from 'common/models/DTOs/Region.dto';
import {IObservableArray, observable} from 'mobx';
import {BaseFetcher} from './base/Base.fetcher';

class AddressesFetcher extends BaseFetcher {
	public async getAreaFilters() {
		const regionDtoList: RegionDTO[] = await this.get('/getRegions'); // should be in adress fetcher
		const AreaFilterArray: IObservableArray<OptionsDTO> = observable([]);
		AreaFilterArray.replace(
			regionDtoList.map((regionDto) => {
				return new OptionsDTO(regionDto.regionId, regionDto.regionName);
			})
		);
		return AreaFilterArray;
	}
}
export default new AddressesFetcher(`addresses`);
