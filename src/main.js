import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faArrowRotateLeft,
	faBackwardStep,
	faDumbbell,
	faForwardStep,
	faHeartPulse,
	faHourglassHalf,
	faList,
	faSquareMinus,
	faSquarePlus,
	faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);

library.add(faArrowRotateLeft);
library.add(faBackwardStep);
library.add(faDumbbell);
library.add(faForwardStep);
library.add(faHeartPulse);
library.add(faHourglassHalf);
library.add(faList);
library.add(faSquareMinus);
library.add(faSquarePlus);
library.add(faSquareXmark);

app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
