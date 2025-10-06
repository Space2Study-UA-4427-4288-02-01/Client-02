import { AxiosResponse } from 'axios'

import { appApi } from '~/redux/apiSlice'
import { logout, setUser } from '~/redux/reducer'
import { axiosClient } from '~/plugins/axiosClient'

import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import {
  ApiMethodEnum,
  ConfirmResponse,
  GoogleAuthParams,
  LoginParams,
  LoginResponse,
  SignupParams,
  SignupResponse
} from '~/types'

const { POST } = ApiMethodEnum

export const AuthService = {
  refresh: (): Promise<AxiosResponse<LoginResponse>> => {
    return axiosClient.get(URLs.auth.refresh)
  },
  confirmEmail: (
    confirmToken: string
  ): Promise<AxiosResponse<ConfirmResponse>> => {
    return axiosClient.post(URLs.auth.confirm, { confirmToken })
  },
  forgotPassword: (userEmail: string): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.auth.forgotPassword, userEmail)
  },
  resetPassword: (
    resetToken: string,
    newPassword: string
  ): Promise<AxiosResponse> => {
    const confirmUrl = createUrlPath(URLs.auth.resetPassword, resetToken)
    return axiosClient.patch(confirmUrl, newPassword)
  }
}

export const authService = appApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignupResponse, SignupParams>({
      query: (body) => ({ url: URLs.auth.signup, method: POST, body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.userId))
        } catch (error) {
          console.log('SignUp failed', error)
        }
      }
    }),
    login: build.mutation<LoginResponse, LoginParams>({
      query: (body) => ({ url: URLs.auth.login, method: POST, body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.accessToken))
        } catch {
          dispatch(logout())
        }
      }
    }),
    googleAuth: build.mutation<LoginResponse, GoogleAuthParams>({
      query: (body) => ({ url: URLs.auth.googleAuth, method: POST, body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.accessToken))
        } catch {
          dispatch(logout())
        }
      }
    }),
    googleSignup: build.mutation<SignupResponse, GoogleAuthParams>({
      query: (body) => ({ url: URLs.auth.googleSignup, method: POST, body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.userId))
        } catch {
          dispatch(logout())
        }
      }
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: URLs.auth.logout, method: POST }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(logout())
      }
    })
  })
})

export const {
  useSignUpMutation,
  useLoginMutation,
  useGoogleAuthMutation,
  useGoogleSignupMutation,
  useLogoutMutation
} = authService
