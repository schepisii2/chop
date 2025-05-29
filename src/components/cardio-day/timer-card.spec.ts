import TimerCard from './timer-card.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { TrainingZone } from '../../models/training-days';

describe('Timer Card', () => {
	it('Shows title', () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
			global: {
				stubs: ['FontAwesomeIcon'],
			},
		});
		expect(w.find('[data-test-id="timer-title"]').text()).toBe(
			'10 Minutes - Warm Up',
		);
	});
	it('Shows time remaining', () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
			global: {
				stubs: ['FontAwesomeIcon'],
			},
		});
		expect(w.find('[data-test-id="time-remaining"]').text()).toBe('10:00');
	});
	it('Shows start button - hides stop and reset button', () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
			global: {
				stubs: ['FontAwesomeIcon'],
			},
		});
		expect(w.find('[data-test-id="start-button"]').text()).toBe('Start');
		expect(w.find('[data-test-id="stop-button"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="reset-button"]').exists()).toBeFalsy();
	});
	it('Hides start button on-click - shows stop and reset button', async () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
			global: {
				stubs: ['FontAwesomeIcon'],
			},
		});

		await w.get('[data-test-id="start-button"').trigger('click');

		expect(w.find('[data-test-id="start-button"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="stop-button"]').text()).toBe('Stop');
		expect(w.find('[data-test-id="reset-button"]').exists()).toBeTruthy();
	});
	it('Emits close and makes notification sound when timer is up', async () => {
		vi.useFakeTimers();
		const mockNotification = vi.fn();
		HTMLMediaElement.prototype.play = mockNotification;
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
			global: {
				stubs: ['FontAwesomeIcon'],
			},
		});

		await w.get('[data-test-id="start-button"').trigger('click');
		vi.advanceTimersByTime(6000000);

		expect(w.emitted('close')).toBeDefined();
		expect(mockNotification).toHaveBeenCalled();
	});
	it('Resets timer', async () => {
		vi.useFakeTimers();
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
			global: {
				stubs: ['FontAwesomeIcon'],
			},
		});

		await w.get('[data-test-id="start-button"').trigger('click');
		vi.advanceTimersByTime(100000);
		await w.get('[data-test-id="reset-button"').trigger('click');

		expect(w.find('[data-test-id="start-button"]').text()).toBe('Start');
		expect(w.find('[data-test-id="stop-button"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="reset-button"]').exists()).toBeFalsy();
	});

	it('Shows zone information', () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 3, zone: TrainingZone.MSS },
			global: {
				stubs: ['FontAwesomeIcon'],
			},
		});
		expect(w.find('[data-test-id="timer-title"]').text()).toBe(
			'3 Minutes - Maximal Steady State (MSS)',
		);
		expect(w.find('[data-test-id="heart-rate"]').text()).toBe('165-175 BPM');
		expect(w.find('[data-test-id="perceived-exertion"]').text()).toBe('5-8');
	});
});
