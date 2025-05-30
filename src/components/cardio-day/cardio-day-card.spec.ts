import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CardioDayCard from './cardio-day-card.vue';
import { ExerciseType, TrainingZone } from '../../models/training-days';

describe('Cardio Day Card', () => {
	function _getTestTrainingDay() {
		return {
			month: 'Month 6',
			day: 1,
			type: ExerciseType.Cardio,
			timers: [
				{ duration: 10, zone: TrainingZone.WarmUp },
				{ duration: 45, zone: TrainingZone.BP },
				{ duration: 10, zone: TrainingZone.CoolDown },
			],
		};
	}
	function mountCardioDayCard() {
		return shallowMount(CardioDayCard, {
			props: {
				trainingDay: _getTestTrainingDay(),
			},
		});
	}
	it('shows dropdown', async () => {
		const w = mountCardioDayCard();
		expect(w.find('[data-test-id="list-dropdown"]').exists()).toBeTruthy();
	});
	it('adds training mode card', async () => {
		const w = mountCardioDayCard();

		await w.find('[data-test-id="training-mode-option"]').trigger('click');

		expect(w.find('[data-test-id="training-mode-card"]').exists()).toBeTruthy();
		expect(w.find('[data-test-id="zone-chart"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="rpe-chart"]').exists()).toBeFalsy();
	});
	it('adds zone chart', async () => {
		const w = mountCardioDayCard();

		await w.find('[data-test-id="zone-option"]').trigger('click');

		expect(w.find('[data-test-id="training-mode-card"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="zone-chart"]').exists()).toBeTruthy();
		expect(w.find('[data-test-id="rpe-chart"]').exists()).toBeFalsy();
	});
	it('adds rpe chart', async () => {
		const w = mountCardioDayCard();

		await w.find('[data-test-id="rpe-option"]').trigger('click');

		expect(w.find('[data-test-id="training-mode-card"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="zone-chart"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="rpe-chart"]').exists()).toBeTruthy();
	});
	it('removes added cards', async () => {
		const w = mountCardioDayCard();

		await w.find('[data-test-id="training-mode-option"]').trigger('click');
		await w.find('[data-test-id="zone-option"]').trigger('click');
		await w.find('[data-test-id="rpe-option"]').trigger('click');

		await (w.getComponent('training-mode-card-stub') as any).vm.$emit('close');
		await (w.getComponent('zone-chart-stub') as any).vm.$emit('close');
		await (w.getComponent('rpe-chart-stub') as any).vm.$emit('close');

		expect(w.find('[data-test-id="training-mode-card"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="zone-chart"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="rpe-chart"]').exists()).toBeFalsy();
	});
	it('renders timers', async () => {
		const w = mountCardioDayCard();
		expect(w.findAllComponents('timer-card-stub')).toHaveLength(3);
	});
	it('renders upcoming timer', async () => {
		const w = mountCardioDayCard();
		expect(w.find('[data-test-id="upcoming-timer"]').text()).toBe(
			'45 Minutes - Base Pace',
		);
	});
	it('does not render back button when first timer is shown', async () => {
		const w = mountCardioDayCard();
		expect(w.find('[data-test-id="back-button"]').exists()).toBeFalsy();
	});
	it('renders next timer when upcoming timer is clicked', async () => {
		const w = mountCardioDayCard();
		await w.find('[data-test-id="upcoming-timer"]').trigger('click');

		// check timers display correctly
		expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeFalsy();
		expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeTruthy();
		expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();

		// check upcoming timer updates
		expect(w.find('[data-test-id="upcoming-timer"').text()).toBe(
			'10 Minutes - Cool Down',
		);
	});
	it('does not render upcoming timer when last timer is shown', async () => {
		const w = mountCardioDayCard();

		await w.find('[data-test-id="upcoming-timer"]').trigger('click');
		await w.find('[data-test-id="upcoming-timer"]').trigger('click');

		// check upcoming timer updates
		expect(w.find('[data-test-id="upcoming-timer"').exists()).toBeFalsy();
	});
	it('renders past timer when back button clicked', async () => {
		const w = mountCardioDayCard();

		await w.find('[data-test-id="upcoming-timer"]').trigger('click');
		await w.find('[data-test-id="back-button"]').trigger('click');

		// check timers display correctly
		expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeTruthy();
		expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeFalsy();
		expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();

		// check upcoming timer updates
		expect(w.find('[data-test-id="upcoming-timer"').text()).toBe(
			'45 Minutes - Base Pace',
		);
	});
	it('only shows current timer', async () => {
		const w = mountCardioDayCard();

		expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeTruthy();
		expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeFalsy();
		expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();
	});
	it('updates current timer when close is emitted by timer', async () => {
		const w = mountCardioDayCard();

		await (w.getComponent('timer-card-stub') as any).vm.$emit('close');

		// check timers display correctly
		expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeFalsy();
		expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeTruthy();
		expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();

		// check upcoming timer updates
		expect(w.find('[data-test-id="upcoming-timer"').text()).toBe(
			'10 Minutes - Cool Down',
		);
	});
	it('shows success message when all timers are complete', async () => {
		const w = mountCardioDayCard();

		await (w.getComponent('timer-card-stub') as any).vm.$emit('close');
		await (w.getComponent('timer-card-stub') as any).vm.$emit('close');
		await (w.getComponent('timer-card-stub') as any).vm.$emit('close');

		expect(w.find('[data-test-id="success-message"]').exists()).toBeTruthy();
	});
});
