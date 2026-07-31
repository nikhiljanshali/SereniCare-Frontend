export interface ExaminationOption {
    id: number;
    code: string;
    name: string;
}

export const EXAMINATION_MASTER = {
    generalAppearance: {
        list: [
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
            { id: 17, code: 'JAUNDICED', name: 'Jaundiced' }
        ],
        statements: {
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
            JAUNDICED: 'Icterus (jaundice) is present.'
        }
    },
    cardiovascular: {
        heartSound: {
            list: [
                // Rate & Rhythm
                { id: 1, code: 'RRR', name: 'Regular Rate & Rhythm' },
                { id: 2, code: 'TACHYCARDIA', name: 'Tachycardia' },
                { id: 3, code: 'BRADYCARDIA', name: 'Bradycardia' },
                { id: 4, code: 'IRREGULAR_RHYTHM', name: 'Irregularly Irregular Rhythm' },
                { id: 5, code: 'PVC', name: 'Premature Ventricular Contractions (PVCs)' },

                // Normal / Basic Heart Sounds
                { id: 6, code: 'NORMAL_S1_S2', name: 'Normal S1, S2' },
                { id: 7, code: 'DISTANT_SOUNDS', name: 'Distant/Muffled Heart Sounds' },

                // Murmurs
                { id: 8, code: 'NO_MURMURS', name: 'No Murmurs' },
                { id: 9, code: 'SYSTOLIC_MURMUR', name: 'Systolic Murmur' },
                { id: 10, code: 'DIASTOLIC_MURMUR', name: 'Diastolic Murmur' },
                { id: 11, code: 'HOLOSYSTOLIC_MURMUR', name: 'Holosystolic Murmur' },

                // Extra Sounds & Gallops
                { id: 12, code: 'S3_GALLOP', name: 'S3 Gallop' },
                { id: 13, code: 'S4_GALLOP', name: 'S4 Gallop' },
                { id: 14, code: 'PERICARDIAL_RUB', name: 'Pericardial Friction Rub' },
                { id: 15, code: 'EJECTION_CLICK', name: 'Systolic Ejection Click' },
                { id: 16, code: 'MID_SYSTOLIC_CLICK', name: 'Mid-Systolic Click' }
            ],
            statements: {
                // Rate & Rhythm
                RRR: 'Cardiac rhythm is regular with a normal rate.',
                TACHYCARDIA: 'Cardiac examination reveals tachycardia.',
                BRADYCARDIA: 'Cardiac examination reveals bradycardia.',
                IRREGULAR_RHYTHM: 'Cardiac rhythm is irregularly irregular.',
                PVC: 'Occasional premature ventricular contractions are noted.',

                // Heart Sounds
                NORMAL_S1_S2: 'Normal S1 and S2 heart sounds are appreciated.',
                DISTANT_SOUNDS: 'Heart sounds are distant and muffled.',

                // Murmurs
                NO_MURMURS: 'No cardiac murmurs are appreciated.',
                SYSTOLIC_MURMUR: 'A systolic murmur is auscultated.',
                DIASTOLIC_MURMUR: 'A diastolic murmur is auscultated.',
                HOLOSYSTOLIC_MURMUR: 'A holosystolic murmur is present.',

                // Extra Sounds
                S3_GALLOP: 'An S3 gallop is present.',
                S4_GALLOP: 'An S4 gallop is present.',
                PERICARDIAL_RUB: 'A pericardial friction rub is auscultated.',
                EJECTION_CLICK: 'A systolic ejection click is appreciated.',
                MID_SYSTOLIC_CLICK: 'A mid-systolic click is auscultated.'
            }
        },
        pulsePrefusion: {
            list: [
                // Normal Findings (as seen in your tags)
                { id: 1, code: 'SYMMETRIC_2PLUS', name: 'Symmetric 2+' },
                { id: 2, code: 'CAP_REFILL_NORMAL', name: 'Cap Refill < 2s' },
                { id: 3, code: 'WARM_DRY', name: 'Warm & Dry Extremities' },

                // Capillary Refill & Perfusion Issues
                { id: 4, code: 'CAP_REFILL_DELAYED', name: 'Delayed Cap Refill (> 2s)' },
                { id: 5, code: 'COOL_EXTREMITIES', name: 'Cool/Cold Extremities' },
                { id: 6, code: 'MOTTLED', name: 'Mottled Skin' },

                // Pulse Intensity / Grading
                { id: 7, code: 'BOUNDING_3PLUS', name: 'Bounding Pulses (3+)' },
                { id: 8, code: 'DIMINISHED_1PLUS', name: 'Diminished Pulses (1+)' },
                { id: 9, code: 'ABSENT_0', name: 'Absent Pulses (0)' },

                // Asymmetry & Specific Locations
                { id: 10, code: 'ASYMMETRIC_PULSES', name: 'Asymmetric Pulses' },
                { id: 11, code: 'WEAK_DP_PT', name: 'Weak DP/PT Pulses' }, // Dorsalis Pedis / Posterior Tibial
                { id: 12, code: 'WEAK_RADIAL', name: 'Weak Radial Pulses' },

                // Related Signs
                { id: 13, code: 'CLUBBING', name: 'Digital Clubbing' },
                { id: 14, code: 'CYANOSIS_EXTREMITIES', name: 'Peripheral Cyanosis' }
            ],
            statements: {
                // Normal Findings
                SYMMETRIC_2PLUS: 'Peripheral pulses are symmetric and graded 2+ bilaterally.',
                CAP_REFILL_NORMAL: 'Capillary refill is less than 2 seconds.',
                WARM_DRY: 'Extremities are warm and dry.',

                // Capillary Refill & Perfusion
                CAP_REFILL_DELAYED: 'Capillary refill is delayed (>2 seconds).',
                COOL_EXTREMITIES: 'Extremities are cool to cold on palpation.',
                MOTTLED: 'Mottling of the skin is noted.',

                // Pulse Intensity
                BOUNDING_3PLUS: 'Peripheral pulses are bounding (3+).',
                DIMINISHED_1PLUS: 'Peripheral pulses are diminished (1+).',
                ABSENT_0: 'Peripheral pulses are absent.',

                // Pulse Symmetry / Location
                ASYMMETRIC_PULSES: 'Peripheral pulses are asymmetric.',
                WEAK_DP_PT: 'Dorsalis pedis and posterior tibial pulses are weak.',
                WEAK_RADIAL: 'Radial pulses are weak bilaterally.',

                // Associated Findings
                CLUBBING: 'Digital clubbing is present.',
                CYANOSIS_EXTREMITIES: 'Peripheral cyanosis is noted.'
            }
        },
        edemaExtremities: {
            list: [
                // Normal Findings (as seen in your tags)
                { id: 1, code: 'NO_EDEMA', name: 'No Edema' },
                { id: 2, code: 'MALLEOLAR_1PLUS', name: '1+ Malleolar Edema' },

                // Edema Severity / Grading
                { id: 3, code: 'PITTING_2PLUS', name: '2+ Pitting Edema' },
                { id: 4, code: 'PITTING_3PLUS', name: '3+ Pitting Edema' },
                { id: 5, code: 'PITTING_4PLUS', name: '4+ Pitting Edema' },

                // Location / Distribution
                { id: 6, code: 'BILATERAL_LOWER', name: 'Bilateral Lower Extremities' },
                { id: 7, code: 'UNILATERAL_LEFT', name: 'Left Lower Extremity Only' },
                { id: 8, code: 'UNILATERAL_RIGHT', name: 'Right Lower Extremity Only' },
                { id: 9, code: 'SACRAL_EDEMA', name: 'Sacral Edema' },
                { id: 10, code: 'PEDAL_EDEMA', name: 'Pedal Edema' },
                { id: 11, code: 'PRETIBIAL_EDEMA', name: 'Pretibial Edema' },

                // Associated Extremity Signs
                { id: 12, code: 'CVI_STASIS', name: 'Stasis Dermatitis' },
                { id: 13, code: 'CALF_TENDERNESS', name: 'Calf Tenderness (DVT Risk)' },
                { id: 14, code: 'CORDS', name: 'Palpable Venous Cords' }
            ],
            statements: {
                // Normal Findings
                NO_EDEMA: 'No peripheral edema is noted.',
                MALLEOLAR_1PLUS: 'Mild (1+) malleolar edema is present.',

                // Edema Severity
                PITTING_2PLUS: 'Moderate (2+) pitting edema is present.',
                PITTING_3PLUS: 'Marked (3+) pitting edema is present.',
                PITTING_4PLUS: 'Severe (4+) pitting edema is present.',

                // Distribution
                BILATERAL_LOWER: 'Edema involves both lower extremities.',
                UNILATERAL_LEFT: 'Edema is confined to the left lower extremity.',
                UNILATERAL_RIGHT: 'Edema is confined to the right lower extremity.',
                SACRAL_EDEMA: 'Sacral edema is present.',
                PEDAL_EDEMA: 'Pedal edema is noted.',
                PRETIBIAL_EDEMA: 'Pretibial edema is present.',

                // Associated Findings
                CVI_STASIS: 'Stasis dermatitis is noted over the affected lower extremities.',
                CALF_TENDERNESS: 'Calf tenderness is elicited on palpation.',
                CORDS: 'Palpable venous cords are appreciated.'
            }
        }
    },
    respiratory: {
        respiratoryEffort: {
            list: [
                { id: 1, code: 'UNLABORED_SYMMETRIC', name: 'Unlabored Symmetric' }, // Visible in chrome_pLYQ9MMqDf.png
                { id: 2, code: 'ACCESSORY_USE', name: 'Accessory Muscle Use' },
                { id: 3, code: 'INTERCOSTAL_RETRACTIONS', name: 'Intercostal Retractions' },
                { id: 4, code: 'ASYMMETRIC_EXPANSION', name: 'Asymmetric Chest Expansion' },
                { id: 5, code: 'TACHYPNEA', name: 'Tachypneic' },
                { id: 6, code: 'BRADYPNEA', name: 'Bradypneic' },
                { id: 7, code: 'PARADOXICAL', name: 'Paradoxical Breathing' }
            ],
            statements: {
                UNLABORED_SYMMETRIC: 'Respirations are unlabored with symmetric chest expansion.',
                ACCESSORY_USE: 'Increased work of breathing noted with visible accessory muscle utilization.',
                INTERCOSTAL_RETRACTIONS: 'Mild intercostal retractions observed during inspiration.',
                ASYMMETRIC_EXPANSION: 'Asymmetric chest wall expansion appreciated.',
                TACHYPNEA: 'Patient is tachypneic with shallow respirations.',
                BRADYPNEA: 'Respiratory rate is abnormally slow and bradypneic.',
                PARADOXICAL: 'Respiratory rate is abnormally slow and bradypneic.'
            }
        },
        lungAuscultation: {
            list: [
                { id: 1, code: 'CTAB', name: 'CTAB' }, // Clear To Auscultation Bilaterally
                { id: 2, code: 'CLEAR_NO_WHEEZING', name: 'Clear / No Wheezing' },
                { id: 3, code: 'WHEEZING_BILATERAL', name: 'Bilateral Wheezing' },
                { id: 4, code: 'EXPIRATORY_WHEEZE', name: 'Expiratory Wheezing' },
                { id: 5, code: 'FINE_CRACKLES', name: 'Fine Crackles / Rales' },
                { id: 6, code: 'COARSE_CRACKLES', name: 'Coarse Crackles' },
                { id: 7, code: 'RHONCHI', name: 'Rhonchi' },
                { id: 8, code: 'DIMINISHED_BASES', name: 'Diminished Sounds at Bases' },
                { id: 9, code: 'STRIDOR', name: 'Inspiratory Stridor' }
            ],
            statements: {
                CTAB: 'Lungs are clear to auscultation bilaterally.',
                CLEAR_NO_WHEEZING: 'Breath sounds are clear with no wheezing, rhonchi, or rales present.',
                WHEEZING_BILATERAL: 'Diffuse bilateral wheezing appreciated on auscultation.',
                EXPIRATORY_WHEEZE: 'End-expiratory wheezing noted locally.',
                FINE_CRACKLES: 'Fine rales/crackles heard at the lung bases.',
                COARSE_CRACKLES: 'Coarse crackles present, suggesting secretions in the larger airways.',
                RHONCHI: 'Low-pitched rhonchi noted, clearing partially with cough.',
                DIMINISHED_BASES: 'Breath sounds are significantly diminished at the bilateral bases.'
            }
        }
    },
    neurological: {
        cranialNerves: {
            list: [
                // Global & Normal Baselines
                { id: 1, code: 'CN_II_XII_INTACT', name: 'CN II-XII Intact' },
                { id: 2, code: 'CN_GROSSLY_INTACT', name: 'Cranial Nerves Grossly Intact' },
                { id: 3, code: 'NO_FACIAL_ASYMMETRY', name: 'No Facial Asymmetry' },

                // CN II, III, IV, VI (Vision, Pupils, Extraocular Movements)
                { id: 4, code: 'PERRLA', name: 'PERRLA (Pupils Equal, Round, Reactive to Light & Accommodation)' },
                { id: 5, code: 'EOMI', name: 'EOMI (Extraocular Movements Intact)' },
                { id: 6, code: 'PUPILS_ASYNCHRONOUS_SLUGGISH', name: 'Sluggish Pupillary Response' },
                { id: 7, code: 'ANISOCORIA_PRESENT', name: 'Anisocoria Present' },
                { id: 8, code: 'NYSTAGMUS_PRESENT', name: 'Nystagmus Present' },
                { id: 9, code: 'PTOSIS_NOTED', name: 'Ptosis Noted' },
                { id: 10, code: 'VISUAL_FIELDS_INTACT', name: 'Visual Fields Intact to Confrontation' },

                // CN V & VII (Trigeminal Sensation & Facial Motor)
                { id: 11, code: 'FACIAL_SENSATION_INTACT_V', name: 'Facial Sensation Intact (CN V)' },
                { id: 12, code: 'FACIAL_SYMMETRIC_MOTOR_VII', name: 'Facial Movements Symmetric (CN VII)' },
                { id: 13, code: 'FACIAL_DROOP_RIGHT_VII', name: 'Right Facial Droop Noted' },
                { id: 14, code: 'FACIAL_DROOP_LEFT_VII', name: 'Left Facial Droop Noted' },

                // CN VIII (Acoustic / Hearing)
                { id: 15, code: 'HEARING_INTACT_BILATERAL_VIII', name: 'Hearing Intact Bilaterally' },
                { id: 16, code: 'HEARING_DECREASED_BILATERAL', name: 'Grossly Decreased Hearing' },

                // CN IX & X (Palatal Elevation & Gag)
                { id: 17, code: 'PALATE_ELEVATES_SYMMETRIC_IX_X', name: 'Palate Elevates Symmetrically' },
                { id: 18, code: 'UVULA_DEVIATION_RIGHT', name: 'Uvula Deviated to the Right' },
                { id: 19, code: 'UVULA_DEVIATION_LEFT', name: 'Uvula Deviated to the Left' },
                { id: 20, code: 'GAG_REFLEX_INTACT', name: 'Gag Reflex Intact' },

                // CN XI (Spinal Accessory - Shrug & Neck Rotation)
                { id: 21, code: 'SHOULDER_SHRUG_SYMMETRIC_XI', name: 'Shoulder Shrug Symmetric (CN XI)' },
                { id: 22, code: 'STERNOCLEIDOMASTOID_STRENGTH_INTACT', name: 'Neck Rotation Strength Equal' },

                // CN XII (Hypoglossal - Tongue Protrusion)
                { id: 23, code: 'TONGUE_MIDLINE_XII', name: 'Tongue Protrudes Midline' },
                { id: 24, code: 'TONGUE_DEVIATION_RIGHT', name: 'Tongue Deviates to the Right' },
                { id: 25, code: 'TONGUE_DEVIATION_LEFT', name: 'Tongue Deviates to the Left' }
            ],
            statements: {
                // Global & Normal Baselines
                CN_II_XII_INTACT: 'Cranial nerves II through XII are intact without focal deficits.',
                CN_GROSSLY_INTACT: 'Cranial nerves are grossly intact upon bedside examination.',
                NO_FACIAL_ASYMMETRY: 'Facial features are symmetric at rest and with movement.',

                // CN II, III, IV, VI (Vision, Pupils, Extraocular Movements)
                PERRLA: 'Pupils are equal, round, and reactive to light and accommodation.',
                EOMI: 'Extraocular movements are intact without strabismus or restriction.',
                PUPILS_ASYNCHRONOUS_SLUGGISH: 'Sluggish pupillary response noted to light stimulation.',
                ANISOCORIA_PRESENT: 'Pupillary asymmetry (anisocoria) is present.',
                NYSTAGMUS_PRESENT: 'Nystagmus noted during lateral or vertical extraocular gaze tracking.',
                PTOSIS_NOTED: 'Ptosis of the eyelid is observed.',
                VISUAL_FIELDS_INTACT: 'Visual fields are intact to gross confrontation across all quadrants.',

                // CN V & VII (Trigeminal Sensation & Facial Motor)
                FACIAL_SENSATION_INTACT_V: 'Facial sensation is intact to light touch symmetrically across all three trigeminal distributions.',
                FACIAL_SYMMETRIC_MOTOR_VII: 'Facial movements are symmetric and strong during forehead wrinkling, eye closure, and smiling.',
                FACIAL_DROOP_RIGHT_VII: 'Right-sided facial droop and flattening of the nasolabial fold are observed.',
                FACIAL_DROOP_LEFT_VII: 'Left-sided facial droop and flattening of the nasolabial fold are observed.',

                // CN VIII (Acoustic / Hearing)
                HEARING_INTACT_BILATERAL_VIII: 'Auditory acuity is intact bilaterally to gross rustle or whisper testing.',
                HEARING_DECREASED_BILATERAL: 'Grossly decreased auditory acuity noted upon clinical examination.',

                // CN IX & X (Palatal Elevation & Gag)
                PALATE_ELEVATES_SYMMETRIC_IX_X: 'The palate and uvula elevate symmetrically on phonation.',
                UVULA_DEVIATION_RIGHT: 'Asymmetric palatal elevation present with the uvula deviating to the right.',
                UVULA_DEVIATION_LEFT: 'Asymmetric palatal elevation present with the uvula deviating to the left.',
                GAG_REFLEX_INTACT: 'Pharyngeal gag reflex is functional and intact.',

                // CN XI (Spinal Accessory - Shrug & Neck Rotation)
                SHOULDER_SHRUG_SYMMETRIC_XI: 'Trapezius muscle strength is symmetric and intact during shoulder shrug testing.',
                STERNOCLEIDOMASTOID_STRENGTH_INTACT: 'Sternocleidomastoid muscle strength is intact and symmetric against resistance.',

                // CN XII (Hypoglossal - Tongue Protrusion)
                TONGUE_MIDLINE_XII: 'The tongue protrudes in the midline without tremors or fasciculations.',
                TONGUE_DEVIATION_RIGHT: 'The tongue deviates toward the right side upon protrusion, indicating weak hypoglossal output.',
                TONGUE_DEVIATION_LEFT: 'The tongue deviates toward the left side upon protrusion, indicating weak hypoglossal output.'
            }
        },
        mentalStatus: {
            list: [
                // Level of Consciousness (LOC)
                { id: 1, code: 'ALERT', name: 'Alert' },
                { id: 2, code: 'LETHARGIC', name: 'Lethargic' },
                { id: 3, code: 'SOMNOLENT', name: 'Somnolent' },
                { id: 4, code: 'OBTUNDED', name: 'Obtunded' },
                { id: 5, code: 'STUPOROUS', name: 'Stuporous' },
                { id: 6, code: 'COMATOSE', name: 'Comatose' },

                // Orientation Baseline
                { id: 7, code: 'ALERT_ORIENTED_X4', name: 'Alert & Oriented x4' },
                { id: 8, code: 'ALERT_ORIENTED_X3', name: 'Alert & Oriented x3' },
                { id: 9, code: 'DISORIENTED_TIME', name: 'Disoriented to Time' },
                { id: 10, code: 'DISORIENTED_PLACE', name: 'Disoriented to Place' },
                { id: 11, code: 'CONFUSED', name: 'Confused' },

                // Glasgow Coma Scale (GCS) Quick-Scores
                { id: 12, code: 'GCS_15_NORMAL', name: 'GCS 15 (E4 V5 M6)' },
                { id: 13, code: 'GCS_MILD_INJURY', name: 'GCS 13-14 (Mild Injury)' },
                { id: 14, code: 'GCS_MODERATE_INJURY', name: 'GCS 9-12 (Moderate Injury)' },
                { id: 15, code: 'GCS_SEVERE_INJURY', name: 'GCS <=8 (Severe/Intubate)' },

                // Behavior, Mood & Affect
                { id: 16, code: 'COOPERATIVE', name: 'Cooperative' },
                { id: 17, code: 'CALM_PLEASANT', name: 'Calm & Pleasant' },
                { id: 18, code: 'ANXIOUS', name: 'Anxious' },
                { id: 19, code: 'AGITATED', name: 'Agitated' },
                { id: 20, code: 'FLAT_AFFECT', name: 'Flat Affect' },
                { id: 21, code: 'RESTLESS', name: 'Restless' },

                // Speech & Communication
                { id: 22, code: 'SPEECH_CLEAR_COHERENT', name: 'Speech Clear & Coherent' },
                { id: 23, code: 'SLURRED_SPEECH', name: 'Slurred Speech' },
                { id: 24, code: 'APHASIC_EXPRESSIVE', name: 'Aphasic (Expressive)' },
                { id: 25, code: 'APHASIC_RECEPTIVE', name: 'Aphasic (Receptive)' },
                { id: 26, code: 'DYSARTHRIC', name: 'Dysarthric' }
            ],
            statements: {
                // Level of Consciousness (LOC)
                ALERT: 'Patient is alert and responsive to surrounding stimuli.',
                LETHARGIC: 'Patient appears lethargic, drowsy, and drifts off to sleep easily, but is easily aroused by verbal stimuli.',
                SOMNOLENT: 'Patient is somnolent, demonstrating significant drowsiness and requiring prolonged stimulation to remain awake.',
                OBTUNDED: 'Patient is obtunded, responding slowly and showing decreased interest or awareness of the environment.',
                STUPOROUS: 'Patient is stuporous, requiring vigorous or painful stimuli to elicit a brief response.',
                COMATOSE: 'Patient is comatose and completely unresponsive to external or painful stimuli.',

                // Orientation Baseline
                ALERT_ORIENTED_X4: 'Patient is alert and oriented to person, place, time, and situation.',
                ALERT_ORIENTED_X3: 'Patient is alert and oriented to person, place, and time.',
                DISORIENTED_TIME: 'Patient is alert but disoriented to time.',
                DISORIENTED_PLACE: 'Patient is alert but disoriented to their current location.',
                CONFUSED: 'Patient exhibits general confusion and is unable to follow lines of thought consistently.',

                // Glasgow Coma Scale (GCS) Quick-Scores
                GCS_15_NORMAL: 'Glasgow Coma Scale score is 15 (Eye opening: 4, Verbal response: 5, Motor response: 6), indicating normal baseline neurologic function.',
                GCS_MILD_INJURY: 'Glasgow Coma Scale score is 13-14, indicating a mild neurological impairment.',
                GCS_MODERATE_INJURY: 'Glasgow Coma Scale score is 9-12, indicating a moderate neurological impairment.',
                GCS_SEVERE_INJURY: 'Glasgow Coma Scale score is 8 or less, indicating severe neurological compromise requiring immediate airway protection/intubation.',

                // Behavior, Mood & Affect
                COOPERATIVE: 'Patient is cooperative and follows assessment instructions well.',
                CALM_PLEASANT: 'Patient exhibits a calm and pleasant demeanor during the evaluation.',
                ANXIOUS: 'Patient appears overtly anxious, expressing concern or exhibiting nervous behaviors.',
                AGITATED: 'Patient displays psychomotor agitation and is difficult to soothe.',
                FLAT_AFFECT: 'Patient displays a flat, unreactive affect with minimal facial expression or emotional variance.',
                RESTLESS: 'Patient is noticeably restless and shifting positions frequently during the examination.',

                // Speech & Communication
                SPEECH_CLEAR_COHERENT: 'Speech is clear, fluent, and coherent with appropriate volume and cadence.',
                SLURRED_SPEECH: 'Speech production is noticeably slurred, though phrasing remains largely intelligible.',
                APHASIC_EXPRESSIVE: 'Patient displays expressive aphasia, struggling to produce words despite understanding commands.',
                APHASIC_RECEPTIVE: 'Patient displays receptive aphasia, unable to comprehend spoken commands or questions appropriately.',
                DYSARTHRIC: 'Speech is dysarthric, characterized by poor articulation and motor control of speech muscles.'
            }
        },
        motorStrength: {
            list: [
                // Global & Symmetric Findings
                { id: 1, code: 'STRENGTH_5_5_SYMMETRIC', name: '5/5 Strength Symmetric' },
                { id: 2, code: 'MOTOR_INTACT_ALL_EXTREMITIES', name: 'Motor Intact x4 Extremities' },
                { id: 3, code: 'NORMAL_MUSCLE_TONE', name: 'Normal Muscle Tone' },
                { id: 4, code: 'GENERALIZED_WEAKNESS', name: 'Generalized Weakness' },

                // Pronator Drift
                { id: 5, code: 'NO_PRONATOR_DRIFT', name: 'No Pronator Drift' },
                { id: 6, code: 'PRONATOR_DRIFT_RIGHT', name: 'Right Pronator Drift' },
                { id: 7, code: 'PRONATOR_DRIFT_LEFT', name: 'Left Pronator Drift' },

                // Upper Extremity Specifics (Grading Baseline)
                { id: 8, code: 'UE_STRENGTH_5_5_BILATERAL', name: 'Upper Extremities 5/5 Bilaterally' },
                { id: 9, code: 'RIGHT_ARM_WEAKNESS_4_5', name: 'Right Arm Weakness (4/5)' },
                { id: 10, code: 'LEFT_ARM_WEAKNESS_4_5', name: 'Left Arm Weakness (4/5)' },
                { id: 11, code: 'RIGHT_HAND_GRIP_DECREASED', name: 'Decreased Right Hand Grip' },
                { id: 12, code: 'LEFT_HAND_GRIP_DECREASED', name: 'Decreased Left Hand Grip' },

                // Lower Extremity Specifics (Grading Baseline)
                { id: 13, code: 'LE_STRENGTH_5_5_BILATERAL', name: 'Lower Extremities 5/5 Bilaterally' },
                { id: 14, code: 'RIGHT_LEG_WEAKNESS_4_5', name: 'Right Leg Weakness (4/5)' },
                { id: 15, code: 'LEFT_LEG_WEAKNESS_4_5', name: 'Left Leg Weakness (4/5)' },
                { id: 16, code: 'RIGHT_FOOT_DROP', name: 'Right Foot Drop' },
                { id: 17, code: 'LEFT_FOOT_DROP', name: 'Left Foot Drop' },

                // Tone & Lateralizing Signs
                { id: 18, code: 'HEMIPLARESIS_RIGHT', name: 'Right Hemiparesis' },
                { id: 19, code: 'HEMIPLARESIS_LEFT', name: 'Left Hemiparesis' },
                { id: 20, code: 'PARAPLARESIS', name: 'Paraparesis' },
                { id: 21, code: 'FLACCID_TONE', name: 'Flaccid Tone' },
                { id: 22, code: 'SPASTICITY_PRESENT', name: 'Spasticity Present' },
                { id: 23, code: 'RIGIDITY_COG_WHEEL', name: 'Cogwheel Rigidity' }
            ],
            statements: {
                // Global & Symmetric Findings
                STRENGTH_5_5_SYMMETRIC: 'Motor strength is 5/5 and symmetric across all major muscle groups.',
                MOTOR_INTACT_ALL_EXTREMITIES: 'Motor function is fully intact throughout all four extremities.',
                NORMAL_MUSCLE_TONE: 'Normal muscle tone present universally; no rigidity or flaccidity noted.',
                GENERALIZED_WEAKNESS: 'Patient demonstrates generalized, non-focal muscle weakness throughout.',

                // Pronator Drift
                NO_PRONATOR_DRIFT: 'No pronator drift is observed during sustained upper extremity extension.',
                PRONATOR_DRIFT_RIGHT: 'Right-sided pronator drift is noted, with the right arm pronating and drifting downward.',
                PRONATOR_DRIFT_LEFT: 'Left-sided pronator drift is noted, with the left arm pronating and drifting downward.',

                // Upper Extremity Specifics (Grading Baseline)
                UE_STRENGTH_5_5_BILATERAL: 'Upper extremity strength is rated at 5/5 bilaterally.',
                RIGHT_ARM_WEAKNESS_4_5: 'Mild right upper extremity weakness is noted, graded at 4/5.',
                LEFT_ARM_WEAKNESS_4_5: 'Mild left upper extremity weakness is noted, graded at 4/5.',
                RIGHT_HAND_GRIP_DECREASED: 'Hand grip strength is noticeably diminished on the right side.',
                LEFT_HAND_GRIP_DECREASED: 'Hand grip strength is noticeably diminished on the left side.',

                // Lower Extremity Specifics (Grading Baseline)
                LE_STRENGTH_5_5_BILATERAL: 'Lower extremity strength is rated at 5/5 bilaterally.',
                RIGHT_LEG_WEAKNESS_4_5: 'Mild right lower extremity weakness is noted, graded at 4/5.',
                LEFT_LEG_WEAKNESS_4_5: 'Mild left lower extremity weakness is noted, graded at 4/5.',
                RIGHT_FOOT_DROP: 'Right-sided foot drop is present during ambulation and dorsiflexion testing.',
                LEFT_FOOT_DROP: 'Left-sided foot drop is present during ambulation and dorsiflexion testing.',

                // Tone & Lateralizing Signs
                HEMIPLARESIS_RIGHT: 'Right-sided hemiparesis is observed, impacting both the upper and lower extremities.',
                HEMIPLARESIS_LEFT: 'Left-sided hemiparesis is observed, impacting both the upper and lower extremities.',
                PARAPLARESIS: 'Paraparesis is present, characterized by significant motor weakness in both lower extremities.',
                FLACCID_TONE: 'Flaccid muscle tone is noted in the affected muscle groups upon passive movement.',
                SPASTICITY_PRESENT: 'Increased resistance and spasticity are noted during passive range of motion.',
                RIGIDITY_COG_WHEEL: 'Cogwheel rigidity is appreciated during passive joint manipulation.'
            }
        },
        deepTendonReflexes: {
            list: [
                // Global & Symmetric Baselines
                { id: 1, code: 'DTR_2_PLUS_BILATERAL_NORMAL', name: '2+ Bilaterally Normal' },
                { id: 2, code: 'DTR_SYMMETRIC_ALL_SITES', name: 'Symmetric at All Sites' },
                { id: 3, code: 'HYPERREFLEXIA_GENERALIZED', name: 'Generalized Hyperreflexia (3+)' },
                { id: 4, code: 'HYPOREFLEXIA_GENERALIZED', name: 'Generalized Hyporeflexia (1+)' },
                { id: 5, code: 'AREFLEXIA', name: 'Areflexia (0/4)' },

                // Upper Extremity Specific Reflexes
                { id: 6, code: 'BICEPS_REFLEX_2_PLUS_BILATERAL', name: 'Biceps Reflex 2+ Bilaterally' },
                { id: 7, code: 'TRICEPS_REFLEX_2_PLUS_BILATERAL', name: 'Triceps Reflex 2+ Bilaterally' },
                { id: 8, code: 'BRACHIORADIALIS_REFLEX_2_PLUS_BILATERAL', name: 'Brachioradialis Reflex 2+ Bilaterally' },
                { id: 9, code: 'RIGHT_ARM_HYPERREFLEXIA', name: 'Right Upper Extremity Hyperreflexia' },
                { id: 10, code: 'LEFT_ARM_HYPERREFLEXIA', name: 'Left Upper Extremity Hyperreflexia' },

                // Lower Extremity Specific Reflexes
                { id: 11, code: 'PATELLAR_REFLEX_2_PLUS_BILATERAL', name: 'Patellar Reflex (Knee Jerk) 2+ Bilaterally' },
                { id: 12, code: 'ACHILLES_REFLEX_2_PLUS_BILATERAL', name: 'Achilles Reflex (Ankle Jerk) 2+ Bilaterally' },
                { id: 13, code: 'RIGHT_LEG_HYPERREFLEXIA', name: 'Right Lower Extremity Hyperreflexia' },
                { id: 14, code: 'LEFT_LEG_HYPERREFLEXIA', name: 'Left Lower Extremity Hyperreflexia' },

                // Pathological Signs & Release Reflexes
                { id: 15, code: 'BABINSKI_NEGATIVE', name: 'Babinski Negative' },
                { id: 16, code: 'BABINSKI_POSITIVE_RIGHT', name: 'Right Positive Babinski (Upgoing Toe)' },
                { id: 17, code: 'BABINSKI_POSITIVE_LEFT', name: 'Left Positive Babinski (Upgoing Toe)' },
                { id: 18, code: 'CLONUS_ABSENT', name: 'Clonus Absent' },
                { id: 19, code: 'CLONUS_SUSTAINED_ANAKLE', name: 'Sustained Ankle Clonus Present' },
                { id: 20, code: 'HOFFMANS_SIGN_NEGATIVE', name: "Hoffman's Sign Negative" },
                { id: 21, code: 'HOFFMANS_SIGN_POSITIVE', name: "Hoffman's Sign Positive" }
            ],
            statements: {
                // Global & Symmetric Baselines
                DTR_2_PLUS_BILATERAL_NORMAL: 'Deep tendon reflexes are 2+ and normal bilaterally throughout.',
                DTR_SYMMETRIC_ALL_SITES: 'Deep tendon reflexes are symmetric at all tested sites.',
                HYPERREFLEXIA_GENERALIZED: 'Generalized hyperreflexia (3+) noted across both upper and lower muscle groups.',
                HYPOREFLEXIA_GENERALIZED: 'Generalized hyporeflexia (1+) observed uniformly across all reflex sites.',
                AREFLEXIA: 'Areflexia (0/4) is noted; no reflex response can be elicited even with reinforcement.',

                // Upper Extremity Specific Reflexes
                BICEPS_REFLEX_2_PLUS_BILATERAL: 'Biceps tendon reflexes are 2+ and symmetric bilaterally.',
                TRICEPS_REFLEX_2_PLUS_BILATERAL: 'Triceps tendon reflexes are 2+ and symmetric bilaterally.',
                BRACHIORADIALIS_REFLEX_2_PLUS_BILATERAL: 'Brachioradialis tendon reflexes are 2+ and symmetric bilaterally.',
                RIGHT_ARM_HYPERREFLEXIA: 'Hyperreflexia noted specifically within the right upper extremity.',
                LEFT_ARM_HYPERREFLEXIA: 'Hyperreflexia noted specifically within the left upper extremity.',

                // Lower Extremity Specific Reflexes
                PATELLAR_REFLEX_2_PLUS_BILATERAL: 'Patellar tendon reflexes (knee jerk) are 2+ and symmetric bilaterally.',
                ACHILLES_REFLEX_2_PLUS_BILATERAL: 'Achilles tendon reflexes (ankle jerk) are 2+ and symmetric bilaterally.',
                RIGHT_LEG_HYPERREFLEXIA: 'Hyperreflexia noted specifically within the right lower extremity.',
                LEFT_LEG_HYPERREFLEXIA: 'Hyperreflexia noted specifically within the left lower extremity.',

                // Pathological Signs & Release Reflexes
                BABINSKI_NEGATIVE: 'Plantar response is flexor (Babinski sign is negative) bilaterally.',
                BABINSKI_POSITIVE_RIGHT: 'An upgoing great toe (positive Babinski sign) is present on the right side.',
                BABINSKI_POSITIVE_LEFT: 'An upgoing great toe (positive Babinski sign) is present on the left side.',
                CLONUS_ABSENT: 'No ankle clonus is elicited on repetitive testing.',
                CLONUS_SUSTAINED_ANAKLE: 'Sustained ankle clonus is present upon rapid dorsiflexion.',
                HOFFMANS_SIGN_NEGATIVE: "Hoffman's sign is negative bilaterally.",
                HOFFMANS_SIGN_POSITIVE: "A positive Hoffman's sign is present, indicating possible upper motor neuron involvement."
            }
        },
        sensoryExam: {
            list: [
                // Global & Normal Baselines
                { id: 1, code: 'SENSORY_INTACT_BILATERAL', name: 'Sensory Intact Bilaterally' },
                { id: 2, code: 'GROSSLY_INTACT_ALL_EXTREMITIES', name: 'Grossly Intact x4 Extremities' },
                { id: 3, code: 'SYMMETRIC_SENSITIVITY', name: 'Symmetric Sensation Throughout' },

                // Light Touch & Pinprick (Pain) Modalities
                { id: 4, code: 'LIGHT_TOUCH_NORMAL', name: 'Light Touch Intact' },
                { id: 5, code: 'PINPRICK_PAIN_NORMAL', name: 'Pinprick Sensation Intact' },
                { id: 6, code: 'DECREASED_LIGHT_TOUCH_UE', name: 'Decreased Light Touch Upper Extremities' },
                { id: 7, code: 'DECREASED_LIGHT_TOUCH_LE', name: 'Decreased Light Touch Lower Extremities' },

                // Asymmetrical & Localized Deficits
                { id: 8, code: 'DECREASED_SENSATION_L_LE', name: 'Decreased Sensation (L) Lower Extremity' },
                { id: 9, code: 'DECREASED_SENSATION_R_LE', name: 'Decreased Sensation (R) Lower Extremity' },
                { id: 10, code: 'DECREASED_SENSATION_L_UE', name: 'Decreased Sensation (L) Upper Extremity' },
                { id: 11, code: 'DECREASED_SENSATION_R_UE', name: 'Decreased Sensation (R) Upper Extremity' },

                // Advanced Sensory Modalities (Posterior Column / Cortical)
                { id: 12, code: 'VIBRATION_SENSE_INTACT', name: 'Vibration Sense Intact' },
                { id: 13, code: 'VIBRATION_SENSE_IMPAIRED_DISTAL', name: 'Impaired Distal Vibration Sense' },
                { id: 14, code: 'PROPRIOCEPTION_INTACT', name: 'Proprioception (Joint Position) Intact' },
                { id: 15, code: 'PROPRIOCEPTION_IMPAIRED_TOES', name: 'Impaired Joint Position Sense in Toes' },

                // Clinical Patterns & Abnormalities
                { id: 16, code: 'HYPERESTHESIA_PRESENT', name: 'Hyperesthesia Present' },
                { id: 17, code: 'PARESTHESIA_DISTAL_EXTREMITIES', name: 'Paresthesia (Numbness/Tingling) Distal Extremities' },
                { id: 18, code: 'STOCKING_GLOVE_DISTRIBUTION', name: 'Stocking-Glove Distribution Deficit' },
                { id: 19, code: 'DERMATOMAL_DEFICIT_NOTED', name: 'Dermatomal Distribution Deficit Noted' },
                { id: 20, code: 'HEMISENSORY_LOSS_RIGHT', name: 'Right-Sided Hemisensory Loss' },
                { id: 21, code: 'HEMISENSORY_LOSS_LEFT', name: 'Left-Sided Hemisensory Loss' }
            ],
            statements: {
                // Global & Normal Baselines
                SENSORY_INTACT_BILATERAL: 'Sensation is fully intact to light touch and pinprick bilaterally.',
                GROSSLY_INTACT_ALL_EXTREMITIES: 'Sensory function is grossly intact across all four extremities.',
                SYMMETRIC_SENSITIVITY: 'Symmetric sensitivity to external stimuli is noted throughout the examination.',

                // Light Touch & Pinprick (Pain) Modalities
                LIGHT_TOUCH_NORMAL: 'Sensation to light touch is fully intact.',
                PINPRICK_PAIN_NORMAL: 'Sensation to pinprick (sharp/dull discrimination) is intact.',
                DECREASED_LIGHT_TOUCH_UE: 'Diminished response to light touch noted symmetrically across the upper extremities.',
                DECREASED_LIGHT_TOUCH_LE: 'Diminished response to light touch noted symmetrically across the lower extremities.',

                // Asymmetrical & Localized Deficits
                DECREASED_SENSATION_L_LE: 'Decreased sensation is isolated to the left lower extremity.',
                DECREASED_SENSATION_R_LE: 'Decreased sensation is isolated to the right lower extremity.',
                DECREASED_SENSATION_L_UE: 'Decreased sensation is isolated to the left upper extremity.',
                DECREASED_SENSATION_R_UE: 'Decreased sensation is isolated to the right upper extremity.',

                // Advanced Sensory Modalities (Posterior Column / Cortical)
                VIBRATION_SENSE_INTACT: 'Vibration sensation is intact bilaterally at both the upper and lower bony prominences.',
                VIBRATION_SENSE_IMPAIRED_DISTAL: 'Impaired distal vibration sense noted at the toes and ankles.',
                PROPRIOCEPTION_INTACT: 'Proprioception (joint position sense) is fully intact in the digits bilaterally.',
                PROPRIOCEPTION_IMPAIRED_TOES: 'Impaired joint position sense appreciated specifically in the great toes.',

                // Clinical Patterns & Abnormalities
                HYPERESTHESIA_PRESENT: 'Hyperesthesia (abnormally increased sensitivity to stimuli) is noted during the evaluation.',
                PARESTHESIA_DISTAL_EXTREMITIES: 'Patient reports paresthesia, characterized by numbness or tingling in the distal extremities.',
                STOCKING_GLOVE_DISTRIBUTION: 'Sensory deficits demonstrate a classic stocking-glove distribution pattern.',
                DERMATOMAL_DEFICIT_NOTED: 'A localized sensory deficit matching a specific dermatomal distribution is noted.',
                HEMISENSORY_LOSS_RIGHT: 'Right-sided hemisensory loss is observed, splitting the midline cleanly.',
                HEMISENSORY_LOSS_LEFT: 'Left-sided hemisensory loss is observed, splitting the midline cleanly.'
            }
        },
        coordinationGait: {
            list: [
                // Gait & Ambulation Baselines
                { id: 1, code: 'GAIT_STEADY_NORMAL', name: 'Gait Steady' },
                { id: 2, code: 'GAIT_UNSTEADY', name: 'Gait Unsteady' },
                { id: 3, code: 'GAIT_ANTALGIC', name: 'Antalgic Gait' },
                { id: 4, code: 'GAIT_ATAXIC', name: 'Ataxic Gait' },
                { id: 5, code: 'GAIT_SHUFFLING', name: 'Shuffling Gait' },
                { id: 6, code: 'AMBULATES_WITH_ASSISTANCE', name: 'Ambulates with Assistive Device' },

                // Balance & Station (Romberg)
                { id: 7, code: 'ROMBERG_NEGATIVE', name: 'Negative Romberg' },
                { id: 8, code: 'ROMBERG_POSITIVE', name: 'Positive Romberg' },
                { id: 9, code: 'PRONATOR_DRIFT_NEGATIVE', name: 'Negative Pronator Drift' },
                { id: 10, code: 'TANDEM_GAIT_NORMAL', name: 'Tandem Gait Normal' },
                { id: 11, code: 'TANDEM_GAIT_ABNORMAL', name: 'Tandem Gait Abnormal' },

                // Upper Extremity Coordination (Cerebellar)
                { id: 12, code: 'FINGER_TO_NOSE_NORMAL', name: 'Finger-to-Nose Normal' },
                { id: 13, code: 'FINGER_TO_NOSE_DYSMETRIA_RIGHT', name: 'Right-Sided Dysmetria (Finger-to-Nose)' },
                { id: 14, code: 'FINGER_TO_NOSE_DYSMETRIA_LEFT', name: 'Left-Sided Dysmetria (Finger-to-Nose)' },
                { id: 15, code: 'RAM_NORMAL', name: 'Rapid Alternating Movements Normal' },
                { id: 16, code: 'DYSDIADOCHOKINESIA_PRESENT', name: 'Dysdiadochokinesia Present' },

                // Lower Extremity Coordination (Cerebellar)
                { id: 17, code: 'HEEL_TO_SHIN_NORMAL', name: 'Heel-to-Shin Normal' },
                { id: 18, code: 'HEEL_TO_SHIN_ABNORMAL_RIGHT', name: 'Abnormal Right Heel-to-Shin' },
                { id: 19, code: 'HEEL_TO_SHIN_ABNORMAL_LEFT', name: 'Abnormal Left Heel-to-Shin' },

                // Tremors & Extrapyramidal Signs
                { id: 20, code: 'INTENTION_TREMOR_PRESENT', name: 'Intention Tremor Present' },
                { id: 21, code: 'RESTING_TREMOR_PRESENT', name: 'Resting Tremor Present' }
            ],
            statements: {
                // Gait & Ambulation Baselines
                GAIT_STEADY_NORMAL: 'Gait is steady, balanced, and demonstrates a normal rhythmic cadence.',
                GAIT_UNSTEADY: 'Gait is visibly unsteady with a high risk of imbalance noted during ambulation.',
                GAIT_ANTALGIC: 'An antalgic gait pattern is present, characterized by a shortened stance phase to avoid pain on weight-bearing.',
                GAIT_ATAXIC: 'Gait is ataxic, displaying a wide-based, uncoordinated, and irregular stepping pattern.',
                GAIT_SHUFFLING: 'Gait is shuffling, exhibiting abbreviated, flat-footed steps with reduced forward momentum.',
                AMBULATES_WITH_ASSISTANCE: 'Patient requires an assistive device or physical support to safely ambulate.',

                // Balance & Station (Romberg)
                ROMBERG_NEGATIVE: 'Romberg test is negative; station is maintained steadily with eyes closed.',
                ROMBERG_POSITIVE: 'Romberg test is positive, demonstrated by a marked loss of balance or increased sway upon eye closure.',
                PRONATOR_DRIFT_NEGATIVE: 'Negative pronator drift; the arms remain extended symmetrically without downward deviation or pronation.',
                TANDEM_GAIT_NORMAL: 'Tandem gait is performed successfully without loss of balance or deviation from a straight line.',
                TANDEM_GAIT_ABNORMAL: 'Tandem gait is abnormal, characterized by significant instability or an inability to walk heel-to-toe.',

                // Upper Extremity Coordination (Cerebellar)
                FINGER_TO_NOSE_NORMAL: 'Finger-to-nose testing is executed accurately and smoothly without hesitation.',
                FINGER_TO_NOSE_DYSMETRIA_RIGHT: 'Right-sided dysmetria is present during finger-to-nose testing, indicating cerebellar incoordination.',
                FINGER_TO_NOSE_DYSMETRIA_LEFT: 'Left-sided dysmetria is present during finger-to-nose testing, indicating cerebellar incoordination.',
                RAM_NORMAL: 'Rapid alternating movements are performed smoothly, quickly, and symmetrically.',
                DYSDIADOCHOKINESIA_PRESENT: 'Dysdiadochokinesia is present, demonstrated by irregular, uncoordinated rapid alternating movements.',

                // Lower Extremity Coordination (Cerebellar)
                HEEL_TO_SHIN_NORMAL: 'Heel-to-shin testing is accurate and smooth bilaterally.',
                HEEL_TO_SHIN_ABNORMAL_RIGHT: 'Abnormal right heel-to-shin coordination noted, with the foot wandering or slipping off the tibia.',
                HEEL_TO_SHIN_ABNORMAL_LEFT: 'Abnormal left heel-to-shin coordination noted, with the foot wandering or slipping off the tibia.',

                // Tremors & Extrapyramidal Signs
                INTENTION_TREMOR_PRESENT: 'An intention tremor is observed, worsening as the limb approaches its target during volitional movement.',
                RESTING_TREMOR_PRESENT: 'A resting tremor is noted, appearing primarily when the affected limb is completely relaxed.'
            }
        }
    },
    heent: {
        list: [
            // Head
            { id: 1, code: 'HEAD_NORMAL', name: 'Head Normal', type: 'Head' },
            { id: 2, code: 'HEAD_INJURY', name: 'Head Injury', type: 'Head' },
            { id: 3, code: 'HEAD_SWELLING', name: 'Head Swelling', type: 'Head' },
            { id: 4, code: 'ATRAUMATIC_NORMOCEPHALIC', name: 'Atraumatic / Normocephalic', type: 'Head' },

            // Eyes
            { id: 5, code: 'EYES_NORMAL', name: 'Eyes Normal', type: 'Eyes' },
            { id: 6, code: 'EYES_REDNESS', name: 'Conjunctival Redness', type: 'Eyes' },
            { id: 7, code: 'EYES_JAUNDICE', name: 'Scleral Icterus (Jaundice)', type: 'Eyes' },
            { id: 8, code: 'VISION_PROBLEMS', name: 'Vision Problems', type: 'Eyes' },
            { id: 9, code: 'PERRLA', name: 'PERRLA', type: 'Eyes' },
            { id: 10, code: 'EOMI', name: 'EOMI', type: 'Eyes' },
            { id: 11, code: 'PALE_CONJUNCTIVAE', name: 'Pale Conjunctivae', type: 'Eyes' },

            // Ears
            { id: 12, code: 'EARS_NORMAL', name: 'Ears Normal', type: 'Ears' },
            { id: 13, code: 'EARS_INFECTION', name: 'Ear Canal Infection', type: 'Ears' },
            { id: 14, code: 'HEARING_LOSS', name: 'Hearing Loss', type: 'Ears' },
            { id: 15, code: 'TM_ERYTHEMA_BULGING', name: 'TM Erythema / Bulging', type: 'Ears' },
            { id: 16, code: 'TM_INTACT', name: 'Tympanic Membrane Intact', type: 'Ears' },

            // Nose
            { id: 17, code: 'NOSE_NORMAL', name: 'Nose Normal', type: 'Nose' },
            { id: 18, code: 'NOSE_CONGESTION', name: 'Nasal Congestion', type: 'Nose' },
            { id: 19, code: 'NOSE_DISCHARGE', name: 'Rhinorrhea (Discharge)', type: 'Nose' },
            { id: 20, code: 'EPISTAXIS_PRESENT', name: 'Epistaxis', type: 'Nose' },

            // Throat
            { id: 21, code: 'THROAT_NORMAL', name: 'Throat Normal', type: 'Throat' },
            { id: 22, code: 'THROAT_CONGESTION', name: 'Pharyngeal Congestion', type: 'Throat' },
            { id: 23, code: 'TONSILLAR_ENLARGEMENT', name: 'Tonsillar Enlargement', type: 'Throat' },
            { id: 24, code: 'THROAT_REDNESS', name: 'Pharyngeal Erythema', type: 'Throat' },
            { id: 25, code: 'ORAL_MUCOSA_MOIST', name: 'Oral Mucosa Moist', type: 'Throat' },
            { id: 26, code: 'TONSILLAR_EXUDATES', name: 'Tonsillar Exudates', type: 'Throat' }
        ],
        statements: {
            // Head
            HEAD_NORMAL: 'Head examination is normal with no focal abnormalities.',
            HEAD_INJURY: 'Evidence of localized head trauma or superficial injury noted.',
            HEAD_SWELLING: 'Localized cranial swelling or hematoma appreciated.',
            ATRAUMATIC_NORMOCEPHALIC: 'Head is normocephalic and atraumatic.',

            // Eyes
            EYES_NORMAL: 'Eyes are clear, symmetric, and without acute deficits.',
            EYES_REDNESS: 'Conjunctival injection and redness noted.',
            EYES_JAUNDICE: 'Scleral icterus observed, consistent with systemic jaundice.',
            VISION_PROBLEMS: 'Patient reports subjective changes or deficits in visual acuity.',
            PERRLA: 'Pupils are equal, round, and reactive to light and accommodation.',
            EOMI: 'Extraocular movements are fully intact.',
            PALE_CONJUNCTIVAE: 'Pale conjunctivae noted, suggestive of clinical anemia.',

            // Ears
            EARS_NORMAL: 'External ear canals and hearing acuity are grossly normal.',
            EARS_INFECTION: 'Signs of external ear canal inflammation and infection present.',
            HEARING_LOSS: 'Subjective or demonstrative diminished auditory response noted.',
            TM_ERYTHEMA_BULGING: 'Otoscopic exam reveals erythema and distinct bulging of the tympanic membrane.',
            TM_INTACT: 'Tympanic membranes are pearl-gray and intact bilaterally.',

            // Nose
            NOSE_NORMAL: 'Nasal passages are clear and patent.',
            NOSE_CONGESTION: 'Bilateral nasal turbinate congestion and swelling noted.',
            NOSE_DISCHARGE: 'Active nasal discharge (rhinorrhea) observed.',
            EPISTAXIS_PRESENT: 'Active epistaxis appreciated from the anterior nasal passage.',

            // Throat
            THROAT_NORMAL: 'Oropharynx is clear without erythema or structural lesions.',
            THROAT_CONGESTION: 'Pharyngeal hypercongestion and mild cobblestoning observed.',
            TONSILLAR_ENLARGEMENT: 'Tonsillar hypertrophy and enlargement noted.',
            THROAT_REDNESS: 'Prominent pharyngeal erythema observed.',
            ORAL_MUCOSA_MOIST: 'Oral mucosa is pink and moist; no signs of dehydration.',
            TONSILLAR_EXUDATES: 'Distinct tonsillar exudates present on the pharyngeal pillars.'
        }
    },
    gastrointestinal: {
        percussionAscites: {
            list: [
                // Global & Normal Baselines
                { id: 1, code: 'TYMPANIC_THROUGHOUT', name: 'Tympanic Throughout' },
                { id: 2, code: 'NORMAL_PERCUSSION_ALL_QUADRANTS', name: 'Normal Percussion All Quadrants' },
                { id: 3, code: 'NO_SHIFTING_DULLNESS', name: 'No Shifting Dullness' },
                { id: 4, code: 'NEGATIVE_FLUID_WAVE', name: 'Negative Fluid Wave' },

                // Abnormal Percussion Sounds
                { id: 5, code: 'GENERALIZED_DULLNESS', name: 'Generalized Dullness' },
                { id: 6, code: 'HYPERTYMPANIC_DISTENDED', name: 'Hypertympanic (Gaseous Distension)' },
                { id: 7, code: 'DULLNESS_RUQ_LIVER', name: 'Dullness over Right Upper Quadrant' },
                { id: 8, code: 'DULLNESS_LUQ_SPLEEN', name: 'Dullness over Left Upper Quadrant' },

                // Ascites Specific Findings
                { id: 9, code: 'SHIFTING_DULLNESS_PRESENT', name: 'Shifting Dullness Present' },
                { id: 10, code: 'POSITIVE_FLUID_WAVE_SIGN', name: 'Positive Fluid Wave Sign' },

                // Bladder Percussion
                { id: 11, code: 'NORMAL_BLADDER_PERCUSSION', name: 'Normal Bladder Percussion' },
                { id: 12, code: 'DULLNESS_SUPRAPUBIC_DISTENSION', name: 'Suprapubic Dullness (Distended Bladder)' }
            ],
            statements: {
                // Global & Normal Baselines
                TYMPANIC_THROUGHOUT: 'Abdomen is uniformly tympanic throughout all quadrants upon percussion.',
                NORMAL_PERCUSSION_ALL_QUADRANTS: 'Percussion demonstrates normal resonant and tympanic notes across all abdominal regions.',
                NO_SHIFTING_DULLNESS: 'No shifting dullness is appreciated during lateral positioning changes.',
                NEGATIVE_FLUID_WAVE: 'Fluid wave sign is negative, indicating no structural evidence of gross ascites.',

                // Abnormal Percussion Sounds
                GENERALIZED_DULLNESS: 'Generalized dullness is noted across multiple quadrants, suggesting fluid accumulation or tissue masses.',
                HYPERTYMPANIC_DISTENDED: 'Hypertympanic percussion notes obtained universally, consistent with prominent gaseous bowel distension.',
                DULLNESS_RUQ_LIVER: 'Increased dullness is appreciated over the right upper quadrant, indicating potential liver margin extensions.',
                DULLNESS_LUQ_SPLEEN: 'An expanded area of dullness is noted over the left upper quadrant, suspicious for splenic enlargement.',

                // Ascites Specific Findings
                SHIFTING_DULLNESS_PRESENT: 'Shifting dullness is explicitly demonstrated upon repositioning the patient, indicating free intraperitoneal fluid.',
                POSITIVE_FLUID_WAVE_SIGN: 'A distinct fluid wave is transmitted across the abdominal wall upon percussion, highly indicative of ascites.',

                // Bladder Percussion
                NORMAL_BLADDER_PERCUSSION: 'Suprapubic percussion reveals non-dull notes consistent with an empty bladder.',
                DULLNESS_SUPRAPUBIC_DISTENSION: 'Marked dullness is appreciated over the suprapubic region, indicating urinary retention and a distended urinary bladder.'
            }
        },
        specialAbdominalSigns: {
            list: [
                // Global & Normal Baselines
                { id: 1, code: 'NO_REBOUND_TENDERNESS', name: 'No Rebound Tenderness' },
                { id: 2, code: 'NO_MCBURNEY_TENDERNESS', name: 'No McBurney Point Tenderness' },
                { id: 3, code: 'NEGATIVE_MURPHY_SIGN', name: 'Negative Murphy Sign' },
                { id: 4, code: 'SPECIAL_SIGNS_NEGATIVE', name: 'All Acute Abdominal Signs Negative' },

                // Cholecystitis / Gallbladder Signs
                { id: 5, code: 'POSITIVE_MURPHY_SIGN', name: 'Positive Murphy Sign' },

                // Appendicitis Specific Signs
                { id: 6, code: 'POSITIVE_MCBURNEY_TENDERNESS', name: 'McBurney Point Tenderness Present' },
                { id: 7, code: 'POSITIVE_ROVSING_SIGN', name: 'Positive Rovsing Sign' },
                { id: 8, code: 'POSITIVE_PSOAS_SIGN', name: 'Positive Psoas Sign' },
                { id: 9, code: 'POSITIVE_OBTURATOR_SIGN', name: 'Positive Obturator Sign' },

                // Peritonitis / Peritoneal Irritation
                { id: 10, code: 'REBOUND_TENDERNESS_PRESENT', name: 'Rebound Tenderness Present' },
                { id: 11, code: 'RIGIDITY_INVOLUNTARY', name: 'Involuntary Rigidity' },
                { id: 12, code: 'BOARD_LIKE_ABDOMEN', name: 'Board-like Abdomen' }
            ],
            statements: {
                // Global & Normal Baselines
                NO_REBOUND_TENDERNESS: 'No rebound tenderness is elicited across any abdominal quadrant.',
                NO_MCBURNEY_TENDERNESS: 'No tenderness or pain is localized over McBurney\'s point.',
                NEGATIVE_MURPHY_SIGN: 'Murphy\'s sign is negative; no inspiratory arrest is noted during deep right upper quadrant palpation.',
                SPECIAL_SIGNS_NEGATIVE: 'Special maneuvers for acute peritoneal, appendiceal, or gallbladder pathology are completely negative.',

                // Cholecystitis / Gallbladder Signs
                POSITIVE_MURPHY_SIGN: 'Murphy\'s sign is positive, with distinct inspiratory arrest observed during deep palpation of the right upper quadrant, indicating acute cholecystitis.',

                // Appendicitis Specific Signs
                POSITIVE_MCBURNEY_TENDERNESS: 'Significant focal tenderness is elicited upon palpation over McBurney\'s point, highly suspicious for acute appendicitis.',
                POSITIVE_ROVSING_SIGN: 'Rovsing\'s sign is positive, with palpation of the left lower quadrant eliciting distinct pain in the right lower quadrant.',
                POSITIVE_PSOAS_SIGN: 'Psoas sign is positive; hip extension against resistance elicits right lower quadrant abdominal pain.',
                POSITIVE_OBTURATOR_SIGN: 'Obturator sign is positive; internal rotation of the flexed right hip elicits hypogastric pain.',

                // Peritonitis / Peritoneal Irritation
                REBOUND_TENDERNESS_PRESENT: 'Rebound tenderness is present, indicating localized or generalized peritoneal inflammation.',
                RIGIDITY_INVOLUNTARY: 'Involuntary guarding and abdominal wall rigidity are noted during examination, indicative of peritoneal irritation.',
                BOARD_LIKE_ABDOMEN: 'The abdomen is board-like and rigid throughout, consistent with acute surgical abdomen / generalized peritonitis.'
            }
        },
        herniaSurgicalScars: {
            list: [
                { id: 1, code: 'NO_HERNIAS_APPRECIATED', name: 'No Hernias Appreciated' },
                { id: 2, code: 'ABDOMEN_SYMMETRIC_WITHOUT_MASSES', name: 'Abdomen Symmetric Without Masses' },
                { id: 3, code: 'SURGICAL_SCARS_ABSENT', name: 'Surgical Scars Absent' }
            ],
            statements: {
                NO_HERNIAS_APPRECIATED: 'No abdominal, inguinal, or ventral hernias are appreciated on inspection or palpation.',
                ABDOMEN_SYMMETRIC_WITHOUT_MASSES: 'The abdomen is symmetric in contour with no visible or palpable masses.',
                SURGICAL_SCARS_ABSENT: 'No surgical scars or evidence of prior abdominal operative intervention are observed.'
            }
        },
        anorectalRectalExamination: {
            list: [
                { id: 1, code: 'DEFERRED', name: 'Deferred' },
                { id: 2, code: 'NORMAL_SPHINCTER_TONE', name: 'Normal Sphincter Tone' },
                { id: 3, code: 'HEME_NEGATIVE', name: 'Heme Negative' }
            ],
            statements: {
                DEFERRED: 'Rectal examination was deferred at the time of assessment.',
                NORMAL_SPHINCTER_TONE: 'Rectal examination demonstrates normal anal sphincter tone.',
                HEME_NEGATIVE: 'Fecal occult blood testing is negative with no evidence of occult gastrointestinal bleeding.'
            }
        }
    },
    genitourinary: {
        list: [
            // Urinary Dynamics
            { id: 1, code: 'URINARY_NORMAL', name: 'No Dysuria / Frequency', type: 'urinary' },
            { id: 2, code: 'BLADDER_NON_DISTENDED', name: 'Bladder Non-distended', type: 'urinary' },
            { id: 3, code: 'DYSURIA_PRESENT', name: 'Dysuria Present', type: 'urinary' },
            { id: 4, code: 'HEMATURIA_MACROSCOPIC', name: 'Gross Hematuria Noted', type: 'urinary' },
            { id: 5, code: 'URINARY_INCONTINENCE', name: 'Incontinence Issues', type: 'urinary' },

            // CVA / Kidney
            { id: 6, code: 'CVA_NO_TENDERNESS_BILATERAL', name: 'No CVA Tenderness Bilaterally', type: 'cva' },
            { id: 7, code: 'CVA_TENDERNESS_RIGHT', name: 'Right CVA Tenderness', type: 'cva' },
            { id: 8, code: 'CVA_TENDERNESS_LEFT', name: 'Left CVA Tenderness', type: 'cva' },

            // External / Reproductive
            { id: 9, code: 'GU_EXAM_DEFERRED', name: 'Exam Chaperoned / Deferred', type: 'reproductive' },
            { id: 10, code: 'EXTERNAL_GENITALIA_NORMAL', name: 'External Anatomy Normal', type: 'reproductive' },
            { id: 11, code: 'LESIONS_SKIN_ABSENT', name: 'No Active Lesions/Rashes', type: 'reproductive' },
            { id: 12, code: 'DISCHARGE_PRESENT', name: 'Abnormal Discharge Noted', type: 'reproductive' }
        ],
        statements: {
            URINARY_NORMAL: 'Patient denies dysuria, hematuria, frequency, or abnormal urinary urgency.',
            BLADDER_NON_DISTENDED: 'Suprapubic palpation reveals a soft, non-distended bladder without tenderness.',
            DYSURIA_PRESENT: 'Patient reports significant burning pain and dysuria during urination.',
            HEMATURIA_MACROSCOPIC: 'Grossly visible macro-hematuria was reported or visualized.',
            URINARY_INCONTINENCE: 'Urinary stress or urge incontinence reported upon clinical interview.',
            CVA_NO_TENDERNESS_BILATERAL: 'Costovertebral angle percussion produces no flank or kidney area tenderness bilaterally.',
            CVA_TENDERNESS_RIGHT: 'Marked unilateral costovertebral angle (CVA) tenderness elicited on the right flank.',
            CVA_TENDERNESS_LEFT: 'Marked unilateral costovertebral angle (CVA) tenderness elicited on the left flank.',
            GU_EXAM_DEFERRED: 'Anatomical genitourinary examination deferred at this visit due to patient preference/lack of acute indications.',
            EXTERNAL_GENITALIA_NORMAL: 'Inspection of external genitalia reveals expected anatomical variants without swelling.',
            LESIONS_SKIN_ABSENT: 'Skin integrity intact over perineal and groin lines; no ulcers, vesicles, or hernias observed.',
            DISCHARGE_PRESENT: 'Active mucopurulent or uncharacteristic discharge noted on clinical inspection.'
        }
    },
    musculoskeletalExamination: {
        list: [
            // Spine & Axial Skeleton
            { id: 1, code: 'SPINE_NORMAL_ROM', name: 'Normal Spine ROM / Alignment', type: 'spine' },
            { id: 2, code: 'PARASPINOUS_SPASM', name: 'Paraspinous Muscle Spasm', type: 'spine' },
            { id: 3, code: 'CEREVICAL_SPINE_TENDERNESS', name: 'Cervical Spine Tenderness', type: 'spine' },
            { id: 4, code: 'LUMBAR_TENDERNESS', name: 'Lumbar Spine Tenderness', type: 'spine' },
            { id: 5, code: 'SCOLIOSIS_DEFORMITY', name: 'Scoliotic Curvature Noted', type: 'spine' },

            // Upper Extremities
            { id: 6, code: 'UPPER_JOINTS_NORMAL', name: 'Upper Joints Normal / Symmetric', type: 'upper' },
            { id: 7, code: 'CREPITUS_SHOULDER_RIGHT', name: 'Right Shoulder Crepitus', type: 'upper' },
            { id: 8, code: 'WRIST_SWELLING_BILATERAL', name: 'Bilateral Wrist Swelling', type: 'upper' },
            { id: 9, code: 'HEBERDEN_NODES_PRESENT', name: 'Heberden\'s Nodes Present', type: 'upper' },
            { id: 10, code: 'ROTATOR_CUFF_TENDERNESS', name: 'Rotator Cuff Tenderness', type: 'upper' },

            // Lower Extremities
            { id: 11, code: 'LOWER_JOINTS_NORMAL', name: 'Lower Joints Normal / Stable', type: 'lower' },
            { id: 12, code: 'KNEE_EFFUSION_RIGHT', name: 'Right Knee Joint Effusion', type: 'lower' },
            { id: 13, code: 'JOINT_LINE_TENDERNESS_LEFT', name: 'Left Knee Joint Line Tenderness', type: 'lower' },
            { id: 14, code: 'ANKLE_EDEMA_BILATERAL', name: 'Bilateral Ankle Swelling', type: 'lower' },
            { id: 15, code: 'LACHMAN_TEST_POSITIVE', name: 'Positive Lachman Sign (Laxity)', type: 'lower' }
        ],
        statements: {
            SPINE_NORMAL_ROM: 'Spine exhibits normal physiological curvature, baseline alignment is midline, and active range of motion is completely pain-free.',
            PARASPINOUS_SPASM: 'Noticeable paraspinous muscle spasm and guarding present along the spinal columns.',
            CEREVICAL_SPINE_TENDERNESS: 'Focal tenderness elicited upon deep palpation of the cervical spine spinous processes.',
            LUMBAR_TENDERNESS: 'Focal midline tenderness localized to the lumbar spinal segment.',
            SCOLIOSIS_DEFORMITY: 'Lateral structural curvature of the spine is appreciated upon forward bend evaluation, indicating mild scoliosis.',
            UPPER_JOINTS_NORMAL: 'All upper extremity major joint segments (shoulders, elbows, wrists, hands) exhibit normal configuration, full range of motion, and zero warmth.',
            CREPITUS_SHOULDER_RIGHT: 'Palpable grinding and joint crepitus appreciated throughout passive range of motion of the right shoulder joint.',
            WRIST_SWELLING_BILATERAL: 'Symmetric joint capsule swelling and boggy edema observed across both wrist joints.',
            HEBERDEN_NODES_PRESENT: 'Hard, bony enlargements (Heberden\'s nodes) appreciated over the distal interphalangeal (DIP) finger joints.',
            ROTATOR_CUFF_TENDERNESS: 'Focal tenderness localized over the subacromial space and rotator cuff tendon insertions.',
            LOWER_JOINTS_NORMAL: 'Major lower extremity joints display full functional mobility, structural configuration symmetry, and operational joint line integrity.',
            KNEE_EFFUSION_RIGHT: 'A fluid wave and intra-articular structural swelling are noted over the right knee capsule, indicating active effusion.',
            JOINT_LINE_TENDERNESS_LEFT: 'Focal pain and tenderness localized cleanly over the medial joint line of the left knee.',
            ANKLE_EDEMA_BILATERAL: 'Bilateral periarticular ankle pitting edema and structural puffiness observed.',
            LACHMAN_TEST_POSITIVE: 'Positive Lachman test on examination, indicating structural joint laxity and suspicious for anterior cruciate ligament injury.'
        }
    },
    skinExamination: {
        list: [
            // Skin Integrity & Lesions
            { id: 1, code: 'SKIN_INTACT_NORMAL', name: 'Skin Warm, Dry & Intact', type: 'integrity' },
            { id: 2, code: 'ERYTHEMA_PRESENT', name: 'Localized Erythema', type: 'integrity' },
            { id: 3, code: 'MACULOPAPULAR_RASH', name: 'Maculopapular Rash', type: 'integrity' },
            { id: 4, code: 'JAUNDICE_SCLERAL_ICTERUS', name: 'Generalized Jaundice', type: 'integrity' },
            { id: 5, code: 'PRESSURE_ULCER_STAGED', name: 'Pressure Ulcer Present', type: 'integrity' },

            // Vascular, Fluid & Turgor
            { id: 6, code: 'NORMAL_TURGOR_NO_EDEMA', name: 'Normal Turgor, No Edema', type: 'vascular' },
            { id: 7, code: 'POOR_TURGOR_TENTING', name: 'Poor Turgor (Tenting)', type: 'vascular' },
            { id: 8, code: 'PITTING_EDEMA_BILATERAL', name: 'Bilateral Pitting Edema', type: 'vascular' },
            { id: 9, code: 'DIAPHORESIS_PROMINENT', name: 'Profuse Diaphoresis', type: 'vascular' },
            { id: 10, code: 'PETECHIAE_PURPURA', name: 'Petechiae / Ecchymosis Noted', type: 'vascular' },

            // Hair & Nails
            { id: 11, code: 'HAIR_NAILS_NORMAL', name: 'Hair & Nails Grossly Normal', type: 'appendage' },
            { id: 12, code: 'NAIL_CLUBBING_PRESENT', name: 'Nail Clubbing Visualized', type: 'appendage' },
            { id: 13, code: 'ALOPECIA_LOCALIZED', name: 'Focal Alopecia / Hair Loss', type: 'appendage' },
            { id: 14, code: 'TROPHIC_SKIN_CHANGES', name: 'Brittle Nails / Trophic Changes', type: 'appendage' }
        ],
        statements: {
            SKIN_INTACT_NORMAL: 'Skin is warm, dry, and clean with structural integrity completely intact; no atypical lesions or rashes identified.',
            ERYTHEMA_PRESENT: 'Localized erythema and mild cutaneous surface warmth noted over the affected dermal area.',
            MACULOPAPULAR_RASH: 'A prominent erythematous maculopapular rash is distributed across the examination field.',
            JAUNDICE_SCLERAL_ICTERUS: 'Generalized cutaneous icterus accompanied by distinct scleral yellowing observed throughout.',
            PRESSURE_ULCER_STAGED: 'Localized pressure ulcer/dermal breakdown noted on clinical inspection over dependent bony prominences.',
            NORMAL_TURGOR_NO_EDEMA: 'Dermal turgor is completely normal with rapid elastic snap-back; zero peripheral fluid edema appreciated.',
            POOR_TURGOR_TENTING: 'Skin turgor is significantly reduced, demonstrating visible skin tenting consistent with clinical dehydration levels.',
            PITTING_EDEMA_BILATERAL: 'Bilateral dependent pitting edema is explicitly demonstrated upon deep digital palpation.',
            DIAPHORESIS_PROMINENT: 'Skin is noted to be markedly cool, clammy, and coated with profuse active diaphoresis.',
            PETECHIAE_PURPURA: 'Focal areas of non-blanching micro-petechiae and localized soft-tissue ecchymosis are visible.',
            HAIR_NAILS_NORMAL: 'Hair distribution exhibits normal texture and baseline coverage; nail beds are pink with smooth plates and zero deformity.',
            NAIL_CLUBBING_PRESENT: 'Significant structural nail clubbing observed with an expanded profile angle across the digital profiles.',
            ALOPECIA_LOCALIZED: 'Focal, circumscribed patches of hair loss/alopecia are observed over the assessment sectors.',
            TROPHIC_SKIN_CHANGES: 'Brittle nail presentation paired with dry, thin, shiny trophic changes characteristic of peripheral vascular insufficiencies.'
        }
    },
    psychiatric: {
        list: [
            // Behavior, Appearance & Affect
            { id: 1, code: 'BEHAVIOR_COOPERATIVE_NORMAL', name: 'Cooperative / Calm Affect', type: 'behavior' },
            { id: 2, code: 'PSYCHOMOTOR_AGITATION', name: 'Psychomotor Agitation', type: 'behavior' },
            { id: 3, code: 'AFFECT_FLAT_BLUNTED', name: 'Flat / Blunted Affect', type: 'behavior' },
            { id: 4, code: 'POOR_EYE_CONTACT', name: 'Poor Eye Contact', type: 'behavior' },
            { id: 5, code: 'SPEECH_PRESSURE_RAPID', name: 'Pressured / Rapid Speech', type: 'behavior' },

            // Thought Process & Perception
            { id: 6, code: 'THOUGHT_LINEAR_LOGICAL', name: 'Linear / Logical Thoughts', type: 'thought' },
            { id: 7, code: 'THOUGHT_TANGENTIAL', name: 'Tangential / Disorganized', type: 'thought' },
            { id: 8, code: 'HALLUCINATIONS_PRESENT', name: 'Hallucinations Reported', type: 'thought' },
            { id: 9, code: 'DELUSIONAL_CONTENT', name: 'Delusional Ideas Noted', type: 'thought' },
            { id: 10, code: 'SI_HI_DENIED', name: 'SI / HI Explicitly Denied', type: 'thought' },

            // Cognition, Orientation & Judgment
            { id: 11, code: 'ORIENTED_AXO3', name: 'Alert & Oriented (A&O x3)', type: 'cognition' },
            { id: 12, code: 'DISORIENTED_PARTIAL', name: 'Partially Disoriented', type: 'cognition' },
            { id: 13, code: 'INSIGHT_JUDGMENT_INTACT', name: 'Insight & Judgment Intact', type: 'cognition' },
            { id: 14, code: 'IMPAIRED_SHORT_MEMORY', name: 'Impaired Short-Term Memory', type: 'cognition' }
        ],
        statements: {
            BEHAVIOR_COOPERATIVE_NORMAL: 'Patient is pleasant, fully cooperative, and appropriately dressed; the baseline affect is stable and congruent with conversation.',
            PSYCHOMOTOR_AGITATION: 'Marked psychomotor agitation observed, including hand-wringing and persistent physical restlessness.',
            AFFECT_FLAT_BLUNTED: 'The emotional affect is restricted, flat, and noticeably blunted throughout the evaluation.',
            POOR_EYE_CONTACT: 'Patient consistently avoids eye contact, demonstrating downcast or highly avoidant visual behaviors.',
            SPEECH_PRESSURE_RAPID: 'Speech is noted to be highly pressured, loud, rapid, and difficult to interrupt.',
            THROUGHT_LINEAR_LOGICAL: 'Thought processes are clearly linear, logical, tightly organized, and goal-directed.',
            THOUGHT_TANGENTIAL: 'Thought processes are highly loose and tangential, wandering away from core prompts without finishing thoughts.',
            HALLUCINATIONS_PRESENT: 'Active perceptual disturbances are endorsed, including running auditory hallucinations.',
            DELUSIONAL_CONTENT: 'Fixed, non-bizarre delusional ideation or persecutory content is revealed during interview.',
            SI_HI_DENIED: 'Patient explicitly denies active or passive suicidal intentions, plans, or homicidal ideations.',
            ORIENTED_AXO3: 'Patient is alert and completely oriented to person, place, and temporal time frame.',
            DISORIENTED_PARTIAL: 'Fluctuating orientation defects observed; unable to reliably state current location or calendar year.',
            INSIGHT_JUDGMENT_INTACT: 'Clinical insight regarding current health states and impulse judgment metrics are functionally intact.',
            IMPAIRED_SHORT_MEMORY: 'Demonstrative short-term memory registration deficits identified during basic word-recall screens.'
        }
    },
    Consciousness: [
        { id: 1, label: "Alert", value: "ALERT" },
        { id: 2, label: "Drowsy", value: "DROWSY" },
        { id: 3, label: "Lethargic", value: "LETHARGIC" },
        { id: 4, label: "Stuporous", value: "STUPOROUS" },
        { id: 5, label: "Semiconscious", value: "SEMICONSCIOUS" },
        { id: 6, label: "Unconscious", value: "UNCONSCIOUS" },
        { id: 7, label: "Comatose", value: "COMATOSE" }
    ],
    Orientation: [
        { id: 1, label: "Fully Oriented (Time, Place, Person)", value: "FULLY_ORIENTED" },
        { id: 2, label: "Oriented to Person", value: "ORIENTED_PERSON" },
        { id: 3, label: "Oriented to Place", value: "ORIENTED_PLACE" },
        { id: 4, label: "Oriented to Time", value: "ORIENTED_TIME" },
        { id: 5, label: "Disoriented", value: "DISORIENTED" },
        { id: 6, label: "Not Assessable", value: "NOT_ASSESSABLE" }
    ],
    NutritionalStatusOptions: [
        { id: 1, label: "Normal", value: "NORMAL" },
        { id: 2, label: "Well Nourished", value: "WELL_NOURISHED" },
        { id: 3, label: "Underweight", value: "UNDERWEIGHT" },
        { id: 4, label: "Overweight", value: "OVERWEIGHT" },
        { id: 5, label: "Obese", value: "OBESE" },
        { id: 6, label: "Malnourished", value: "MALNOURISHED" },
        { id: 7, label: "Cachectic", value: "CACHECTIC" }
    ],
    HydrationStatusOptions: [
        { id: 1, label: "Normal", value: "NORMAL" },
        { id: 2, label: "Well Hydrated", value: "WELL_HYDRATED" },
        { id: 3, label: "Mild Dehydration", value: "MILD_DEHYDRATION" },
        { id: 4, label: "Moderate Dehydration", value: "MODERATE_DEHYDRATION" },
        { id: 5, label: "Severe Dehydration", value: "SEVERE_DEHYDRATION" },
        { id: 6, label: "Overhydrated", value: "OVERHYDRATED" }
    ],
    MobilityOptions: [
        { id: 1, label: "Independent", value: "INDEPENDENT" },
        { id: 2, label: "Assisted", value: "ASSISTED" },
        { id: 3, label: "Wheelchair Bound", value: "WHEELCHAIR_BOUND" },
        { id: 4, label: "Bedridden", value: "BEDRIDDEN" },
        { id: 5, label: "Stretcher", value: "STRETCHER" },
        { id: 6, label: "Unable to Walk", value: "UNABLE_TO_WALK" }
    ],
    GaitOptions: [
        { label: "Normal", value: "normal" },
        { label: "Antalgic", value: "antalgic" },
        { label: "Ataxic", value: "ataxic" },
        { label: "Shuffling", value: "shuffling" },
        { label: "Limping", value: "limping" },
        { label: "Unsteady", value: "unsteady" },
        { label: "Assisted", value: "assisted" },
        { label: "Unable to Assess", value: "unable_to_assess" }
    ],
    PainCharacterOptions: [
        { id: 1, label: "Sharp", value: "SHARP" },
        { id: 2, label: "Dull", value: "DULL" },
        { id: 3, label: "Throbbing", value: "THROBBING" },
        { id: 4, label: "Burning", value: "BURNING" },
        { id: 5, label: "Aching", value: "ACHING" },
        { id: 6, label: "Cramping", value: "CRAMPING" },
        { id: 7, label: "Shooting", value: "SHOOTING" }
    ],
    PainScoreOptions: [
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
    ],
    DistressLevelOptions: [
        { id: 1, label: "None", value: "NONE" },
        { id: 2, label: "Mild", value: "MILD" },
        { id: 3, label: "Moderate", value: "MODERATE" },
        { id: 4, label: "Severe", value: "SEVERE" }
    ],
    HygieneGroomingOptions: [
        { id: 1, label: "Good", value: "GOOD" },
        { id: 2, label: "Fair", value: "FAIR" },
        { id: 3, label: "Poor", value: "POOR" },
        { id: 4, label: "Unkempt", value: "UNKEMPT" }
    ],
    SpeechOptions: [
        { id: 1, label: "Normal", value: "NORMAL" },
        { id: 2, label: "Slurred", value: "SLURRED" },
        { id: 3, label: "Slow", value: "SLOW" },
        { id: 4, label: "Rapid", value: "RAPID" },
        { id: 5, label: "Mute", value: "MUTE" }
    ],
    MoodBehaviorOptions: [
        { id: 1, label: "Calm", value: "CALM" },
        { id: 2, label: "Cooperative", value: "COOPERATIVE" },
        { id: 3, label: "Anxious", value: "ANXIOUS" },
        { id: 4, label: "Agitated", value: "AGITATED" },
        { id: 5, label: "Aggressive", value: "AGGRESSIVE" },
        { id: 6, label: "Withdrawn", value: "WITHDRAWN" },
        { id: 7, label: "Depressed", value: "DEPRESSED" }
    ],
    SkinColorPerfusionOptions: [
        { id: 1, label: "Normal", value: "NORMAL" },
        { id: 2, label: "Pale", value: "PALE" },
        { id: 3, label: "Cyanosed", value: "CYANOSED" },
        { id: 4, label: "Flushed", value: "FLUSHED" },
        { id: 5, label: "Mottled", value: "MOTTLED" },
        { id: 6, label: "Jaundiced", value: "JAUNDICED" }
    ],
    HeadOptions: [
        { id: 1, label: 'Normal', value: 'Normal' },
        { id: 2, label: 'Injury', value: 'Injury' },
        { id: 3, label: 'Swelling', value: 'Swelling' }
    ],
    EyesOptions: [
        { id: 1, label: 'Normal', value: 'Normal' },
        { id: 2, label: 'Redness', value: 'Redness' },
        { id: 3, label: 'Jaundice', value: 'Jaundice' },
        { id: 4, label: 'Vision Problems', value: 'VisionProblems' }
    ],
    EarsOptions: [
        { id: 1, label: 'Normal', value: 'Normal' },
        { id: 2, label: 'Infection', value: 'Infection' },
        { id: 3, label: 'Hearing Loss', value: 'Hearing Loss' },
    ],
    NoseOptions: [
        { id: 1, label: 'Normal', value: 'Normal' },
        { id: 2, label: 'Congestion', value: 'Congestion' },
        { id: 3, label: 'Discharge', value: 'Discharge' },
    ],
    ThroatOptions: [
        { id: 1, label: 'Normal', value: 'Normal' },
        { id: 2, label: 'Congestion', value: 'Congestion' },
        { id: 3, label: 'Tonsillar Enlargement', value: 'Tonsillar Enlargement' },
        { id: 4, label: 'Redness', value: 'Redness' },
    ],
    HeartSoundOption: [
        { id: 1, label: 'SOUNDS_S1_S2_NORMAL', value: 'Normal S1 / S2', type: 'sounds' },
        { id: 2, label: 'SOUNDS_MUFFLED', value: 'Distant / Muffled Sounds', type: 'sounds' },
        { id: 3, label: 'SOUNDS_GALLOP_S3', value: 'S3 Gallop Present', type: 'sounds' },
        { id: 4, label: 'SOUNDS_GALLOP_S4', value: 'S4 Gallop Present', type: 'sounds' },
    ],
    HeartRhythm: [
        { id: 1, label: 'RHYTHM_REGULAR', value: 'Regular Rhythm', type: 'rhythm' },
        { id: 2, label: 'RHYTHM_IRREGULAR', value: 'Irregularly Irregular', type: 'rhythm' },
        { id: 3, label: 'RHYTHM_BRADYCARDIA', value: 'Sinus Bradycardia', type: 'rhythm' },
        { id: 4, label: 'RHYTHM_TACHYCARDIA', value: 'Sinus Tachycardia', type: 'rhythm' },
    ],
    HeartMurmurs: [
        { id: 1, label: 'MURMURS_NONE', value: 'No Murmurs / Rubs / Gallops', type: 'murmurs' },
        { id: 2, label: 'MURMUR_SYSTOLIC', value: 'Systolic Murmur Noted', type: 'murmurs' },
        { id: 3, label: 'MURMUR_DIASTOLIC', value: 'Diastolic Murmur Noted', type: 'murmurs' },
        { id: 4, label: 'PERICARDIAL_RUB', value: 'Pericardial Friction Rub', type: 'murmurs' }
    ],
    CardiovascularSide: [
        { id: 1, label: 'BILATERAL', value: 'Bilateral', type: 'murmurs' },
        { id: 2, label: 'LEFT', value: 'Left', type: 'murmurs' },
        { id: 3, label: 'RIGHT', value: 'Right', type: 'murmurs' },
    ],
    PulseQuality: [
        { id: 1, label: 'Bounding Pulses (3+)', value: 'Bounding Pulses (3+)', type: 'murmurs' },
        { id: 2, label: 'Diminished Pulses (1+)', value: 'Diminished Pulses (1+)', type: 'murmurs' },
        { id: 3, label: 'Absent Pulses (0)', value: 'Absent Pulses (0)', type: 'murmurs' },
        { id: 4, label: 'Asymmetric Pulses', value: 'Asymmetric Pulses', type: 'murmurs' },
        { id: 5, label: 'Weak DP/PT Pulses', value: 'Weak DP/PT Pulses', type: 'murmurs' },
        { id: 6, label: 'Weak Radial Pulses', value: 'Weak Radial Pulses', type: 'murmurs' },
    ],
    PerfusionFindings: [
        { id: 1, name: 'Symmetric 2+', category: 'Normal', selected: false },
        { id: 2, name: 'Cap Refill < 2s', category: 'Normal', selected: false },
        { id: 3, name: 'Warm & Dry Extremities', category: 'Normal', selected: false },
        { id: 4, name: 'Delayed Cap Refill (>2s)', category: 'Abnormal', selected: false },
        { id: 5, name: 'Cool / Cold Extremities', category: 'Abnormal', selected: false },
        { id: 6, name: 'Mottled Skin', category: 'Abnormal', selected: false },
        { id: 7, name: 'Digial Clubbing', category: 'Other', selected: false },
        { id: 8, name: 'Peripheral Cyanosis', category: 'Other', selected: false }
    ],
    EdemaGrades: [
        { id: 1, name: 'No Edema' },
        { id: 2, name: '1+ Malleolar' },
        { id: 3, name: '2+ Pitting' },
        { id: 4, name: '3+ Pitting' },
        { id: 5, name: '4+ Pitting' }
    ],
    EdemaLocations: [
        { id: 1, name: 'Bilateral Lower Extremities' },
        { id: 2, name: 'Left Lower Extremity Only' },
        { id: 3, name: 'Right Lower Extremity Only' },
        { id: 4, name: 'Sacral Edema' },
        { id: 5, name: 'Pedal Edema' },
        { id: 6, name: 'Pretibial Edema' }
    ],
    EdemaRiskFindings: [
        { id: 1, name: 'Stasis Dermatitis' },
        { id: 2, name: 'Calf Tenderness (DVT Risk)' },
        { id: 3, name: 'Palpable Venous Cords' }
    ],
    GradeOptions: [
        { value: 0, display: '0' },
        { value: 1, display: '1+' },
        { value: 2, display: '2+' },
        { value: 3, display: '3+' },
    ],
    GradeOptions2: [
        { value: 0, display: '0' },
        { value: 1, display: '1+' },
        { value: 2, display: '2+' },
        { value: 3, display: '3+' },
        { value: 4, display: '4+' },
    ],
    Symmetry: [
        { id: 1, name: 'Equal', value: 'Equal' },
        { id: 2, name: 'Reduce Left', value: 'Reduce Left' },
        { id: 3, name: 'Reduce Right', value: 'Reduce Right' }
    ],
    EffertsNormal: [
        { id: 1, name: 'Unlabored Symmetric', value: 'Unlabored Symmetric' }
    ],
    IncreaseWorkOfBreathing: [
        { id: 1, name: 'Accessory Muscle Use', value: 'Accessory Muscle Use' },
        { id: 2, name: 'Intercostal Retractions', value: 'Intercostal Retractions' },
        { id: 3, name: 'Tachypneic', value: 'Tachypneic' },
        { id: 4, name: 'Bradypneic', value: 'Bradypneic' }
    ],
    ChestWallAbnormality: [
        { id: 1, name: 'Asymmetric Chest Expansion', value: 'Asymmetric Chest Expansion' },
        { id: 2, name: 'Paradoxical Breathing', value: 'Paradoxical Breathing' },
    ],
    AdventitiousSounds: [
        { id: 1, name: 'Bilateral Wheezing', value: 'Bilateral Wheezing' },
        { id: 2, name: 'Expiratory Wheezing', value: 'Expiratory Wheezing' },
        { id: 3, name: 'Fine Crackles / Rales', value: 'Fine Crackles / Rales' },
        { id: 4, name: 'Coarse Crackles', value: 'Coarse Crackles' },
        { id: 5, name: 'Rhonchi', value: 'Rhonchi' }
    ],
    AirwayDiminished: [
        { id: 1, name: 'Diminished Sounds at Bases', value: 'Diminished Sounds at Bases' },
        { id: 2, name: 'Inspiratory Stridor', value: 'Inspiratory Stridor' },
    ],
    LungNormal: [
        { id: 1, name: 'CTAB', value: 'CTAB' },
        { id: 2, name: 'Clear / No Wheezing', value: 'Clear / No Wheezing' }
    ],
    PupilsEyeMovements: [
        { id: 1, name: 'PERRLA', value: 'PERRLA' },
        { id: 2, name: 'EOMI', value: 'EOMI' },
        { id: 3, name: 'Visual Fields Intact', value: 'Visual Fields Intact' },
        { id: 4, name: 'Sluggish Pupillary Response', value: 'Sluggish Pupillary Response' },
        { id: 5, name: 'Anisocoria Present', value: 'Anisocoria Present' },
        { id: 6, name: 'Nystagmus Present', value: 'Nystagmus Present' },
        { id: 7, name: 'Ptosis Noted', value: 'Ptosis Noted' }
    ],
    FacialHearing: [
        { id: 1, name: 'Facial Sensation Intact (CN V)', value: 'Facial Sensation Intact (CN V)' },
        { id: 2, name: 'Hearing Intact Bilaterally', value: 'Hearing Intact Bilaterally' },
        { id: 3, name: 'Grossly Decreased Hearing', value: 'Grossly Decreased Hearing' }
    ],
    PalateSpeechNeck: [
        { id: 1, name: 'Palate Elevates Symmetrically', value: 'Palate Elevates Symmetrically' },
        { id: 2, name: 'Gag Reflex Intact', value: 'Gag Reflex Intact' },
        { id: 3, name: 'Shoulder Shrug Symmetric (CN XI)', value: 'Shoulder Shrug Symmetric (CN XI)' },
        { id: 4, name: 'Neck Rotation Strength Equal', value: 'Neck Rotation Strength Equal' }
    ],
    LevelOfConsciousness: [
        { id: 1, name: 'Alert', value: 'Alert' },
        { id: 2, name: 'Lethargic', value: 'Lethargic' },
        { id: 3, name: 'Somnolent', value: 'Somnolent' },
        { id: 4, name: 'Obtunded', value: 'Obtunded' },
        { id: 5, name: 'Stuporous', value: 'Stuporous' },
        { id: 6, name: 'Comatose', value: 'Comatose' }
    ],
    MoodBehavior: [
        { id: 1, name: 'Cooperative', value: 'Cooperative' },
        { id: 2, name: 'Calm & Pleasant', value: 'Calm & Pleasant' },
        { id: 3, name: 'Anxious', value: 'Anxious' },
        { id: 4, name: 'Agitated', value: 'Agitated' },
        { id: 5, name: 'Flat Affect', value: 'Flat Affect' },
        { id: 6, name: 'Restless', value: 'Restless' }
    ],
    Speech: [
        { id: 1, name: 'Clear & Coherent', value: 'Clear & Coherent' },
        { id: 2, name: 'Slurred Speech', value: 'Slurred Speech' },
        { id: 3, name: 'Dysarthric', value: 'Dysarthric' },
        { id: 4, name: 'Aphasic (Expressive)', value: 'Aphasic (Expressive)' },
        { id: 5, name: 'Aphasic (Receptive)', value: 'Aphasic (Receptive)' }
    ],
    ToneAndDriftList: [
        { id: 1, label: 'Normal Muscle Tone', value: 'Normal Muscle Tone' },
        { id: 2, label: 'No Pronator Drift', value: 'No Pronator Drift' },
        { id: 3, label: 'Pronator Drift Present', value: 'Pronator Drift Present' },
        { id: 4, label: 'Spasticity Present', value: 'Spasticity Present' },
        { id: 5, label: 'Cogwheel Rigidity', value: 'Cogwheel Rigidity' },
        { id: 6, label: 'Flaccid Tone', value: 'Flaccid Tone' }
    ],
    GlobalPatternsList: [
        { id: 1, label: 'Hemiparesis', value: 'Hemiparesis' },
        { id: 2, label: 'Paraparesis', value: 'Paraparesis' },
        { id: 3, label: 'Generalized Weakness', value: 'Generalized Weakness' }
    ],
    DistributionPatternList: [
        { id: 1, label: 'Paresthesia', value: 'Paresthesia' },
        { id: 2, label: 'Stocking-Glove Distribution', value: 'Stocking-Glove Distribution' },
        { id: 3, label: 'Dermatomal Deficit', value: 'Dermatomal Deficit' },
        { id: 4, label: 'Hyperesthesia Present', value: 'Hyperesthesia Present' }
    ],
    GaitPatternList: [
        { id: 1, label: 'Steady', value: 'Steady' },
        { id: 2, label: 'Unsteady', value: 'Unsteady' },
        { id: 3, label: 'Antalgic', value: 'Antalgic' },
        { id: 4, label: 'Ataxic', value: 'Ataxic' },
        { id: 5, label: 'Shuffling', value: 'Shuffling' },
        { id: 6, label: 'Uses Assistive Device', value: 'Uses Assistive Device' }
    ],
    RapidMovementTremorList: [
        { id: 1, label: 'Rapid Alternating Movements Normal', value: 'Rapid Alternating Movements Normal' },
        { id: 2, label: 'Dysdiadochokinesia Present', value: 'Dysdiadochokinesia Present' },
        { id: 3, label: 'Intention Tremor Present', value: 'Intention Tremor Present' },
        { id: 4, label: 'Resting Tremor Present', value: 'Resting Tremor Present' }
    ],
    AscitesSigns: [
        { id: 1, label: "Shifting Dullness Present", value: "Shifting Dullness Present" },
        { id: 2, label: "Positive Fluid Wave", value: "Positive Fluid Wave" },
        { id: 3, label: "Generalized Dullness", value: "Generalized Dullness" },
        { id: 4, label: "No Shifting Dullness", value: "No Shifting Dullness" },
        { id: 5, label: "Negative Fluid Wave", value: "Negative Fluid Wave" }
    ],
    OtherFindings: [
        { id: 1, label: "Hypertympanic (Gaseous Distension)", value: "Hypertympanic (Gaseous Distension)" },
        { id: 2, label: "Suprapubic Dullness (Distended Bladder)", value: "Suprapubic Dullness (Distended Bladder)" },
        { id: 3, label: "Normal Bladder Percussion", value: "Normal Bladder Percussion" }
    ],
    ScarCharacter: [
        { id: 1, label: "Well-Healed", value: "Well-Healed" },
        { id: 2, label: "Hypertrophic Scar", value: "Hypertrophic Scar" },
        { id: 3, label: "Keloid Formation", value: "Keloid Formation" },
        { id: 4, label: "Scar Tenderness", value: "Scar Tenderness" },
        { id: 5, label: "Hardware Palpable", value: "Hardware Palpable" },
    ],
    WoundConcerns: [
        { id: 1, label: "Signs of Infection", value: "Signs of Infection" },
        { id: 2, label: "Dehiscence", value: "Dehiscence" },
    ],
    sphincterTone: [
        { id: 1, label: "Absent", value: "Absent" },
        { id: 2, label: "Decreased", value: "Decreased" },
        { id: 3, label: "Normal", value: "Normal" },
        { id: 4, label: "Increased", value: "Increased" }
    ],
    grossBlood: [
        { id: 1, label: "Absent", value: "Absent" },
        { id: 2, label: "Present", value: "Present" }
    ],
    occultBloodTest: [
        { id: 1, label: "Negative", value: "Negative" },
        { id: 2, label: "Positive", value: "Positive" }
    ],
    ExternalInspection: [
        { id: 1, label: "No External Lesions", value: "No External Lesions" },
        { id: 2, label: "External Hemorrhoids", value: "External Hemorrhoids" },
        { id: 3, label: "Thrombosed Hemorrhoid", value: "Thrombosed Hemorrhoid" },
        { id: 4, label: "Anal Fissure", value: "Anal Fissure" },
        { id: 5, label: "Skin Tags", value: "Skin Tags" },
        { id: 6, label: "Rectal Prolapse", value: "Rectal Prolapse" },
        { id: 7, label: "Fistula Opening", value: "Fistula Opening" }
    ],
    DreFindings: [
        { id: 1, label: "No Masses Palpated", value: "No Masses Palpated" },
        { id: 2, label: "Non-Tender", value: "Non-Tender" },
        { id: 3, label: "Mass Palpated", value: "Mass Palpated" },
        { id: 4, label: "Tenderness on Exam", value: "Tenderness on Exam" },
        { id: 5, label: "Internal Hemorrhoids Palpated", value: "Internal Hemorrhoids Palpated" }
    ],
    ProstateFindings: [
        { id: 1, label: "Normal Size / Contour", value: "Normal Size / Contour" },
        { id: 2, label: "Enlarged", value: "Enlarged" },
        { id: 3, label: "Nodular / Irregular", value: "Nodular / Irregular" },
        { id: 4, label: "Tender (Suggestive of Prostatitis)", value: "Tender (Suggestive of Prostatitis)" }
    ],
    EyeAssessmentData: [
        { id: 1, value: "Pupils Equal", label: "Pupils Equal" },
        { id: 2, value: "Round", label: "Round" },
        { id: 3, value: "Reactive to Light", label: "Reactive to Light" },
        { id: 4, value: "Accommodation Intact", label: "Accommodation Intact" },
        { id: 5, value: "EOMI", label: "EOMI" }
    ],
    EyeFindings: [
        { id: 1, value: "Scleral Icterus (Jaundice)", label: "Scleral Icterus (Jaundice)" },
        { id: 2, value: "Vision Problems", label: "Vision Problems" },
        { id: 3, value: "Pale Conjunctivae", label: "Pale Conjunctivae" }
    ],
    EarsFindings: [
        { id: 1, value: "Tympanic Membrane Intact", label: "Tympanic Membrane Intact" },
        { id: 2, value: "Hearing Loss", label: "Hearing Loss" },
    ],
    NoseEpistaxis: [
        { id: 1, value: "None", label: "None" },
        { id: 2, value: "Minor/ Dired", label: "Minor/ Dired" },
        { id: 3, value: "Moderate", label: "Moderate" },
        { id: 4, value: "Active Bleading", label: "Active Bleading" },
    ],
    SymptomsChecklist: [
        { id: 1, value: 'Dysuria', label: 'Dysuria' },
        { id: 2, value: 'Urgency', label: 'Urgency' },
        { id: 3, value: 'Frequency', label: 'Frequency' },
        { id: 4, value: 'Nocturia', label: 'Nocturia' },
        { id: 5, value: 'Hematuria', label: 'Hematuria' },
        { id: 6, value: 'Hesitancy', label: 'Hesitancy' },
        { id: 7, value: 'Incontinence', label: 'Incontinence' }
    ],
    BladderPalpationFindings: [
        { id: 1, value: 'Non-distended, Non-tender', label: 'Non-distended, Non-tender' },
        { id: 2, value: 'Distended / Tender', label: 'Distended / Tender' }
    ],
    CVAFindings: [
        { id: 1, value: 'Non-tender', label: 'Non-tender' },
        { id: 2, value: 'Tender', label: 'Tender' }
    ],
    KidneyPalpationFindings: [
        { id: 1, value: 'Masses Unpalpable', label: 'Masses Unpalpable' },
        { id: 2, value: 'Bilateral Mass', label: 'Bilateral Mass' },
        { id: 3, value: 'Flank Pain', label: 'Flank Pain' }
    ],
    ProstateQuickSelectFindings: [
        { id: 1, value: 'Normal Size/Smooth', label: 'Normal Size/Smooth' },
        { id: 2, value: 'Enlarged (BPH)', label: 'Enlarged (BPH)' },
        { id: 3, value: 'Tender', label: 'Tender' },
        { id: 4, value: 'Hard / Nodular', label: 'Hard / Nodular' },
        { id: 5, value: 'Asymmetric', label: 'Asymmetric' }
    ],
    PalpationInspectionFindings: [
        { id: 1, value: 'Testicles Normal Bilaterally', label: 'Testicles Normal Bilaterally' },
        { id: 2, value: 'Epididymal Tenderness', label: 'Epididymal Tenderness' },
        { id: 3, value: 'Scrotal Mass', label: 'Scrotal Mass' },
        { id: 4, value: 'Hydrocele Suspected', label: 'Hydrocele Suspected' },
        { id: 5, value: 'Varicocele', label: 'Varicocele' }
    ],
    TransilluminationOptions: [
        { id: 1, value: 'Positive', label: 'Positive (+)' },
        { id: 2, value: 'Negative', label: 'Negative (-)' },
        { id: 3, value: 'NA', label: 'N/A' }
    ],
    EstimatedSizeOptions: [
        { id: 1, value: 'Normal', label: 'Normal (~20g)' },
        { id: 2, value: 'Grade 1', label: 'Grade 1 (20-40g)' },
        { id: 3, value: 'Grade 2', label: 'Grade 2 (40-60g)' },
        { id: 4, value: 'Grade 3', label: 'Grade 3 (>60g)' }
    ],
    ConsistencyOptions: [
        { id: 1, value: 'Smooth / Elastic', label: 'Smooth / Elastic' },
        { id: 2, value: 'Firm', label: 'Firm' },
        { id: 3, value: 'Indurated / Hard', label: 'Indurated / Hard' },
        { id: 4, value: 'Boggy', label: 'Boggy' }
    ],
    UrineColorOptions: [
        { id: 1, value: 'Straw / Light Yellow', label: 'Straw / Light Yellow' },
        { id: 2, value: 'Dark Yellow / Amber', label: 'Dark Yellow / Amber' },
        { id: 3, value: 'Red / Pink (Hematuria)', label: 'Red / Pink (Hematuria)' },
        { id: 4, value: 'Tea / Brown', label: 'Tea / Brown' },
        { id: 5, value: 'Cloudy / Turbid', label: 'Cloudy / Turbid' }
    ],
    UrineClarityOptions: [
        { id: 1, value: 'Clear', label: 'Clear' },
        { id: 2, value: 'Slightly Hazy', label: 'Slightly Hazy' },
        { id: 3, value: 'CLOCloudyUDY', label: 'Cloudy' },
        { id: 4, value: 'Turbid', label: 'Turbid' }
    ],
    LeukocytesOptions: [
        { id: 1, value: 'NEG', label: 'Neg' },
        { id: 2, value: 'TRACE', label: 'Trace' },
        { id: 3, value: 'SMALL', label: '+ (Small)' },
        { id: 4, value: 'MODERATE', label: '++ (Mod)' },
        { id: 5, value: 'LARGE', label: '+++ (Large)' }
    ],
    NitritesOptions: [
        { id: 1, value: 'NEGATIVE', label: 'Negative' },
        { id: 2, value: 'POSITIVE', label: 'Positive' }
    ],
    ProteinOptions: [
        { id: 1, value: 'NEG', label: 'Neg' },
        { id: 2, value: 'TRACE', label: 'Trace' },
        { id: 3, value: '30MG_DL', label: '30mg/dL (+)' },
        { id: 4, value: '100MG_DL', label: '100mg/dL (++)' },
        { id: 5, value: 'GT_300MG_DL', label: '>300mg/dL (+++)' }
    ],
    GlucoseOptions: [
        { id: 1, value: 'NORMAL', label: 'Normal' },
        { id: 2, value: '50MG_DL', label: '50mg/dL' },
        { id: 3, value: '100MG_DL', label: '100mg/dL' },
        { id: 4, value: 'GT_250MG_DL', label: '>250mg/dL' }
    ],
    RbcBloodOptions: [
        { id: 1, value: 'NEG', label: 'Neg' },
        { id: 2, value: 'TRACE', label: 'Trace' },
        { id: 3, value: 'PLUS_1', label: '+' },
        { id: 4, value: 'PLUS_2', label: '++' },
        { id: 5, value: 'PLUS_3', label: '+++' }
    ],
    KetonesOptions: [
        { id: 1, value: 'NEG', label: 'Neg' },
        { id: 2, value: 'TRACE', label: 'Trace' },
        { id: 3, value: 'SMALL', label: 'Small' },
        { id: 4, value: 'MODERATE', label: 'Moderate' }
    ],
    UrineCultureSensitivityOrderedOptions: [
        { id: 1, value: 'Yes', label: 'Yes' },
        { id: 2, value: 'No', label: 'No' },
    ],


    SpineRegionOptions: [
        { id: 1, value: 'Cervical Spine', label: 'Cervical Spine' },
        { id: 2, value: 'Thoracic Spine', label: 'Thoracic Spine' },
        { id: 3, value: 'Lumbar Spine', label: 'Lumbar Spine' },
        { id: 4, value: 'Sacroiliac (SI) Joints', label: 'Sacroiliac (SI) Joints' },
        { id: 5, value: 'Posture / Gait', label: 'Posture / Gait' }
    ],

    CervicalRomOptions: [
        { id: 1, value: 'Cervical ROM: Intact', label: 'Cervical ROM: Intact' },
        { id: 2, value: 'Cervical ROM: Restricted Flexion', label: 'Cervical ROM: Restricted Flexion' },
        { id: 3, value: 'Cervical ROM: Restricted Rotation', label: 'Cervical ROM: Restricted Rotation' }
    ],

    LumbarRomOptions: [
        { id: 1, value: 'Lumbar ROM: Intact', label: 'Lumbar ROM: Intact' },
        { id: 2, value: 'Lumbar ROM: Restricted Flexion', label: 'Lumbar ROM: Restricted Flexion' },
        { id: 3, value: 'Lumbar ROM: Pain on Extension', label: 'Lumbar ROM: Pain on Extension' }
    ],

    SpineSpecialTestOptions: [
        { id: 1, value: 'Straight Leg Raise (+SLR)', label: 'Straight Leg Raise (+SLR)' },
        { id: 2, value: "Spurling's Test (+)", label: "Spurling's Test (+)" },
        { id: 3, value: 'SI Joint Tenderness', label: 'SI Joint Tenderness' }
    ],

    UpperExtremityRegionOptions: [
        { id: 1, value: 'Shoulders (AC / Glenohumeral)', label: 'Shoulders (AC / Glenohumeral)' },
        { id: 2, value: 'Elbows', label: 'Elbows' },
        { id: 3, value: 'Wrists & Hands', label: 'Wrists & Hands' },
        { id: 4, value: 'Motor Strength (5/5)', label: 'Motor Strength (5/5)' },
        { id: 5, value: 'Radial Pulses Intact', label: 'Radial Pulses Intact' }
    ],

    RotatorCuffTestOptions: [
        { id: 1, value: 'Hawkins / Neer (+ Impingement)', label: 'Hawkins / Neer (+ Impingement)' },
        { id: 2, value: 'Empty Can Test (+)', label: 'Empty Can Test (+)' },
        { id: 3, value: 'Apprehension Test (+)', label: 'Apprehension Test (+)' }
    ],

    ElbowHandNerveTestOptions: [
        { id: 1, value: "Tinel's Sign (Carpal Tunnel)", label: "Tinel's Sign (Carpal Tunnel)" },
        { id: 2, value: "Phalen's Test (+)", label: "Phalen's Test (+)" },
        { id: 3, value: 'Lateral Epicondylitis Pain', label: 'Lateral Epicondylitis Pain' }
    ],

    LowerExtremityRegionOptions: [
        { id: 1, value: 'Hips', label: 'Hips' },
        { id: 2, value: 'Knees', label: 'Knees' },
        { id: 3, value: 'Ankles & Feet', label: 'Ankles & Feet' },
        { id: 4, value: 'Pedal Pulses 2+', label: 'Pedal Pulses 2+' },
        { id: 5, value: 'Deep Tendon Reflexes (DTR 2+)', label: 'Deep Tendon Reflexes (DTR 2+)' }
    ],

    KneeInstabilityTestOptions: [
        { id: 1, value: 'Lachman / Ant. Drawer (+)', label: 'Lachman / Ant. Drawer (+)' },
        { id: 2, value: "McMurray's Test (+ Meniscus)", label: "McMurray's Test (+ Meniscus)" },
        { id: 3, value: 'Valgus/Varus Laxity', label: 'Valgus/Varus Laxity' }
    ],

    HipFootVascularTestOptions: [
        { id: 1, value: 'FABER Test (+ Hip Pain)', label: 'FABER Test (+ Hip Pain)' },
        { id: 2, value: 'Thompson Test (+ Achilles rupture)', label: 'Thompson Test (+ Achilles rupture)' },
        { id: 3, value: 'Pitting Edema Present', label: 'Pitting Edema Present' }
    ],

    PrimaryLocationSiteOptions: [
        { id: 1, value: 'Generalized', label: 'Generalized' },
        { id: 2, value: 'Face/Neck', label: 'Face/Neck' },
        { id: 3, value: 'Trunk/Back', label: 'Trunk/Back' },
        { id: 4, value: 'Upper Limb', label: 'Upper Limb' },
        { id: 5, value: 'Lower Limb', label: 'Lower Limb' },
        { id: 6, value: 'Sacrum/Heels', label: 'Sacrum/Heels' }
    ],
    PressureInjuryStageOptions: [
        { id: 1, value: 'No Pressure Injury Identified', label: 'No Pressure Injury Identified' },
        { id: 2, value: 'Stage 1: Non-blanchable Erythema', label: 'Stage 1: Non-blanchable Erythema' },
        { id: 3, value: 'Stage 2: Partial Thickness Skin Loss', label: 'Stage 2: Partial Thickness Skin Loss' },
        { id: 4, value: 'Stage 3: Full Thickness Skin Loss (Fat visible)', label: 'Stage 3: Full Thickness Skin Loss (Fat visible)' },
        { id: 5, value: 'Stage 4: Full Thickness Tissue Loss (Bone/Muscle visible)', label: 'Stage 4: Full Thickness Tissue Loss (Bone/Muscle visible)' },
        { id: 6, value: 'Unstageable / Deep Tissue Injury (DTI)', label: 'Unstageable / Deep Tissue Injury (DTI)' }
    ],

    PeripheralEdemaGradeOptions: [
        { id: 1, value: 'No Edema (0)', label: 'No Edema (0)' },
        { id: 2, value: 'Trace / 1+ (2mm depth)', label: 'Trace / 1+ (2mm depth)' },
        { id: 3, value: 'Moderate / 2+ (4mm depth)', label: 'Moderate / 2+ (4mm depth)' },
        { id: 4, value: 'Deep / 3+ (6mm depth)', label: 'Deep / 3+ (6mm depth)' },
        { id: 5, value: 'Very Deep / 4+ (8mm depth)', label: 'Very Deep / 4+ (8mm depth)' }
    ],
    CapillaryRefillTimeOptions: [
        { id: 1, value: '< 2 Seconds (Normal)', label: '< 2 Seconds (Normal)' },
        { id: 2, value: '2 - 3 Seconds (Delayed)', label: '2 - 3 Seconds (Delayed)' },
        { id: 3, value: '> 3 Seconds (Sluggish)', label: '> 3 Seconds (Sluggish)' }
    ],

    NailBedAngleOptions: [
        { id: 1, value: 'Normal (<160° / Lovibond Angle)', label: 'Normal (<160° / Lovibond Angle)' },
        { id: 2, value: 'Early Clubbing (180° Flat)', label: 'Early Clubbing (180° Flat)' },
        { id: 3, value: 'Advanced Clubbing (>180° Bulbous)', label: 'Advanced Clubbing (>180° Bulbous)' }
    ],
    HairDistributionOptions: [
        { id: 1, value: 'Normal Distribution & Pattern', label: 'Normal Distribution & Pattern' },
        { id: 2, value: 'Focal Alopecia / Hair Loss', label: 'Focal Alopecia / Hair Loss' },
        { id: 3, value: 'Distal Loss (Trophic / PVD)', label: 'Distal Loss (Trophic / PVD)' },
        { id: 4, value: 'Hirsutism', label: 'Hirsutism' }
    ],

    ABCDEScreeningOptions: [
        { id: 1, value: 'Asymmetry Noted', label: 'Asymmetry Noted' },
        { id: 2, value: 'Border Irregularity', label: 'Border Irregularity' },
        { id: 3, value: 'Color Variegation', label: 'Color Variegation' },
        { id: 4, value: 'Diameter > 6mm', label: 'Diameter > 6mm' },
        { id: 5, value: 'Evolving / Enlarging', label: 'Evolving / Enlarging' }
    ],
    DermatoscopyBiopsyOptions: [
        { id: 1, value: 'Yes', label: 'Yes' },
        { id: 2, value: 'No', label: 'No' }
    ],

    StatedMoodOptions: [
        { id: 1, value: 'Euthymic (Normal)', label: 'Euthymic (Normal)' },
        { id: 2, value: 'Depressed / Dysphoric', label: 'Depressed / Dysphoric' },
        { id: 3, value: 'Anxious / Apprehensive', label: 'Anxious / Apprehensive' },
        { id: 4, value: 'Euphoric / Elated', label: 'Euphoric / Elated' },
        { id: 5, value: 'Irritable / Hostile', label: 'Irritable / Hostile' }
    ],

    ObservedAffectOptions: [
        { id: 1, value: 'Full Range & Congruent', label: 'Full Range & Congruent' },
        { id: 2, value: 'Blunted / Constricted', label: 'Blunted / Constricted' },
        { id: 3, value: 'Flat Affect', label: 'Flat Affect' },
        { id: 4, value: 'Labile / Rapid Shifting', label: 'Labile / Rapid Shifting' },
        { id: 5, value: 'Incongruent to Stated Mood', label: 'Incongruent to Stated Mood' }
    ],
    SafetyRiskAssessmentOptions: [
        { id: 1, value: 'Suicidal Ideation (SI) Denied', label: 'Suicidal Ideation (SI) Denied' },
        { id: 2, value: 'Homicidal Ideation (HI) Denied', label: 'Homicidal Ideation (HI) Denied' }
    ],

    OrientationDomainOptions: [
        { id: 1, value: 'Person', label: 'Person' },
        { id: 2, value: 'Place', label: 'Place' },
        { id: 3, value: 'Time', label: 'Time' },
        { id: 4, value: 'Situation', label: 'Situation' }
    ],

    SafetyPlanOptions: [
        { id: 1, value: 'Yes / Completed', label: 'Yes / Completed' },
        { id: 2, value: 'N/A', label: 'N/A' }
    ],
    AssociatedSymptomsOptions: [
        { id: 1, value: 'Pain', label: 'Pain' },
        { id: 2, value: 'Fever', label: 'Fever' },
        { id: 3, value: 'Chills', label: 'Chills' },
        { id: 4, value: 'Fatigue', label: 'Fatigue' },
        { id: 5, value: 'Weakness', label: 'Weakness' },
        { id: 6, value: 'Weight Loss', label: 'Weight Loss' },
        { id: 7, value: 'Weight Gain', label: 'Weight Gain' },
        { id: 8, value: 'Loss of Appetite', label: 'Loss of Appetite' },
        { id: 9, value: 'Nausea', label: 'Nausea' },
        { id: 10, value: 'Vomiting', label: 'Vomiting' },
        { id: 11, value: 'Diarrhea', label: 'Diarrhea' },
        { id: 12, value: 'Constipation', label: 'Constipation' },
        { id: 13, value: 'Abdominal Pain', label: 'Abdominal Pain' },
        { id: 14, value: 'Chest Pain', label: 'Chest Pain' },
        { id: 15, value: 'Shortness of Breath', label: 'Shortness of Breath' },
        { id: 16, value: 'Cough', label: 'Cough' },
        { id: 17, value: 'Sputum Production', label: 'Sputum Production' },
        { id: 18, value: 'Wheezing', label: 'Wheezing' },
        { id: 19, value: 'Palpitations', label: 'Palpitations' },
        { id: 20, value: 'Dizziness', label: 'Dizziness' },
        { id: 21, value: 'Syncope', label: 'Syncope' },
        { id: 22, value: 'Headache', label: 'Headache' },
        { id: 23, value: 'Blurred Vision', label: 'Blurred Vision' },
        { id: 24, value: 'Seizures', label: 'Seizures' },
        { id: 25, value: 'Numbness', label: 'Numbness' },
        { id: 26, value: 'Tingling', label: 'Tingling' },
        { id: 27, value: 'Swelling', label: 'Swelling' },
        { id: 28, value: 'Joint Pain', label: 'Joint Pain' },
        { id: 29, value: 'Back Pain', label: 'Back Pain' },
        { id: 30, value: 'Muscle Pain', label: 'Muscle Pain' },
        { id: 31, value: 'Rash', label: 'Rash' },
        { id: 32, value: 'Itching', label: 'Itching' },
        { id: 33, value: 'Burning Urination', label: 'Burning Urination' },
        { id: 34, value: 'Urinary Frequency', label: 'Urinary Frequency' },
        { id: 35, value: 'Urgency', label: 'Urgency' },
        { id: 36, value: 'Hematuria', label: 'Hematuria' },
        { id: 37, value: 'Incontinence', label: 'Incontinence' },
        { id: 38, value: 'Anxiety', label: 'Anxiety' },
        { id: 39, value: 'Depression', label: 'Depression' },
        { id: 40, value: 'Insomnia', label: 'Insomnia' },
        { id: 41, value: 'Night Sweats', label: 'Night Sweats' },
        { id: 42, value: 'Edema', label: 'Edema' },
        { id: 43, value: 'Bleeding', label: 'Bleeding' },
        { id: 44, value: 'Easy Bruising', label: 'Easy Bruising' },
        { id: 45, value: 'None', label: 'None' }
    ],
    OnsetOptions: [
        { id: 1, value: 'Sudden', label: 'Sudden' },
        { id: 2, value: 'Gradual', label: 'Gradual' },
        { id: 3, value: 'Unknown', label: 'Unknown' }
    ],
    CharacterOptions: [
        { id: 1, value: 'Sharp', label: 'Sharp' },
        { id: 2, value: 'Dull', label: 'Dull' },
        { id: 3, value: 'Burning', label: 'Burning' },
        { id: 4, value: 'Stabbing', label: 'Stabbing' },
        { id: 5, value: 'Cramping', label: 'Cramping' },
        { id: 6, value: 'Throbbing', label: 'Throbbing' },
        { id: 7, value: 'Pressure', label: 'Pressure' },
        { id: 8, value: 'Aching', label: 'Aching' }
    ],
    TimingOptions: [
        { id: 1, value: 'Constant', label: 'Constant' },
        { id: 2, value: 'Intermittent', label: 'Intermittent' },
        { id: 3, value: 'Occasional', label: 'Occasional' },
        { id: 4, value: 'Progressive', label: 'Progressive' }
    ],
    ProgressionOptions: [
        { id: 1, value: 'Improving', label: 'Improving' },
        { id: 2, value: 'Stable', label: 'Stable' },
        { id: 3, value: 'Worsening', label: 'Worsening' },
        { id: 4, value: 'Resolved', label: 'Resolved' }
    ],
    SeverityOptions: [
        { id: 1, label: 'Mild', value: 'Mild' },
        { id: 2, label: 'Moderate', value: 'Moderate' },
        { id: 3, label: 'Severe', value: 'Severe' },
    ],
    PreviousEpisodeOptions: [
        { id: 1, value: 'No', label: 'No' },
        { id: 2, value: 'Yes', label: 'Yes' },
        { id: 3, value: 'Unknown', label: 'Unknown' }
    ],
    ResponseToTreatmentOptions: [
        { id: 1, value: 'Complete Relief', label: 'Complete Relief' },
        { id: 2, value: 'Partial Relief', label: 'Partial Relief' },
        { id: 3, value: 'No Relief', label: 'No Relief' },
        { id: 4, value: 'Symptoms Worsened', label: 'Symptoms Worsened' }
    ]
};