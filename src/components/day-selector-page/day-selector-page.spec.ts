import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DaySelectorPage from './day-selector-page.vue';
import { ExerciseType } from '../../models/training-days';

describe('Training Day Selector', () => {
	it('renders month selector', () => {
		const w = shallowMount(DaySelectorPage);
		expect(w.findComponent('month-selector-stub').exists()).toBeTruthy();
	});
	it('renders day selector', () => {
		const w = shallowMount(DaySelectorPage);
		expect(w.findComponent('day-selector-stub').exists()).toBeTruthy();
	});
	it('renders start & mark complete button for incomplete days', async () => {
		const w = shallowMount(DaySelectorPage);

		// Month 1 Day 2 is incomplete
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 2);

		expect(w.find('[data-test-id="start-button"]').exists()).toBeTruthy();
		expect(
			w.find('[data-test-id="mark-complete-button"]').exists(),
		).toBeTruthy();
	});
	it('does not render start & mark complete button for complete days', () => {
		const w = shallowMount(DaySelectorPage);

		// Month 1 Day 1 is auto-selected & marked complete
		expect(w.find('[data-test-id="start-button"]').exists()).toBeFalsy();
		expect(
			w.find('[data-test-id="mark-complete-button"]').exists(),
		).toBeFalsy();
	});
	it('emits training day on start button click', async () => {
		const w = shallowMount(DaySelectorPage);

		await (w.getComponent('month-selector-stub') as any).vm.$emit(
			'set-month',
			'Month 2',
		);
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 14);
		await w.find('[data-test-id="start-button"]').trigger('click');

		expect(w.emitted('start')).toBeTruthy();
		expect(w.emitted('start')).toStrictEqual([
			[
				{
					month: 'Month 2',
					day: 14,
					type: ExerciseType.Rest,
				},
			],
		]);
	});
	it('updates last completed date on mark complete button click', async () => {
		const w = shallowMount(DaySelectorPage);

		// First, update day selected to Day 14
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 14);

		// Confirm buttons show day as incomplete
		expect(w.find('[data-test-id="start-button"]').exists()).toBeTruthy();
		expect(
			w.find('[data-test-id="mark-complete-button"]').exists(),
		).toBeTruthy();

		// Then, complete Day 14
		await w.find('[data-test-id="mark-complete-button"]').trigger('click');

		// Confirm buttons show day as complete
		expect(w.find('[data-test-id="start-button"]').exists()).toBeFalsy();
		expect(
			w.find('[data-test-id="mark-complete-button"]').exists(),
		).toBeFalsy();
	});
});
