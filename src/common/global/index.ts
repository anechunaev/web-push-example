let globalObject = {};

if (typeof window !== 'undefined') {
	globalObject = window;
} else {
	if (typeof global !== 'undefined') {
		globalObject = global;
	}
}

export function getGlobal() {
	return globalObject;
}