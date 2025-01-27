/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function CountDown({ data }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const now = new Date();
    const start = new Date(data.startDate);
    const finish = new Date(data.finishDate);
    let timeLeft = {};

    if (now >= start && now <= finish) {
      const difference = +finish - +now;

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
    } else if (now < start) {
      timeLeft = { status: "Not started yet!" };
    } else {
      timeLeft = { status: "Time's up!" };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft)
    .filter((key) => key !== "status")
    .map((interval) => {
      return (
        <span className="text-[25px] text-[#475ad2]" key={interval}>
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    });

  return (
    <div>
      {timeLeft.status === "Not started yet!" ? (
        <span className="text-[#FFA500] text-[25px]">{`Not started yet!`}</span>
      ) : timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">{`Time's up!`}</span>
      )}
    </div>
  );
}

export default CountDown;
