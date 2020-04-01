import CurrentUserStore from './CurrentUser.store';
import {clearInterval} from 'timers';
import TalkingWithFredsLocalStorage from '../../Infrastructure/Utils/LocalStorage/TalkingWithFredsLocalStorage';

const MINUTES_UNITL_AUTO_LOGOUT = 150; // in mins
const CHECK_INTERVAL = 10000; // in ms

export default class AutoLogoutStore {
	private currentUserStore: CurrentUserStore;
	private interval: any;

	constructor(currentUserStore: CurrentUserStore) {
		this.currentUserStore = currentUserStore;
	}


	// init startup
	public initAutoLogout(){
		this.reset();
		this.check();
		this.initListener();
		this.initInterval();
	}


	// get and set the last action time to keep track.

	get lastAction() {
		return parseInt(TalkingWithFredsLocalStorage.getlastActionFromLocalStorage());
	}
	set lastAction(value: number) {
		TalkingWithFredsLocalStorage.savelastActionToLocalStorage(value);
	}

	// add listener for clicking on the screen
	initListener() {
		document.body.addEventListener('click', () => this.reset());
	}

	// reset the last action time after clicking
	reset() {
		this.lastAction = Date.now();
	}

	// check the last action time every x time
	initInterval() {
		this.interval = setInterval(() => {
			this.check();
		}, CHECK_INTERVAL);
	}

	clearCheckInterval() {
		clearInterval(this.interval);
	}

	// check if the in activity time is greater then what as been declared on top.
	check() {
		const now = Date.now();
		const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
		const diff = timeleft - now;
		const isTimeout = diff < 0;

		if (isTimeout && this.currentUserStore.isUserLoggedIn) {
			this.currentUserStore.logout();
		}
	}
}
