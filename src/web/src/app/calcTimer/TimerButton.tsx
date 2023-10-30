import React, { useState } from 'react';
import { TimerContainer, TimerIcon } from "@/shared/components/TimerContainer";
import { BsFillPauseCircleFill, BsFillCheckCircleFill, BsFillPlayCircleFill, BsFillSkipBackwardCircleFill } from "react-icons/bs";
import Page from './BackButton';

type Props = {
    setTimeInSeconds: Function
}

function TimerButton(props:Props) {
    const { setTimeInSeconds } = props;
    const [intervalId, setIntervalId] = useState<number>(0);

    const handlePlayButton = (e: object) => {
        const interval:any = setInterval(() => {
            setTimeInSeconds((previousState:number) => previousState + 1);
        }, 1000);

        setIntervalId(interval);
    }

    const handleStopButton = () => {
        clearInterval(intervalId);
    }

    const handleReset = () => {
        clearInterval(intervalId);
        setTimeInSeconds(0);
    }

    return(
      
        <TimerIcon>
            <BsFillPlayCircleFill className="TimerIcon" onClick={handlePlayButton} type="button" />
            <BsFillPauseCircleFill onClick={handleStopButton} type="button"/>
            <BsFillSkipBackwardCircleFill onClick={handleReset} type="button"/>
            <BsFillCheckCircleFill />
            <Page />        
        </TimerIcon>
    
    );
}

export default TimerButton;