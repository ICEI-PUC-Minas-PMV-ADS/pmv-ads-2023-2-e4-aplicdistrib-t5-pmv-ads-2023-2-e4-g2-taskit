'use client'
import React, {useState, useEffect} from "react";
import { useTheme } from "@/shared/hooks/Theme";
import { TimerContainer, TimerIcon } from "@/shared/components/TimerContainer";
import calcTimer from "../calcTimer/CalcTimer";
import TimerButton from "../calcTimer/TimerButton";

export default function Timer() {
  const { setTheme } = useTheme();
  setTheme('dark');

const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
const [timerArray, setTimerArray] = useState<Array<number|string>>([]);


useEffect (() => {
   let timeArray: Array<number|string> = calcTimer(timeInSeconds);
   setTimerArray(timeArray);
}, [timeInSeconds]);

  return (
    <div>
    <TimerContainer>
        <p>{timerArray[0]}</p>
        <span>:</span>
        <p>{timerArray[1]}</p>
        <span>:</span>
        <p>{timerArray[2]}</p>
        
    </TimerContainer>
    <TimerButton setTimeInSeconds={setTimeInSeconds} />
    </div>
  )
}