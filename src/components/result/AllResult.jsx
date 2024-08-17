import React, { useCallback, useEffect, useState } from "react";
import "./AllResult.css";
import { PiHandDepositBold } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
import CircularProgressBar from "../helper/CircularProgressBar";
import {
  useGetAllLocationWithTimeQuery,
  useGetAllResultWebQuery,
  useTransferWalletBalanceMutation,
} from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { loadProfile } from "../../redux/actions/userAction";
import { FaWallet } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const locationdata = [
  {
    id: "1",
    name: "Canada",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
      { id: "18", time: "09:00 AM" },
      { id: "19", time: "10:00 AM" },
      { id: "20", time: "11:00 AM" },
      { id: "21", time: "12:00 PM" },
      { id: "22", time: "01:00 PM" },
      { id: "23", time: "02:00 PM" },
    ],
  },
  {
    id: "2",
    name: "Japan",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Punjab",
    limit: "200 - 200X",
    times: [
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "4",
    name: "Pune",
    limit: "200 - 200X",
    times: [
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "5",
    name: "China",
    limit: "100 - 100X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "6",
    name: "India",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "7",
    name: "USA",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
    ],
  },
  {
    id: "8",
    name: "Korea",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
];

const resultdata = {
  success: true,
  results: [
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ef71a830e5281e70233",
      lottime: {
        _id: "66bf4ef71a830e5281e70233",
        lottime: "09:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f441a830e5281e702ad",
            lotdate: "16-08-2024",
            lottime: "66bf4ef71a830e5281e70233",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "01",
              lotdate: {
                _id: "66bf4f441a830e5281e702ad",
                lotdate: "16-08-2024",
                lottime: "66bf4ef71a830e5281e70233",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ef71a830e5281e70233",
                lottime: "09:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f4d1a830e5281e702c0",
            lotdate: "17-08-2024",
            lottime: "66bf4ef71a830e5281e70233",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f4d1a830e5281e702c0",
                lotdate: "17-08-2024",
                lottime: "66bf4ef71a830e5281e70233",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ef71a830e5281e70233",
                lottime: "09:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4f011a830e5281e7023c",
      lottime: {
        _id: "66bf4f011a830e5281e7023c",
        lottime: "10:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f591a830e5281e702dd",
            lotdate: "16-08-2024",
            lottime: "66bf4f011a830e5281e7023c",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f591a830e5281e702dd",
                lotdate: "16-08-2024",
                lottime: "66bf4f011a830e5281e7023c",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4f011a830e5281e7023c",
                lottime: "10:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f631a830e5281e702f0",
            lotdate: "17-08-2024",
            lottime: "66bf4f011a830e5281e7023c",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f631a830e5281e702f0",
                lotdate: "17-08-2024",
                lottime: "66bf4f011a830e5281e7023c",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4f011a830e5281e7023c",
                lottime: "10:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
  ],
};

function AllResult() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const { accesstoken, user } = useSelector((state) => state.user);

  // GETTING ALL THE LOCATION

  const {
    data: alllocation,
    error: alllocationError,
    isLoading: allocationIsLoading,
  } = useGetAllLocationWithTimeQuery(accesstoken);

  const {
    data: allresult,
    error: allresultError,
    isLoading: allresultIsLoading,
  } = useGetAllResultWebQuery({
    accessToken: accesstoken,
    locationid: selectedItem?._id,
  });

  useEffect(() => {
    if (!allocationIsLoading && alllocation) {
      setSelectedItem(alllocation?.locationData[0]);
      console.log("Calling allresult");
      console.log(allocationIsLoading, allresult);
    }
  }, [allocationIsLoading, alllocation]);

  useEffect(() => {
    if (alllocation) {
      console.log("Calling allresult only:: "+allresultIsLoading);
      console.log(allocationIsLoading, allresult);
    }
  }, [ allresult, selectedItem]);

  const getAllResultForOtherLocation = (item) => {
    console.log("GETTING RESULT...");
    setSelectedItem(item);
    console.log("allresult :: "+allresultIsLoading)
    console.log(JSON.stringify(selectedItem))
  };

  return (
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label">Results</label>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container-result">
        {/** LOCATION CONTAINER */}
        <div className="all-location-result">
          {allocationIsLoading ? (
            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgressBar />
            </div>
          ) : (
            alllocation?.locationData?.map((item, index) => (
              <div
                key={index}
                onClick={() => getAllResultForOtherLocation(item)}
                className="location-header-result-allresult"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(90deg, #1993FF, #0F5899)"
                      : "linear-gradient(90deg, #7EC630, #3D6017)",
                      borderColor: selectedItem?._id === item._id ? COLORS.blue : 'transparent', // Use transparent for no border
                      borderWidth: '2px',
                      borderStyle: selectedItem?._id === item._id ? 'solid' : 'none', // Apply border style conditionally

                }}
              >
                <span className="location-header-label">{item.name}</span>
                <span className="location-header-max-label">
                  Max {item.limit}
                </span>
              </div>
            ))
          )}
        </div>

        {/** RESULT CONTAINER */}
        <div className="result-container">
          {allresultIsLoading ? (
            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgressBar />
            </div>
          ) : (
            <>
              {allresult?.results?.length === 0 ? (
                <div
                  style={{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh"
                  }}
                >
                  <label className="h-title-label">{allresult ? "No reault available" : "Loading..."}</label>
                </div>
              ) : (
                allresult?.results?.map((item, index) => (
                  <div className="result-content-time-container">
                    <div className="result-content-time-container-content-time">
                      <label className="result-content-time-container-content-label">
                        {item.lottime.lottime}
                      </label>
                    </div>
                    {/** FOR DATE  */}
                    {item.dates.map((dateitem, dateindex) => (
                      <div
                        key={dateitem._id}
                        className="result-content-time-container-content-container"
                      >
                        <div className="result-content-time-container-content-date">
                          <label className="result-content-time-container-content-label">
                            {dateitem.lotdate.lotdate}
                          </label>
                        </div>
                        <div className="result-content-time-container-content-result">
                          <label className="result-content-time-container-content-label">
                            {dateitem.results[0].resultNumber}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </>
          )}

          {/** END RESULT CONTAINER */}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default AllResult;

// {resultdata.results.map((item, index) => (
//   <div className="result-content-time-container">
//     <div className="result-content-time-container-content">
//       <label className="result-content-time-container-content-label">
//         {item.lottime.lottime}
//       </label>
//     </div>

//     {/** FOR DATE  */}

//     {item.dates.map((dateitem, dateindex) => (
//       <div className="result-content-time-container-content">
//         <label className="result-content-time-container-content-label">
//           {dateitem.lotdate.lotdate}
//         </label>
//       </div>
//     ))}
//   </div>
// ))}
