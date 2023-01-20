import React from "react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { th } from "date-fns/locale";

const NewsDateFormat = (date: Date) => {
  return (
    <>
      {format(new Date(date), "d MMMM yyyy HH:mm", {
        locale: th,
      })}
      {formatDistanceToNowStrict(new Date(date), {
        addSuffix: true,
        locale: th,
      })}
    </>
  );
};

export default NewsDateFormat;
