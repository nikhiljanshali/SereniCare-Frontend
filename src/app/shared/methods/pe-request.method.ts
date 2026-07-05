// src/app/shared/constants/medical-constants.ts

export const MEDICAL_PHRASES: Record<string, string> = {
    NORMAL: 'Patient appears comfortable and in no acute distress.',
    ILL_LOOKING: 'Patient appears ill-looking.',
    TOXIC_LOOKING: 'Patient appears toxic and acutely unwell.',
    DISTRESSED: 'Patient appears to be in distress.',
    UNCONSCIOUS: 'Patient is unconscious and unresponsive.',
    ALERT: 'Patient is alert.',
    ALERT_ORIENTED: 'Patient is alert and oriented to time, place, and person.',
    DROWSY: 'Patient is drowsy but arousable.',
    LETHARGIC: 'Patient is lethargic with reduced responsiveness.',
    RESTLESS: 'Patient appears restless.',
    AGITATED: 'Patient is agitated.',
    CONFUSED: 'Patient appears confused.',
    DEHYDRATED: 'Clinical features suggest dehydration.',
    WELL_HYDRATED: 'Patient appears adequately hydrated.',
    PALE: 'Patient appears pale.',
    CYANOSED: 'Cyanosis is noted.',
    JAUNDICED: 'Icterus (jaundice) is present.',
    CACHECTIC: 'Patient appears cachectic.',
    OBESE: 'Patient is obese.',
    UNDERWEIGHT: 'Patient appears underweight.',
    WELL_NOURISHED: 'Patient appears well nourished.',
    MALNOURISHED: 'Patient appears malnourished.',
    FEBRILE: 'Patient appears febrile.',
    DIAPHORETIC: 'Patient is diaphoretic.',
    COMFORTABLE: 'Patient appears comfortable.',
    IN_PAIN: 'Patient appears to be in pain.'
};

export const GENERAL_APPEARANCE_LIST = [
    { id: 1, code: 'NORMAL', name: 'Normal' },
    { id: 2, code: 'ILL_LOOKING', name: 'Ill Looking' },
    { id: 3, code: 'TOXIC_LOOKING', name: 'Toxic Looking' },
    { id: 4, code: 'DISTRESSED', name: 'Distressed' },
    { id: 5, code: 'UNCONSCIOUS', name: 'Unconscious' },
    { id: 6, code: 'ALERT', name: 'Alert' },
    { id: 7, code: 'ALERT_ORIENTED', name: 'Alert & Oriented' },
    { id: 8, code: 'DROWSY', name: 'Drowsy' },
    { id: 9, code: 'LETHARGIC', name: 'Lethargic' },
    { id: 10, code: 'RESTLESS', name: 'Restless' },
    { id: 11, code: 'AGITATED', name: 'Agitated' },
    { id: 12, code: 'CONFUSED', name: 'Confused' },
    { id: 13, code: 'DEHYDRATED', name: 'Dehydrated' },
    { id: 14, code: 'WELL_HYDRATED', name: 'Well Hydrated' },
    { id: 15, code: 'PALE', name: 'Pale' },
    { id: 16, code: 'CYANOSED', name: 'Cyanosed' },
    { id: 17, code: 'JAUNDICED', name: 'Jaundiced' },
    { id: 18, code: 'CACHECTIC', name: 'Cachectic' },
    { id: 19, code: 'OBESE', name: 'Obese' },
    { id: 20, code: 'UNDERWEIGHT', name: 'Underweight' },
    { id: 21, code: 'WELL_NOURISHED', name: 'Well Nourished' },
    { id: 22, code: 'MALNOURISHED', name: 'Malnourished' },
    { id: 23, code: 'FEBRILE', name: 'Febrile' },
    { id: 24, code: 'DIAPHORETIC', name: 'Diaphoretic (Sweating)' },
    { id: 25, code: 'COMFORTABLE', name: 'Comfortable' },
    { id: 26, code: 'IN_PAIN', name: 'In Pain' }
];

export const CONSCIOUSNESS_OPTIONS = [
    { id: 1, label: "Alert", value: "ALERT" },
    { id: 2, label: "Drowsy", value: "DROWSY" },
    { id: 3, label: "Lethargic", value: "LETHARGIC" },
    { id: 4, label: "Stuporous", value: "STUPOROUS" },
    { id: 5, label: "Semiconscious", value: "SEMICONSCIOUS" },
    { id: 6, label: "Unconscious", value: "UNCONSCIOUS" },
    { id: 7, label: "Comatose", value: "COMATOSE" }
];

export const ORIENTATION_OPTIONS = [
    { id: 1, label: "Fully Oriented (Time, Place, Person)", value: "FULLY_ORIENTED" },
    { id: 2, label: "Oriented to Person", value: "ORIENTED_PERSON" },
    { id: 3, label: "Oriented to Place", value: "ORIENTED_PLACE" },
    { id: 4, label: "Oriented to Time", value: "ORIENTED_TIME" },
    { id: 5, label: "Disoriented", value: "DISORIENTED" },
    { id: 6, label: "Not Assessable", value: "NOT_ASSESSABLE" }
];

export const NUTRITIONAL_STATUS_OPTIONS = [
    { id: 1, label: "Normal", value: "NORMAL" },
    { id: 2, label: "Well Nourished", value: "WELL_NOURISHED" },
    { id: 3, label: "Underweight", value: "UNDERWEIGHT" },
    { id: 4, label: "Overweight", value: "OVERWEIGHT" },
    { id: 5, label: "Obese", value: "OBESE" },
    { id: 6, label: "Malnourished", value: "MALNOURISHED" },
    { id: 7, label: "Cachectic", value: "CACHECTIC" }
];

export const HYDRATION_STATUS_OPTIONS = [
    { id: 1, label: "Normal", value: "NORMAL" },
    { id: 2, label: "Well Hydrated", value: "WELL_HYDRATED" },
    { id: 3, label: "Mild Dehydration", value: "MILD_DEHYDRATION" },
    { id: 4, label: "Moderate Dehydration", value: "MODERATE_DEHYDRATION" },
    { id: 5, label: "Severe Dehydration", value: "SEVERE_DEHYDRATION" },
    { id: 6, label: "Overhydrated", value: "OVERHYDRATED" }
];

export const MOBILITY_OPTIONS = [
    { id: 1, label: "Independent", value: "INDEPENDENT" },
    { id: 2, label: "Assisted", value: "ASSISTED" },
    { id: 3, label: "Wheelchair Bound", value: "WHEELCHAIR_BOUND" },
    { id: 4, label: "Bedridden", value: "BEDRIDDEN" },
    { id: 5, label: "Stretcher", value: "STRETCHER" },
    { id: 6, label: "Unable to Walk", value: "UNABLE_TO_WALK" }
];

export const GAIT_OPTIONS = [
    { label: "Normal", value: "normal" },
    { label: "Antalgic", value: "antalgic" },
    { label: "Ataxic", value: "ataxic" },
    { label: "Shuffling", value: "shuffling" },
    { label: "Limping", value: "limping" },
    { label: "Unsteady", value: "unsteady" },
    { label: "Assisted", value: "assisted" },
    { label: "Unable to Assess", value: "unable_to_assess" }
];

export const PAIN_CHARACTER_OPTIONS = [
    { id: 1, label: "Sharp", value: "SHARP" },
    { id: 2, label: "Dull", value: "DULL" },
    { id: 3, label: "Throbbing", value: "THROBBING" },
    { id: 4, label: "Burning", value: "BURNING" },
    { id: 5, label: "Aching", value: "ACHING" },
    { id: 6, label: "Cramping", value: "CRAMPING" },
    { id: 7, label: "Shooting", value: "SHOOTING" }
];

export const PAIN_SCORE_OPTIONS = [
    { id: 1, label: "Level-1", value: "1" },
    { id: 2, label: "Level-2", value: "2" },
    { id: 3, label: "Level-3", value: "3" },
    { id: 4, label: "Level-4", value: "4" },
    { id: 5, label: "Level-5", value: "5" },
    { id: 6, label: "Level-6", value: "6" },
    { id: 7, label: "Level-7", value: "7" },
    { id: 8, label: "Level-8", value: "8" },
    { id: 9, label: "Level-9", value: "9" },
    { id: 10, label: "Level-10", value: "10" }
];

export const DISTRESS_LEVEL_OPTIONS = [
    { id: 1, label: "None", value: "NONE" },
    { id: 2, label: "Mild", value: "MILD" },
    { id: 3, label: "Moderate", value: "MODERATE" },
    { id: 4, label: "Severe", value: "SEVERE" }
];

export const HYGIENE_GROOMING_OPTIONS = [
    { id: 1, label: "Good", value: "GOOD" },
    { id: 2, label: "Fair", value: "FAIR" },
    { id: 3, label: "Poor", value: "POOR" },
    { id: 4, label: "Unkempt", value: "UNKEMPT" }
];

export const SPEECH_OPTIONS = [
    { id: 1, label: "Normal", value: "NORMAL" },
    { id: 2, label: "Slurred", value: "SLURRED" },
    { id: 3, label: "Slow", value: "SLOW" },
    { id: 4, label: "Rapid", value: "RAPID" },
    { id: 5, label: "Mute", value: "MUTE" }
];

export const MOOD_BEHAVIOR_OPTIONS = [
    { id: 1, label: "Calm", value: "CALM" },
    { id: 2, label: "Cooperative", value: "COOPERATIVE" },
    { id: 3, label: "Anxious", value: "ANXIOUS" },
    { id: 4, label: "Agitated", value: "AGITATED" },
    { id: 5, label: "Aggressive", value: "AGGRESSIVE" },
    { id: 6, label: "Withdrawn", value: "WITHDRAWN" },
    { id: 7, label: "Depressed", value: "DEPRESSED" }
];

export const SKIN_COLOR_PERFUSION_OPTIONS = [
    { id: 1, label: "Normal", value: "NORMAL" },
    { id: 2, label: "Pale", value: "PALE" },
    { id: 3, label: "Cyanosed", value: "CYANOSED" },
    { id: 4, label: "Flushed", value: "FLUSHED" },
    { id: 5, label: "Mottled", value: "MOTTLED" },
    { id: 6, label: "Jaundiced", value: "JAUNDICED" }
];

export const HEART_SOUNDS_LIST = [
    { id: 1, code: 'RRR', name: 'Regular Rate & Rhythm' },
    { id: 2, code: 'TACHYCARDIA', name: 'Tachycardia' },
    { id: 3, code: 'BRADYCARDIA', name: 'Bradycardia' },
    { id: 4, code: 'IRREGULAR_RHYTHM', name: 'Irregularly Irregular Rhythm' },
    { id: 5, code: 'PVC', name: 'Premature Ventricular Contractions (PVCs)' },
    { id: 6, code: 'NORMAL_S1_S2', name: 'Normal S1, S2' },
    { id: 7, code: 'DISTANT_SOUNDS', name: 'Distant/Muffled Heart Sounds' },
    { id: 8, code: 'NO_MURMURS', name: 'No Murmurs' },
    { id: 9, code: 'SYSTOLIC_MURMUR', name: 'Systolic Murmur' },
    { id: 10, code: 'DIASTOLIC_MURMUR', name: 'Diastolic Murmur' },
    { id: 11, code: 'HOLOSYSTOLIC_MURMUR', name: 'Holosystolic Murmur' },
    { id: 12, code: 'S3_GALLOP', name: 'S3 Gallop' },
    { id: 13, code: 'S4_GALLOP', name: 'S4 Gallop' },
    { id: 14, code: 'PERICARDIAL_RUB', name: 'Pericardial Friction Rub' },
    { id: 15, code: 'EJECTION_CLICK', name: 'Systolic Ejection Click' },
    { id: 16, code: 'MID_SYSTOLIC_CLICK', name: 'Mid-Systolic Click' }
];

export const HEART_SOUND_STATEMENTS: Record<string, string> = {
    RRR: 'Cardiac rhythm is regular with a normal rate.',
    TACHYCARDIA: 'Cardiac examination reveals tachycardia.',
    BRADYCARDIA: 'Cardiac examination reveals bradycardia.',
    IRREGULAR_RHYTHM: 'Cardiac rhythm is irregularly irregular.',
    PVC: 'Occasional premature ventricular contractions are noted.',
    NORMAL_S1_S2: 'Normal S1 and S2 heart sounds are appreciated.',
    DISTANT_SOUNDS: 'Heart sounds are distant and muffled.',
    NO_MURMURS: 'No cardiac murmurs are appreciated.',
    SYSTOLIC_MURMUR: 'A systolic murmur is auscultated.',
    DIASTOLIC_MURMUR: 'A diastolic murmur is auscultated.',
    HOLOSYSTOLIC_MURMUR: 'A holosystolic murmur is present.',
    S3_GALLOP: 'An S3 gallop is present.',
    S4_GALLOP: 'An S4 gallop is present.',
    PERICARDIAL_RUB: 'A pericardial friction rub is auscultated.',
    EJECTION_CLICK: 'A systolic ejection click is appreciated.',
    MID_SYSTOLIC_CLICK: 'A mid-systolic click is auscultated.'
};

export const PULSES_PERFUSION_LIST = [
    { id: 1, code: 'SYMMETRIC_2PLUS', name: 'Symmetric 2+' },
    { id: 2, code: 'CAP_REFILL_NORMAL', name: 'Cap Refill < 2s' },
    { id: 3, code: 'WARM_DRY', name: 'Warm & Dry Extremities' },
    { id: 4, code: 'CAP_REFILL_DELAYED', name: 'Delayed Cap Refill (> 2s)' },
    { id: 5, code: 'COOL_EXTREMITIES', name: 'Cool/Cold Extremities' },
    { id: 6, code: 'MOTTLED', name: 'Mottled Skin' },
    { id: 7, code: 'BOUNDING_3PLUS', name: 'Bounding Pulses (3+)' },
    { id: 8, code: 'DIMINISHED_1PLUS', name: 'Diminished Pulses (1+)' },
    { id: 9, code: 'ABSENT_0', name: 'Absent Pulses (0)' },
    { id: 10, code: 'ASYMMETRIC_PULSES', name: 'Asymmetric Pulses' },
    { id: 11, code: 'WEAK_DP_PT', name: 'Weak DP/PT Pulses' },
    { id: 12, code: 'WEAK_RADIAL', name: 'Weak Radial Pulses' },
    { id: 13, code: 'CLUBBING', name: 'Digital Clubbing' },
    { id: 14, code: 'CYANOSIS_EXTREMITIES', name: 'Peripheral Cyanosis' }
];

export const PULSES_PERFUSION_STATEMENTS: Record<string, string> = {
    SYMMETRIC_2PLUS: 'Peripheral pulses are symmetric and graded 2+ bilaterally.',
    CAP_REFILL_NORMAL: 'Capillary refill is less than 2 seconds.',
    WARM_DRY: 'Extremities are warm and dry.',
    CAP_REFILL_DELAYED: 'Capillary refill is delayed (>2 seconds).',
    COOL_EXTREMITIES: 'Extremities are cool to cold on palpation.',
    MOTTLED: 'Mottling of the skin is noted.',
    BOUNDING_3PLUS: 'Peripheral pulses are bounding (3+).',
    DIMINISHED_1PLUS: 'Peripheral pulses are diminished (1+).',
    ABSENT_0: 'Peripheral pulses are absent.',
    ASYMMETRIC_PULSES: 'Peripheral pulses are asymmetric.',
    WEAK_DP_PT: 'Dorsalis pedis and posterior tibial pulses are weak.',
    WEAK_RADIAL: 'Radial pulses are weak bilaterally.',
    CLUBBING: 'Digital clubbing is present.',
    CYANOSIS_EXTREMITIES: 'Peripheral cyanosis is noted.'
};

export const EDEMA_EXTREMITIES_LIST = [
    { id: 1, code: 'NO_EDEMA', name: 'No Edema' },
    { id: 2, code: 'MALLEOLAR_1PLUS', name: '1+ Malleolar Edema' },
    { id: 3, code: 'PITTING_2PLUS', name: '2+ Pitting Edema' },
    { id: 4, code: 'PITTING_3PLUS', name: '3+ Pitting Edema' },
    { id: 5, code: 'PITTING_4PLUS', name: '4+ Pitting Edema' },
    { id: 6, code: 'BILATERAL_LOWER', name: 'Bilateral Lower Extremities' },
    { id: 7, code: 'UNILATERAL_LEFT', name: 'Left Lower Extremity Only' },
    { id: 8, code: 'UNILATERAL_RIGHT', name: 'Right Lower Extremity Only' },
    { id: 9, code: 'SACRAL_EDEMA', name: 'Sacral Edema' },
    { id: 10, code: 'PEDAL_EDEMA', name: 'Pedal Edema' },
    { id: 11, code: 'PRETIBIAL_EDEMA', name: 'Pretibial Edema' },
    { id: 12, code: 'CVI_STASIS', name: 'Stasis Dermatitis' },
    { id: 13, code: 'CALF_TENDERNESS', name: 'Calf Tenderness (DVT Risk)' },
    { id: 14, code: 'CORDS', name: 'Palpable Venous Cords' }
];

export const EDEMA_EXTREMITIES_STATEMENTS: Record<string, string> = {
    NO_EDEMA: 'No peripheral edema is noted.',
    MALLEOLAR_1PLUS: 'Mild (1+) malleolar edema is present.',
    PITTING_2PLUS: 'Moderate (2+) pitting edema is present.',
    PITTING_3PLUS: 'Marked (3+) pitting edema is present.',
    PITTING_4PLUS: 'Severe (4+) pitting edema is present.',
    BILATERAL_LOWER: 'Edema involves both lower extremities.',
    UNILATERAL_LEFT: 'Edema is confined to the left lower extremity.',
    UNILATERAL_RIGHT: 'Edema is confined to the right lower extremity.',
    SACRAL_EDEMA: 'Sacral edema is present.',
    PEDAL_EDEMA: 'Pedal edema is noted.',
    PRETIBIAL_EDEMA: 'Pretibial edema is present.',
    CVI_STASIS: 'Stasis dermatitis is noted over the affected lower extremities.',
    CALF_TENDERNESS: 'Calf tenderness is elicited on palpation.',
    CORDS: 'Palpable venous cords are appreciated.'
};

export const RESPIRATORY_EFFORT_LIST = [
    { id: 1, code: 'UNLABORED_SYMMETRIC', name: 'Unlabored Symmetric' },
    { id: 2, code: 'ACCESSORY_USE', name: 'Accessory Muscle Use' },
    { id: 3, code: 'INTERCOSTAL_RETRACTIONS', name: 'Intercostal Retractions' },
    { id: 4, code: 'ASYMMETRIC_EXPANSION', name: 'Asymmetric Chest Expansion' },
    { id: 5, code: 'TACHYPNEA', name: 'Tachypneic' },
    { id: 6, code: 'BRADYPNEA', name: 'Bradypneic' },
    { id: 7, code: 'PARADOXICAL', name: 'Paradoxical Breathing' }
];

export const RESPIRATORY_EFFORT_STATEMENTS: Record<string, string> = {
    UNLABORED_SYMMETRIC: 'Respirations are unlabored with symmetric chest expansion.',
    ACCESSORY_USE: 'Increased work of breathing noted with visible accessory muscle utilization.',
    INTERCOSTAL_RETRACTIONS: 'Mild intercostal retractions observed during inspiration.',
    ASYMMETRIC_EXPANSION: 'Asymmetric chest wall expansion appreciated.',
    TACHYPNEA: 'Patient is tachypneic with shallow respirations.',
    BRADYPNEA: 'Respiratory rate is abnormally slow and bradypneic.',
    PARADOXICAL: 'Respiratory rate is abnormally slow and bradypneic.'
};

export const LUNG_AUSCULTATION_LIST = [
    { id: 1, code: 'CTAB', name: 'CTAB' },
    { id: 2, code: 'CLEAR_NO_WHEEZING', name: 'Clear / No Wheezing' },
    { id: 3, code: 'WHEEZING_BILATERAL', name: 'Bilateral Wheezing' },
    { id: 4, code: 'EXPIRATORY_WHEEZE', name: 'Expiratory Wheezing' },
    { id: 5, code: 'FINE_CRACKLES', name: 'Fine Crackles / Rales' },
    { id: 6, code: 'COARSE_CRACKLES', name: 'Coarse Crackles' },
    { id: 7, code: 'RHONCHI', name: 'Rhonchi' },
    { id: 8, code: 'DIMINISHED_BASES', name: 'Diminished Sounds at Bases' },
    { id: 9, code: 'STRIDOR', name: 'Inspiratory Stridor' }
];

export const LUNG_AUSCULTATION_STATEMENTS: Record<string, string> = {
    CTAB: 'Lungs are clear to auscultation bilaterally.',
    CLEAR_NO_WHEEZING: 'Breath sounds are clear with no wheezing, rhonchi, or rales present.',
    WHEEZING_BILATERAL: 'Diffuse bilateral wheezing appreciated on auscultation.',
    EXPIRATORY_WHEEZE: 'End-expiratory wheezing noted locally.',
    FINE_CRACKLES: 'Fine rales/crackles heard at the lung bases.',
    COARSE_CRACKLES: 'Coarse crackles present, suggesting secretions in the larger airways.',
    RHONCHI: 'Low-pitched rhonchi noted, clearing partially with cough.',
    DIMINISHED_BASES: 'Breath sounds are significantly diminished at the bilateral bases.'
};