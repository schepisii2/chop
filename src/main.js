import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faBackwardStep,
	faForwardStep,
	faHourglassHalf,
	faSquarePlus,
	faSquareMinus,
} from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);

library.add(faBackwardStep);
library.add(faForwardStep);
library.add(faHourglassHalf);
library.add(faSquarePlus);
library.add(faSquareMinus);

app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
