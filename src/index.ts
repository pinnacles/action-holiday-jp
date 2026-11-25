import { getInput, setFailed, setOutput } from "@actions/core";
import { isHoliday } from "@holiday-jp/holiday_jp";

// ランナーのタイムゾーンは UTC なので、new Date() のローカル日付をそのまま使うと
// JST 0:00〜9:00 は前日の日付で判定されてしまう。日付は JST で決める。
function todayInJst(): Date {
  const [year, month, day] = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
  })
    .format(new Date())
    .split("-")
    .map(Number);
  // isHoliday はローカル時刻の年月日で判定するため、ローカルの 0 時として組み立てる
  return new Date(year, month - 1, day);
}

async function run(): Promise<void> {
  const dateStr = getInput("date", { required: false });
  const date = dateStr ? new Date(dateStr) : todayInJst();
  setOutput("is-holiday", isHoliday(date));
}

run().catch((err) => {
  setFailed(`Unable to process: ${err.message}`);
});
