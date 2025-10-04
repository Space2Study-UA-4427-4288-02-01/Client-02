import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { privacyPolicy } from '~/router/constants/crumbs'

const CookiePolicy = lazy(() => import('~/pages/cookie-policy/CookiePolicy'))
const ConfirmEmail = lazy(() => import('~/pages/confirm-email/ConfirmEmail'))

export const guestRouter = (
  <>
    <Route
      element={<CookiePolicy />}
      handle={{
        crumb: privacyPolicy
      }}
      path={guestRoutes.privacyPolicy.route}
    />

    <Route element={<ConfirmEmail />} path={guestRoutes.confirmEmail.route} />
  </>
)
