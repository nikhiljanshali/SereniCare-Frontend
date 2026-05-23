export const environment = {
  production: false,
  name: 'development',
  apiUrl: 'http://localhost:5000',
  middleware: '/api/v1',
  endpoints: {
    authentication: '/authentication',
    patients: '/patients',
    clinicType: '/clinictype',
    clinics: '/clinics',
    primarySpeciality: '/speciality',
    role: '/role',
    meshTable: '/meshTable',
    bloodGroup: '/bloodGroup',
    primaryCondition: '/primaryCondition',
    allergies: '/allergies',
    doctors: '/doctors'
  },
  features: {
    enableNotifications: true,
    enableLogging: true,
    debugMode: true
  },
  storageKeys: {
    user: 'Development_SC_USER',
    clinic: 'Development_SC_CLINIC',
    token: 'Development_SC_TOKEN',
    settings: 'Development_SC_SETTINGS',
  },
  timeout: 30000,
  retryAttempts: 3
};
