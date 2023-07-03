import ReactHtmlParser from "react-html-parser";
import th from "date-fns/locale/th";
import { format } from "date-fns";

export const truncate = (txt: string, number: number = 40) =>
  txt.length > number ? txt.substring(0, number) + "..." : txt;

export function linkify(text: string) {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '" target="_blank" >' + url + "</a>";
  });
}

export function formatDateThai(dateString: string) {
  const today = new Date();
  const date = new Date(dateString);
  const year = date.getFullYear() + 543;
 
  if (date.toDateString() === today.toDateString()) {
    return "วันนี้";
  }
 
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return "เมื่อวาน";
  }

  return format(date, "EEE dd MMM ", { locale: th }) + year;
}

export const textToHtml = (text: string) => ReactHtmlParser(linkify(text));
 