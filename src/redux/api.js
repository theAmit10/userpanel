import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import UrlHelper from "../helper/UrlHelper";

export const sincelotUserApi = createApi({
  reducerPath: "sincelotUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://adminbackend-apsw.onrender.com/api/v1/",
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (accessToken) => ({
        url: "user/profile",
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // FOR CREATE A WITHDRAW REQUEST
    createWithdraw: builder.mutation({
      query: ({ accessToken, body }) => ({
        url: UrlHelper.WITHDRAW_PAYMENT_API,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      }),
    }),

    // FOR GETTING ALL THE LOCATION WITH TIME
    getAllLocationWithTime: builder.query({
      query: (accessToken) => ({
        url: "result/alllotlocationwithtime",
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // FOR BETTING

    // FOR GETTING DATE ACCORDING TO THE LOCATION, TIME
    //  getDateAccToLocTime: builder.query({
    //     query: (accessToken, lottimeId,lotlocationId) => ({
    //       url: `result/searchdate?lottimeId=${lottimeId}&lotlocationId=${lotlocationId}`,
    //       method: 'get',
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }),
    //   }),
    getDateAccToLocTime: builder.query({
      query: ({ accessToken, lottimeId, lotlocationId }) => ({
        url: `result/searchdate?lottimeId=${lottimeId}&lotlocationId=${lotlocationId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // FOR GETTING BET ACCORDING TO THE LOCATION, TIME AND CURRENT DATE
    getBetAccToLocTimeDate: builder.query({
      query: (accessToken, lotlocation, lottime, lotdate) => ({
        url: `result/playzone/singleplay?lotlocation=${lotlocation}&lottime=${lottime}&lotdate=${lotdate}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // FOR CREATE A PLAY REQUEST
    createPlay: builder.mutation({
      query: ({ accessToken, body }) => ({
        url: UrlHelper.CREATE_PLAY_API,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      }),
    }),

    // FOR HISTORIES

    // FOR GETTING USERS PLAY HISTORY
    getPlayHistory: builder.query({
      query: (accessToken) => ({
        url: "result/singleuser/playbets",
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // FOR GETTING USERS HISTORY
    getHistory: builder.query({
      query: ({ accesstoken, userId }) => ({
        url: "user/getuserdeposit/?userid=" + userId,
        method: "get",
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR CREATE A DEPOSIT REQUEST
    createDeposit: builder.mutation({
      query: ({ accessToken, body }) => ({
        url: UrlHelper.DEPOSIT_API,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      }),
    }),

    // FOR GETTING ALL COUNTRY LIST
    getAllCountry: builder.query({
      query: () => ({
        url: `result/allcurrencies`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // FOR CREATE A BALANCE TRANSFER REQUEST
    transferWalletBalance: builder.mutation({
      query: ({ accessToken, body }) => ({
        url: UrlHelper.BALANCE_TRANSFER_TO_WALLET_TWO_API,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      }),
    }),

    // FOR A LOGIN TEST
    createLogin: builder.mutation({
      query: ({ body }) => ({
        url: "user/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),

    // FOR REGISTER
    createRegister: builder.mutation({
      query: ({ body }) => ({
        url: UrlHelper.REGISTER_API,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),

    // FOR LOGGING OFF
    getLogout: builder.query({
      query: (accessToken) => ({
        url: "user/logout",
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // GET ALL THE RESULT
    getAllResultWeb: builder.query({
      query: ({ accessToken, locationid }) => ({
        url: `result/allresultwithtime?locationid=${locationid}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // GET ALL THE RESULT
    getResultLocMonYear: builder.query({
      query: ({ accessToken, locationid, year, month }) => ({
        url: `result/allresultlocmonyear?locationid=${locationid}&year=${year}&month=${month}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // GET APP LINK
    getAppLink: builder.query({
      query: () => ({
        url: `result/getapplink`,
        method: "get",
      }),
    }),

    getTopWinner: builder.query({
      query: (accesstoken) => ({
        url: `result/topwinner`,
        method: "get",
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // GET PARTNER PARTNERLIST
    getPartnerPartnerList: builder.query({
      query: ({ accesstoken, userid, page, limit }) => ({
        url: `user/getpartnerpartnerlist/${userid}?page=${page}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          method: "get",
        },
      }),
    }),

    // [SEARCH PARTNER PARTNER LIST]
    searchPartnerPartnerList: builder.query({
      query: ({ accesstoken, userId, query }) => ({
        url: `user/searchpartnerlist/${userId}?query=${query}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // ######## END #########
  }),
});

export const {
  useSearchPartnerPartnerListQuery,
  useGetPartnerPartnerListQuery,
  useGetDataQuery,
  useCreateWithdrawMutation,
  useGetAllLocationWithTimeQuery,
  useGetDateAccToLocTimeQuery,
  useGetBetAccToLocTimeDateQuery,
  useCreatePlayMutation,
  useGetPlayHistoryQuery,
  useGetHistoryQuery,
  useCreateDepositMutation,
  useGetAllCountryQuery,
  useTransferWalletBalanceMutation,
  useCreateLoginMutation,
  useCreateRegisterMutation,
  useGetLogoutQuery,
  useGetAllResultWebQuery,
  useGetResultLocMonYearQuery,
  useGetAppLinkQuery,
  useGetTopWinnerQuery,
} = sincelotUserApi;
