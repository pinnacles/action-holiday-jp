import { getInput, setOutput, setFailed } from "@actions/core";
import { isHoliday } from "@holiday-jp/holiday_jp";

async function run(): Promise<void> {
  const dateStr =
    getInput("date", { required: false }) || new Date().toDateString();
  const date = new Date(dateStr);
  setOutput("is-holiday", isHoliday(date));
}

run().catch((err) => {
  setFailed(`Unable to process: ${err.message}`);
});
