import { describe, expect, it } from 'vitest';
import {
	ExerciseType,
	TRAINING_CALENDAR,
	TrainingMode,
	TrainingZone,
} from './training-days';

describe('Training Days', () => {
	it('has one of three training types', () => {
		TRAINING_CALENDAR.forEach((day) => {
			expect(day.type).toBeDefined();
			expect(day.type).toBeOneOf([
				ExerciseType.Cardio,
				ExerciseType.Strength,
				ExerciseType.Rest,
			]);
		});
	});
	it('has the correct number of days', () => {
		expect(
			TRAINING_CALENDAR.filter((d) => d.month === 'Month 1').map((d) => d.day),
		).toHaveLength(28);
		expect(
			TRAINING_CALENDAR.filter((d) => d.month === 'Month 2').map((d) => d.day),
		).toHaveLength(35);
		expect(
			TRAINING_CALENDAR.filter((d) => d.month === 'Month 3').map((d) => d.day),
		).toHaveLength(28);
		expect(
			TRAINING_CALENDAR.filter((d) => d.month === 'Month 4').map((d) => d.day),
		).toHaveLength(28);
		expect(
			TRAINING_CALENDAR.filter((d) => d.month === 'Month 5').map((d) => d.day),
		).toHaveLength(28);
		expect(
			TRAINING_CALENDAR.filter((d) => d.month === 'Month 6').map((d) => d.day),
		).toHaveLength(28);
		expect(
			TRAINING_CALENDAR.filter((d) => d.month === 'Month 7').map((d) => d.day),
		).toHaveLength(28);
		expect(
			TRAINING_CALENDAR.filter((d) => d.month === 'Month 8').map((d) => d.day),
		).toHaveLength(35);
	});
	it('has timers on cardio days', () => {
		TRAINING_CALENDAR.forEach((day) => {
			if (day.type === ExerciseType.Cardio) {
				expect(day.timers).not.toHaveLength(0);
				day.timers.forEach((timer) => {
					expect(timer.duration).toBeDefined();
					expect(timer.duration).toBeGreaterThan(0);
					expect(timer.zone).toBeDefined();
					expect(timer.zone).toBeOneOf([
						TrainingZone.BP,
						TrainingZone.CoolDown,
						TrainingZone.MSS,
						TrainingZone.RP,
						TrainingZone.Recovery,
						TrainingZone.WarmUp,
					]);
				});
			} else {
				expect(day.timers).toBeUndefined();
			}
		});
	});
	it('has training mode on cardio days', () => {
		TRAINING_CALENDAR.forEach((day) => {
			if (day.type === ExerciseType.Cardio) {
				expect(day.mode).toBeDefined();
				expect(day.mode).toBeOneOf([
					TrainingMode.One,
					TrainingMode.Two,
					TrainingMode.Three,
					TrainingMode.Four,
				]);
			} else {
				expect(day.mode).toBeUndefined();
			}
		});
	});
	it('starts cardio days with warm up - unless its a recovery day', () => {
		TRAINING_CALENDAR.forEach((day) => {
			if (
				day.type === ExerciseType.Cardio &&
				day.timers.at(0).zone !== TrainingZone.Recovery
			) {
				expect(day.timers.at(0).zone).toBe(TrainingZone.WarmUp);
			}
		});
	});
	it('ends cardio days with cool down or recover', () => {
		TRAINING_CALENDAR.forEach((day) => {
			if (day.type === ExerciseType.Cardio) {
				expect(day.timers.at(-1).zone).toBeOneOf([
					TrainingZone.CoolDown,
					TrainingZone.Recovery,
				]);
			}
		});
	});
});
