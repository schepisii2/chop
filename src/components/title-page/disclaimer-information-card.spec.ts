import DisclaimerInformation from './disclaimer-information-card.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

describe('Disclaimer Information', () => {
	it('Shows disclaimer and pdf', () => {
		const w = shallowMount(DisclaimerInformation);
		expect(w.find('[data-test-id="disclaimer-message"]').exists()).toBeTruthy();
		expect(w.find('[data-test-id="chop-pdf"]').exists()).toBeTruthy();
	});
	it('Emits close on-click', async () => {
		const w = shallowMount(DisclaimerInformation);
		await w.find('[data-test-id="close-button"]').trigger('click');
		expect(w.emitted('close')).toBeDefined();
	});
});
