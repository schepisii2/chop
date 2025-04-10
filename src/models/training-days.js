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
        month: 'Month 2',
        day: 1,
        type: ExerciseType.Rest
    },
    {
        month: 'Month 2',
        day: 2,
        type: ExerciseType.Cardio,
    },    
    {
        month: 'Month 2',
        day: 3,
        type: ExerciseType.Strength,
    },    
    {
        month: 'Month 2',
        day: 4,
        type: ExerciseType.Cardio
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