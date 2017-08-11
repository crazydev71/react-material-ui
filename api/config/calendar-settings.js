import fs from 'fs';

const { CALENDAR_KEYPATH, CALENDAR_ACCOUNT_ID, CALENDAR_TIMEZONE } = process.env;

const SERVICE_ACCT_ID = CALENDAR_ACCOUNT_ID;
const TIMEZONE = CALENDAR_TIMEZONE;
const CALENDAR_ID = {
  'mendr-calendar': 'r0uduettq8vvu08qp57dljrups@group.calendar.google.com',
};

const KEYPATH = CALENDAR_KEYPATH;
const json = fs.readFileSync(KEYPATH, 'utf8');
const key = JSON.parse(json).private_key;

export default {
	serviceAcctId: SERVICE_ACCT_ID,
	key: key,
	timezone: TIMEZONE,
	calendarId: CALENDAR_ID
}