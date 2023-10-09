import { createPinia } from 'pinia';

import piniaPluginPersistedstate from '@/stores/persist.js';
const pinia = createPinia();
export default function (app) {
	pinia.use(piniaPluginPersistedstate);
	app.use(pinia);
}
