import {MODAL_HASHTAG} from 'BL/stores/Modal.store';
import {SingletonRouter} from 'next/router';

export function getQueryParam(router: SingletonRouter, queryKey: string) {
	return router.query![queryKey];
}

export function isCurrentUrl(router: SingletonRouter, urlRoute: string) {
	return router.pathname === urlRoute;
}

// adds a query param to the url (if the param already exists, then it changes its value)
export function addQueryParam(
	router: SingletonRouter,
	queryKey: string,
	queryValue: any,
	addOrChange: boolean,
	scrollToTop?: {top: number; left: number}
) {
	// addOrChange: true=>add / false=>change current(or add the first one if doesnt exists)
	// add
	if (addOrChange) {
		if (router.query![queryKey]) {
			if (!(router.query![queryKey] as string).includes(queryValue)) {
				router.query![queryKey] = router.query![queryKey] + ',' + queryValue;
			}
		}
	}
	// change
	else {
		router.query![queryKey] = queryValue;
	}
	pushUrl(router, false, false, scrollToTop);
}

export function removeQueryParam(router: SingletonRouter, queryKey: string) {
	delete router.query![queryKey];
	return router;
}
// removes a query from the url
export function removeQueryParamAndPush(
	router: SingletonRouter,
	queryKey: string,
	scrollToTop?: {top: number; left: number}
) {
	pushUrl(removeQueryParam(router, queryKey), false, false, scrollToTop);
}

// sets a specific query
export function setQueryParam(
	router: SingletonRouter,
	querystring: string,
	queryKey: string,
	scrollToTop?: {top: number; left: number}
) {
	router.query![queryKey] = querystring;
	pushUrl(router, false, false, scrollToTop);
}

// sets the query
export async function setQueryParams(
	router: SingletonRouter,
	queryObject: {},
	id?: string,
	isModal?: boolean,
	scrollToTop?: {top: number; left: number}
) {
	const herf = `${router.pathname}${id ? '/' + id : ''}?${serialize(queryObject)}`;
	await router.push(herf, `${herf}${isModal ? MODAL_HASHTAG : ''}`);
	scrollToTop && window && window.scrollTo(scrollToTop);
}

// deletes the query and idParam
export function deleteQueryAndIdParam(router: SingletonRouter, scrollToTop?: {top: number; left: number}) {
	const herf = `${router.pathname}`;
	router.push(herf);
	scrollToTop && window && window.scrollTo(scrollToTop);
}

export function updateQueryParam(
	router: SingletonRouter,
	queryKeyToAdd: string,
	queryValue: any,
	addOrChange: boolean,
	queryKeyToRemove?: string,
	scrollToTop?: {top: number; left: number}
) {
	// addOrChange: true=>add / false=>change current(or add the first one if doesnt exists)
	if (!addOrChange) {
		router.query![queryKeyToAdd] = queryValue;
	} else {
		// if the key exists and has a value
		if (router.query![queryKeyToAdd]) {
			// if the value dont exist in the current key-value
			if (!(router.query![queryKeyToAdd] as string).includes(queryValue)) {
				router.query![queryKeyToAdd] = router.query![queryKeyToAdd] + ',' + queryValue;
			}
		} else {
			router.query![queryKeyToAdd] = queryValue;
		}
	}
	if (queryKeyToRemove) {
		delete router.query![queryKeyToRemove];
	}
	pushUrl(router, false, false, scrollToTop);
}

function serialize(obj: any) {
	const str = [];
	for (const p in obj) {
		if (p !== 'id') {
			if (obj.hasOwnProperty(p)) {
				str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
			}
		}
	}
	return str.join('&');
}

export function pushUrl(
	router: SingletonRouter,
	isModal?: boolean,
	replace?: boolean,
	scrollToTop?: {top: number; left: number}
) {
	const queryString: string = serialize(router.query);
	const isWithId: string = router.query!.id && router.query!.id !== '0' ? `/${router.query!.id}` : '';
	const herf = `${router.pathname}${isWithId}${queryString ? '?' + queryString : ''}`;
	if (replace) {
		router.replace({pathname: router.pathname, query: {...router.query}}, `${herf}${isModal ? MODAL_HASHTAG : ''}`);
	} else {
		router
			.push({pathname: router.pathname, query: {...router.query}}, `${herf}${isModal ? MODAL_HASHTAG : ''}`, {
				shallow: isModal,
			})
			.then(() => scrollToTop && window && window.scrollTo(scrollToTop));
	}
}
