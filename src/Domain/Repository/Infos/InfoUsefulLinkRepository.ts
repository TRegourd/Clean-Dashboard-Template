import { Info } from '../../Model/Infos/Info';

export interface InfoUsefulLinkRepository {
	getUsefulLinks(): Promise<Info[]>;
}
