import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DaySelector from './day-selector.vue';
import { ExerciseType } from '../../../models/training-days';

describe('Day Selector', () => {
	it('renders cardio day with timers', () => {
		const w = shallowMount(DaySelector, {
			props: {
				month: 'Month 1',
			},
		});

		// Rest Day does not have timers
		expect(w.find('[data-test-id="day1-selector"]').text()).toBe('1Rest Day');
		// Cardio Day does have timers
		expect(w.find('[data-test-id="day2-selector"]').text()).toBe(
			'2Cardio Day10 min Warm Up3 min Base Pace2 min Recovery3 min Base Pace10 min Cool Down',
		);
	});
	it('renders the correct amount of days for a month', async () => {
		const month2DaySelector = shallowMount(DaySelector, {
			props: {
				month: 'Month 2',
			},
		});
		const month4DaySelector = shallowMount(DaySelector, {
			props: {
				month: 'Month 4',
			},
		});

		// Month 2 has 35 days
		for (let i = 1; i <= 35; i++) {
			expect(
				month2DaySelector.find(`[data-test-id="day${i}-selector"]`).exists(),
			).toBeTruthy();
		}
		// Month 4 has 28 days
		for (let i = 1; i <= 28; i++) {
			expect(
				month4DaySelector.find(`[data-test-id="day${i}-selector"]`).exists(),
			).toBeTruthy();
		}
	});
	it('emits set-day on click', async () => {
		const w = shallowMount(DaySelector, {
			props: {
				month: 'Month 1',
			},
		});

		await w.find('[data-test-id="day2-selector"]').trigger('click');

		expect(w.emitted('set-day')).toBeTruthy();
		expect(w.emitted('set-day')).toStrictEqual([[2]]);
	});
});
