import bcryptjs from "bcryptjs";
import { JWT } from "../constant";
import moment from 'moment';
// import slugify from "slugify";

// export const extractAccessToken = (req: Request): string | string[] | null => {
//   if (req.headers && req.headers['accessToken']) {
//     return req.headers['accessToken']
//   }
//   return null;
// };


export const formatDate = (input: Date | string): string => {
  const date = moment(input);

  if (!date.isValid()) {
    throw new Error('Invalid date input');
  }

  return date.format('dddd, D MMMM'); // e.g., "Monday, 25 August"
}


export const safeGet = (obj: any = {}, prop: string) => {
  return Object.assign({}, obj)[prop] || "";
}

export const toObjectId = (baseId: string = "5951bc91860d8b5ba", mysqlId: number = 1) => {
  const oldId = mysqlId.toString(10);
  const a = oldId.length < 7 ? "0".repeat(7 - oldId.length) : "0";
  return baseId + a + oldId;
}

export function getLoginType(data: any) {
  const { email, phone, otp, password } = data;
  let loginType = "";
  if (email && password) {
    loginType = "EMAIL";
  } else if (phone && password) {
    loginType = "PHONE";
  } else if (phone && otp) {
    loginType = "OTP";
  }
  return loginType;
}

/**
 * generateObjectId() creates a uuid for a record using the locationId
 * @param {string} serial or Integer primary key to be converted to ObjectId
 * @param {string} baseId is the base ObjectId for that collection
 */
export function generateObjectId(serial: string, baseId = "5c51bc91860d8b5bc0000001") {
  const str = baseId.slice(0, 24 - `${serial}`.length);
  return `${str}${serial}`;
}

export function setLimit(inputlimit: any): number {
  const limit = parseInt(inputlimit, 10);
  // eslint-disable-next-line no-restricted-globals
  return isNaN(limit) || limit == null || limit > 100 || limit === 0
    ? 100
    : limit;
}

export function timestamp() {
  return `${new Date().toISOString().slice(0, 22)}Z`;
}

export function dateDaysAgo(since = 0) {
  const today = new Date();
  today.setDate(today.getDate() - since);
  return today.toISOString();
}

export function randomNum() {
  return Math.floor(Math.random() * 100000);
}

export function cloneObject(model = {}, source: any = {}) {
  return Object.assign(model, source);
}

/**
 * @description getObjectByKey returns the object from an Array of
 * Objects that has the key with a given value or undefined!
 * @param {Array} arrayObject Array of Objects
 * @param {String} key Object key could be a String or Integer
 * @param {String} value Object value could be a String or Integer
 */
export function getObjectByKey(arrayObject: any[], key: string, value: any) {
  return arrayObject.find((obj) => obj[key] === value);
}

export function getSettings(arrObj = [{}], value = "") {
  const Obj: any = arrObj.find((item: any) => item.name === value);
  if (Obj) {
    return Obj.value;
  }
  return "ERROR";
}

/**
 * @description addToArrayOfObjects add a new object item to an array of objects
 * @param {Object} arrayOfObjects the array of object
 * @param {Number} limit maximum number of objects the array should not exceed
 * @param {Object} newObjectElement the new item to be added to the array of objects
 * @returns {Object} the new array of Objects
 */
export default function addToArrayOfObjects(
  arrayOfObjects: any,
  limit: any,
  newObjectElement: any
) {
  const size = Object.keys(arrayOfObjects).length;
  if (size < limit) {
    arrayOfObjects.push(newObjectElement);
  } else {
    // arr.splice(indexToRemove, numToRemove)
    arrayOfObjects.splice(0, 1);
    arrayOfObjects.push(newObjectElement);
  }
  return arrayOfObjects;
}

/**
 * @description getClientAccess get the Ip Address and TimeSTamp of a request object.
 * @param {String} req the request object
 * @returns {Object} { accessDate, ipAddress } access date and the ip address
 */
export function getClientAccess(req: any) {
  const ipAddress = req.ip || req._remoteAddress;
  // const lang = req.get("accept-language");
  const accessDate = req._startTime || "";
  return { accessDate, ipAddress };
}

export function isRealValue(object: any) {
  return typeof object !== "undefined" || object !== null;
}

export function hasProp(obj: any, prop: string) {
  if (!isRealValue(obj)) return false;
  return obj[prop] !== undefined;
}

export function isObjecId(id: string) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) return true;
  return false;
}

/**
 * @returns a six-digit random number
 */
export function generateOtp() {
  const num = Math.floor(Math.random() * 90000) + 10000;
  return num;
}

export const hash = (str: string = "") => {
  return bcryptjs.hashSync(str, JWT.saltRounds);
}

export function cleanDeepObject(obj: any) {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in obj) {
    if (!obj[propName] || obj[propName].length === 0) {
      delete obj[propName];
    } else if (typeof obj === "object") {
      cleanDeepObject(obj[propName]);
    }
  }
  return obj;
}

export const getSearchParams = (req: Request): Record<string, string> => {
  const url = new URL(req.url);
  const searchParams: any = url.searchParams;

  const paramsObject: Record<string, string> = {};

  // Convert searchParams to object
  for (const [key, value] of searchParams.entries()) {
      paramsObject[key] = value;
  }
  return paramsObject;
} 

/**
 * @description a function that removes duplicates from an array of objects
 * @param {Array} arrayOfObj an array of objects with duplicate value for
 *  a given property
 * @param {String} prop the property with duplicate values that renneds to be filtered by
 */
export function removeDuplicates(arrayOfObj: any[], prop: string) {
  const setOfSeenObj = new Set();
  const filteredArr = arrayOfObj.filter((item) => {
    const duplicate = setOfSeenObj.has(item[prop]);
    setOfSeenObj.add(item[prop]);
    return !duplicate;
  });
  return filteredArr;
}

export function nextDate(d = 1, givenDate = new Date().toISOString()) {
  return new Date(
    new Date(givenDate).setDate(new Date(givenDate).getDate() + d)
  );
}

export function genString(length: number, str: string = "ABCDEFGHJKLMNPQRSTUVWXYZ") {
  let text = "";
  for (let i = 0; i < length; i++) {
    text += str.charAt(Math.floor(Math.random() * str.length));
  }
  return text;
}

function daysIntoYear(date = new Date()) {
  // eslint-disable-next-line max-len
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

export function genCode(len: number = 9) {
  let d = new Date().getFullYear().toString().substr(-2);
  d += daysIntoYear();
  if (len - d.length > 0) {
    return d + genString(len - d.length);
  }
  return genString(len);
}

export function generateCode(len = 10) {
  let d = new Date().getFullYear().toString().substr(-1);
  d += daysIntoYear();
  if (len - d.length > 0) {
    return d + genString(len - d.length, "0987654321");
  }
  return genString(len, "0987654321");
}

export async function generateModelCode(Model: any) {
  let code = generateCode(10);
  let duplicate = await Model.findOne({ code });
  if (duplicate) {
    code = generateCode(10);
    duplicate = await Model.findOne({ code });
    if (duplicate) {
      throw new Error(`${Model} record code ${code} exists.`);
    }
  }
  return code;
}

export function hasNull(Obj = {}) {
  const val = Object.values(Obj);
  if (val.includes(null) || val.includes(undefined) || val.includes(""))
    return true;
  return false;
}

export function formatPhone(phone: string) {
  if (!phone) return null;
  let str = phone.trim();
  if (str.length === 11 && str[0] === "0") {
    str = `+234${str.slice(1)}`;
  }
  if (str.length === 10) {
    str = `+234${str}`;
  }
  return str;
}

// export function stringToArrayPhone(str: string) {
//   const arr = str.split(",").map((st) => st.trim()) || []; // remove spaces
//   const filtered = arr.filter(
//     (value, index) => value.length >= 11 && value.length < 15
//   );
//   return [...new Set(filtered)]; // Remove duplicates
// }

export function getRequestIp(request: Request | any) {
  let ipAddr = request.connection.remoteAddress;
  if (request.headers && request.headers["x-forwarded-for"]) {
    [ipAddr] = request.headers["x-forwarded-for"].split(",");
  }
  return ipAddr;
}

// eslint-disable-next-line complexity
export function getFullname(record: any) {
  if (!record) return "";
  const title = hasProp(record, "title") ? record.title : "";
  const gender = hasProp(record, "gender")
    ? `(${record.gender.charAt(0).toLowerCase()})`
    : "";
  const surname = hasProp(record, "surname") ? record.surname : "";
  const lastName = hasProp(record, "lastName") ? record.lastName : "";
  return `${titleCase(`${title} ${surname} ${lastName}`)} ${gender}`.trim();
}

export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const textLimit = (text: string, limit: number = 30): string => {
  const truncatedText: string = text.slice(0, limit);
  return text.length > limit ? `${truncatedText}...` : truncatedText;
}

 // utils/parseSortQuery.ts
export const parseSortQuery = (sortQuery?: string): Record<string, 1 | -1> => {
  if (!sortQuery) return {};

  // split by comma (e.g., "-createdAt,name" => ["-createdAt", "name"])
  const fields = sortQuery.split(",").map((f) => f.trim());

  // convert into { field: 1 | -1 } object
  const sortObject: Record<string, 1 | -1> = {};
  for (const field of fields) {
    if (!field) continue;
    if (field.startsWith("-")) {
      sortObject[field.substring(1)] = -1; // descending
    } else {
      sortObject[field] = 1; // ascending
    }
  }

  return sortObject;
}
