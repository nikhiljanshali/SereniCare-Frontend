export const environment = {
  production: true,
  name: 'production',
  // apiUrl: 'https://serenicare-backend-bdgqd2cpfycnbsbv.eastasia-01.azurewebsites.net',
  apiUrl: 'https://serenicare-backend-env.eba-ditk86km.ap-south-1.elasticbeanstalk.com',
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
    doctors: '/doctors',
    appointmentBooking: '/appointmentBookings',
    supplier: '/supplier',
    medicine: '/medicine',
    prescription: '/prescription'
  },
  features: {
    enableNotifications: true,
    enableLogging: true,
    debugMode: false
  },
  storageKeys: {
    user: 'Production_SC_USER',
    clinic: 'Production_SC_CLINIC',
    token: 'Production_SC_TOKEN',
    settings: 'Production_SC_SETTINGS',
    userDetails: 'Production_SC_USER_DETAILS'
  },
  timeout: 30000,
  retryAttempts: 3
};
