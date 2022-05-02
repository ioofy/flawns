import moment from "moment";
import React, { useEffect, useState } from "react";

// creating func for parse graphql date into now moment
const formatter = (date: string | any) => {
  moment.updateLocale("en", {
    relativeTime: {
      future: (diff) => (diff == "just now" ? diff : `in ${diff}`),
      past: (diff) => (diff == "just now" ? diff : `${diff} ago`),
      s: "just now",
      ss: "just now",
      m: "%dm",
      mm: "%dm",
      h: "%dh",
      hh: "%dh",
      d: "%dd",
      dd: "%dd",
      w: "%dw",
      ww: "%dw",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });

  const actualsDate = moment(date).fromNow();

  return actualsDate;
};

type IntoNowProps = {
  actualDate: string | number | any;
  interval?: number;
};

const IntoNow = ({ actualDate, interval }: IntoNowProps) => {
  const [timestampString, setTimestampString] = useState("");

  useEffect(() => {
    const timer = setInterval(
      () => setTimestampString(formatter(actualDate)),
      interval,
    );

    setTimestampString(formatter(actualDate));
    return () => clearInterval(timer);
  }, [interval, actualDate]);

  return <span>{timestampString}</span>;
};

export default IntoNow;
