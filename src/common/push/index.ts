import { getGlobal } from 'src/common/global';
import publicKey from 'keys/vapid-public.key';

export function isAvailable(): boolean {
	if (SERVER) return false;

	const globalObject = getGlobal();
	if ('serviceWorker' in navigator) {
		return 'PushManager' in globalObject;
	}

	return false;
}

export function register() {
	return navigator.serviceWorker.register('service-worker.js')
		.catch((err) => {
			console.error('Unable to register service worker.', err);
		});
}

export function askPermission() {
	return new Promise((resolve, reject) => {
		const permissionResult = Notification.requestPermission((result) => {
			resolve(result);
		});

		if (permissionResult) {
			permissionResult.then(resolve, reject);
		}
	})
		.then((permissionResult) => {
			if (permissionResult !== 'granted') {
				throw new Error('We weren\'t granted permission.');
			}
		});
}

function urlBase64ToUint8Array(base64String) {
	let padding = '';
	for (let i = (4 - base64String.length % 4) % 4; i > 0; i--) {
		padding += '=';
	}

	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

export function subscribeUserToPush(SWRegistration: Promise<any>) {
	return SWRegistration
		.then((registration) => {
			const subscribeOptions = {
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(publicKey)
			};

			return registration.pushManager.subscribe(subscribeOptions);
		})
		.then((pushSubscription) => {
			// sendSubscriptionToBackEnd(pushSubscription);
			return pushSubscription;
		});
}

export function sendSubscriptionToBackEnd(subscription) {
	return fetch('/api/save-subscription/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(subscription)
	})
		.then(function (response) {
			if (!response.ok) {
				throw new Error('Bad status code from server.');
			}

			return response.json();
		})
		.then(function (responseData) {
			if (!(responseData.data && responseData.data.success)) {
				throw new Error('Bad response from server.');
			}
		});
}