import { Pipe, PipeTransform } from "@angular/core";

const mns = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function formatDateEnglish(date: Date) {
  return `${mns[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

function formatDateGerman(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
function formatDateChinese(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

@Pipe({
  name: "xcDate"
})
export class XcDatePipe implements PipeTransform {
  transform(value: Date, lang?: string): any {
    // console.log("xcdate transform", value, lang);
    switch (lang) {
      case "english":
        return formatDateEnglish(value);
      case "german":
        return formatDateGerman(value);
      case "chinese":
        return formatDateChinese(value);
    }
  }
}
