export const URLs = {
  example: {
    get: '/example'
  },
  auth: {
    login: '/auth/login',
    googleAuth: '/auth/google-auth',
    googleSignup: '/auth/google-signup',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    confirm: '/auth/confirm-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  users: {
    get: '/users',
    update: '/users',
    delete: '/users/delete',
    myProfile: '/users/myProfile',
    uploadPhoto: (userId: string) => `/users/${userId}/upload-photo`
  },
  categories: {
    get: '/categories',
    getNames: '/categories/names',
    priceRange: '/price-range'
  },
  subjects: {
    get: '/subjects',
    getNames: '/subjects/names'
  },
  locations: {
    getCountries: '/location/countries',
    getCities: (countryCode: string) =>
      `/location/countries/${countryCode}/cities`
  },
  resources: {
    questions: {
      get: '/questions',
      delete: '/questions',
      post: '/questions',
      patch: '/questions'
    },
    resourcesCategories: {
      get: '/resources-categories',
      getNames: '/resources-categories/names',
      patch: '/resources-categories',
      post: '/resources-categories',
      delete: 'resources-categories'
    }
  }
}
