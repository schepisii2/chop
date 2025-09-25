import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DisclaimerInformationCard from './disclaimer-information-card.vue';
import TitlePage from './title-page.vue';

describe('Title Page', () => {
	it('shows title', () => {
		const w = shallowMount(TitlePage);
		expect(w.get('[data-test-id="title"]').text()).toBe(
			'POTS Exercise Program Timer',
		);
	});
	it('emits "get-started" on button click', async () => {
		const w = shallowMount(TitlePage);
		await w.get('[data-test-id="get-started-button"]').trigger('click');
		expect(w.emitted('get-started')).toBeTruthy();
	});

	describe('Disclaimer', () => {
		it('does not show disclaimer on page load', () => {
			const w = shallowMount(TitlePage);
			expect(
				w.find('[data-test-id="disclaimer-information"]').exists(),
			).toBeFalsy();
		});
		it('shows disclaimer when button is clicked', async () => {
			const w = shallowMount(TitlePage);

			await w.get('[data-test-id="disclaimer-button"]').trigger('click');

			expect(
				w.find('[data-test-id="disclaimer-information"]').exists(),
			).toBeTruthy();
		});
		it('closes disclaimer when close emitted from disclaimer card', async () => {
			const w = shallowMount(TitlePage);

			await w.get('[data-test-id="disclaimer-button"]').trigger('click');
			await w.getComponent(DisclaimerInformationCard).vm.$emit('close');

			expect(
				w.find('[data-test-id="disclaimer-information"]').exists(),
			).toBeFalsy();
		});
	});
});
