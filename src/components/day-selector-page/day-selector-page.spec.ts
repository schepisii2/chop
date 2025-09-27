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
	/* We would need to update lastCompleteDate logic to allow users to incomplete/complete the first day.
	 * Now, we rely on the lastCompleteDate always being populated. We also rely on there always being a day
	 * previous to the day being marked incomplete. */
	it('renders no buttons for first rest day', () => {
		const w = shallowMount(DaySelectorPage);

		expect(w.find('[data-test-id="start-button"]').exists()).toBeFalsy();
		expect(
			w.find('[data-test-id="mark-complete-button"]').exists(),
		).toBeFalsy();
		expect(
			w.find('[data-test-id="mark-incomplete-button"]').exists(),
		).toBeFalsy();
	});
	it('renders start & mark complete button for incomplete days', async () => {
		const w = shallowMount(DaySelectorPage);

		// Month 1 Day 2 is incomplete
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 2);

		expect(w.find('[data-test-id="start-button"]').exists()).toBeTruthy();
		expect(
			w.find('[data-test-id="mark-complete-button"]').exists(),
		).toBeTruthy();
		expect(
			w.find('[data-test-id="mark-incomplete-button"]').exists(),
		).toBeFalsy();
	});
	it('renders mark incomplete button for complete days', async () => {
		const w = shallowMount(DaySelectorPage);

		// Mark a day complete
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 2);
		await w.find('[data-test-id="mark-complete-button"]').trigger('click');

		expect(w.find('[data-test-id="start-button"]').exists()).toBeFalsy();
		expect(
			w.find('[data-test-id="mark-complete-button"]').exists(),
		).toBeFalsy();
		expect(
			w.find('[data-test-id="mark-incomplete-button"]').exists(),
		).toBeTruthy();
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

		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 14);
		await w.find('[data-test-id="mark-complete-button"]').trigger('click');

		expect((w.vm as any).lastCompletedDay).toStrictEqual({
			month: 'Month 1',
			day: 14,
		});
	});
	it('updates last completed date on mark incomplete button click', async () => {
		const w = shallowMount(DaySelectorPage);

		// First, complete day 14
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 14);
		await w.find('[data-test-id="mark-complete-button"]').trigger('click');
		// Then, mark day 12 incomplete
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 12);
		await w.find('[data-test-id="mark-incomplete-button"]').trigger('click');

		expect((w.vm as any).lastCompletedDay).toStrictEqual({
			month: 'Month 1',
			day: 11,
		});
	});
	it('updates last completed date on mark incomplete button click, first day of the month case', async () => {
		const w = shallowMount(DaySelectorPage);

		// First, complete month 2 day 14
		await (w.getComponent('month-selector-stub') as any).vm.$emit(
			'set-month',
			'Month 2',
		);
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 14);
		await w.find('[data-test-id="mark-complete-button"]').trigger('click');
		// Then, mark month 2 day 1 incomplete
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 1);
		await w.find('[data-test-id="mark-incomplete-button"]').trigger('click');

		expect((w.vm as any).lastCompletedDay).toStrictEqual({
			month: 'Month 1',
			day: 28,
		});
	});
});
