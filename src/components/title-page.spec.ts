import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
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
	it('emits "show-disclaimer" on button click', async () => {
		const w = shallowMount(TitlePage);
		await w.get('[data-test-id="disclaimer-button"]').trigger('click');
		expect(w.emitted('show-disclaimer')).toBeTruthy();
	});
});
