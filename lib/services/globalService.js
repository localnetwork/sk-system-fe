import { parseCookies } from "nookies";

// import moment from "moment-timezone";
// const tz = moment.tz.guess();
// moment.tz.setDefault(tz);

export function token() {
  const cookies = parseCookies();
  return cookies?.token;
}

// export function convertDate(date) {
//   return moment.utc(date).tz(tz).format("MMMM DD, yyyy");
// }
// export function convertDateToYear(date) {
//   return moment.utc(date).tz(tz).format("YYYY");
// }

// export function convertDateToMonthYear(date) {
//   return moment.utc(date).tz(tz).format("MMMM, YYYY");
// }

import Jsona from "jsona";
const dataFormatter = new Jsona();

export function deserialize(data) {
  return dataFormatter.deserialize(data);
}

const cookies = parseCookies();
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";

export const auth = cookies?.[TOKEN] ? true : false;

export function getCurrentYear() {
  const d = new Date();
  return d.getFullYear();
}

export function sortBlocks(list) {
  return list.sort((a, b) => a.order - b.order);
}

export function paramsToString(params) {
  return params
    ? Object.keys(params)
        .map((key, index) => {
          if (Array.isArray(params[key]))
            return params[key]
              .map((value, i) => `${key}[${i}]=${value}`)
              .join("&");
          else return `${key}=${Object.values(params)[index]}`;
        })
        .join("&")
    : null;
}

// export function validateUnix(unixDate) {
//   return unixDate > moment().unix();
// }
