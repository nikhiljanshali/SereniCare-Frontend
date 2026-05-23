export const environment = {
  production: true,
  name: 'production',
  apiUrl: 'http://localhost:5000',
  middleware: '/api/v1',
  endpoints: {
    auth: '/auth'
  },
  features: {
    enableNotifications: true,
    enableLogging: true,
    debugMode: true
  },
  timeout: 30000,
  retryAttempts: 3
};
