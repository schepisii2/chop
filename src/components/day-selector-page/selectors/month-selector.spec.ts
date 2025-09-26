import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MonthSelector from './month-selector.vue';
import { ExerciseType } from '../../../models/training-days';

describe('Month Selector', () => {
	it('renders Month 1 on page load', () => {
		const w = shallowMount(MonthSelector);

		expect(w.find('[data-test-id="month-header"]').text()).toBe('Month 1');
	});
	it('does not render back button when Month 1 is selected', async () => {
		const w = shallowMount(MonthSelector);
		expect(w.find('[data-test-id="back-button"]').exists()).toBeFalsy();
	});
	it('selects next month when forward button is clicked', async () => {
		const w = shallowMount(MonthSelector);
		await w.find('[data-test-id="forward-button"]').trigger('click');
		expect(w.find('[data-test-id="month-header"]').text()).toBe('Month 2');
	});
	it('selects previous month when back button is clicked', async () => {
		const w = shallowMount(MonthSelector);
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="back-button"]').trigger('click');
		expect(w.find('[data-test-id="month-header"]').text()).toBe('Month 1');
	});
	it('does not render forward button when Month 8 is selected', async () => {
		const w = shallowMount(MonthSelector);

		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');

		expect(w.find('[data-test-id="month-header"]').text()).toBe('Month 8');
		expect(w.find('[data-test-id="forward-button"]').exists()).toBeFalsy();
	});
	it('emits set-month on button click', async () => {
		const w = shallowMount(MonthSelector);

		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="back-button"]').trigger('click');

		expect(w.emitted('set-month')).toBeTruthy();
		expect(w.emitted('set-month')).toStrictEqual([['Month 2'], ['Month 1']]);
	});
});
