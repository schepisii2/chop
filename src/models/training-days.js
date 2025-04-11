export const ExerciseType = {
    Rest: 'Rest Day',
    Strength: 'Strength Training',
    Cardio: 'Cardio Day'
};

export const TrainingZone = {
    WarmUp: {
        label: 'Warm Up'
    },
    BP: {
        label: 'Base Pace',
        heartRate: '125-145',
        perceivedExertion: '2-4'
    },
    MSS: {
        label: 'Maximal Steady State (MSS)',
        heartRate: '165-175',
        perceivedExertion: '5-8'
    },
    RP: {
        label: 'Race Pace (RP)',
        heartRate: '170-185',
        perceivedExertion: '7-9'
    },
    Recovery: {
        label: 'Recovery',
        heartRate: ' <125',
        perceivedExertion: '0-2'
    },
    CoolDown: {
        label: 'Cool Down'
    }
};

export const TRAINING_CALENDAR = [
    {
        month: 'Month 1',
        day: 1,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 1',
        day: 2,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 3, zone: TrainingZone.BP }, { duration: 2, zone: TrainingZone.Recovery }, { duration: 3, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 3,
        type: ExerciseType.Strength,
    },
    {
        month: 'Month 1',
        day: 4,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 3, zone: TrainingZone.BP }, { duration: 2, zone: TrainingZone.Recovery }, { duration: 3, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 5,
        type: ExerciseType.Strength,
    },
    {
        month: 'Month 1',
        day: 6,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 3, zone: TrainingZone.BP }, { duration: 2, zone: TrainingZone.Recovery }, { duration: 3, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 7,
        type: ExerciseType.Rest,
    },
    {
        month: 'Month 1',
        day: 8,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 1',
        day: 9,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 4, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 4, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 10,
        type: ExerciseType.Strength
    },
    {
        month: 'Month 1',
        day: 11,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 4, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 4, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 12,
        type: ExerciseType.Strength
    },
    {
        month: 'Month 1',
        day: 13,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 4, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 4, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 14,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 1',
        day: 15,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 1',
        day: 16,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 5, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 5, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 17,
        type: ExerciseType.Strength
    },
    {
        month: 'Month 1',
        day: 18,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 5, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 5, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 19,
        type: ExerciseType.Strength
    },
    {
        month: 'Month 1',
        day: 20,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 5, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 5, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 21,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 1',
        day: 22,
        type: ExerciseType.Rest,
    },
    {
        month: 'Month 1',
        day: 23,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 6, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 5, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 24,
        type: ExerciseType.Strength
    },
    {
        month: 'Month 1',
        day: 25,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 7, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 5, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 26,
        type: ExerciseType.Strength
    },
    {
        month: 'Month 1',
        day: 27,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 7, zone: TrainingZone.BP }, { duration: 3, zone: TrainingZone.Recovery }, { duration: 5, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 1',
        day: 28,
        type: ExerciseType.Rest,
    },
    {
        month: 'Month 2',
        day: 1,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 2',
        day: 2,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 6, zone: TrainingZone.BP }, { duration: 2, zone: TrainingZone.Recovery }, { duration: 6, zone: TrainingZone.BP },{ duration: 2, zone: TrainingZone.Recovery }, { duration: 6, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    }, 
    {
        month: 'Month 2',
        day: 3,
        type: ExerciseType.Strength,
    },    
    {
        month: 'Month 2',
        day: 4,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 7, zone: TrainingZone.BP }, { duration: 2, zone: TrainingZone.Recovery }, { duration: 7, zone: TrainingZone.BP }, { duration: 2, zone: TrainingZone.Recovery }, { duration: 7, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 2',
        day: 5,
        type: ExerciseType.Strength,
    },
    {
        month: 'Month 2',
        day: 6,
        type: ExerciseType.Cardio,
        timers: [{ duration: 10, zone: TrainingZone.WarmUp }, { duration: 8, zone: TrainingZone.BP }, { duration: 2, zone: TrainingZone.Recovery }, { duration: 8, zone: TrainingZone.BP },{ duration: 2, zone: TrainingZone.Recovery }, { duration: 8, zone: TrainingZone.BP }, {duration: 10, zone: TrainingZone.CoolDown }]
    },
    {
        month: 'Month 2',
        day: 7,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 3',
        day: 1,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 4',
        day: 1,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 5',
        day: 1,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 6',
        day: 1,
        type: ExerciseType.Cardio
    },
    {
        month: 'Month 7',
        day: 1,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 8',
        day: 1,
        type: ExerciseType.Strength
    }
];