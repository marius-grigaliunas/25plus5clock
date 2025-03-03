import { useState } from 'react'

export default function () {

    const [breakLengthInMinutes, setbreakLengthInMinutes] = useState<number>(5)
    const [breakLenghtInSeconds, setBreakLenghtInSeconds] = useState<number>(breakLengthInMinutes*60)

    const [sessionLengthInMinutes, setsessionLengthInMinutes] = useState<number>(25)
    const [sessionLengthInSeconds, setSessionLengthInInSeconds] = useState<number>(sessionLengthInMinutes*60)
    
    const [isSession, setIsSession] = useState<boolean>(true)
    const [isPaused, setIsPaused] = useState<boolean>(true)

    

    const Decrement = (intervalName: string) => {
        if(intervalName === "break") {
            setbreakLengthInMinutes(breakLengthInMinutes - 1)
        } else if (intervalName === "session") {
            setsessionLengthInMinutes(sessionLengthInMinutes - 1)
        }

    }

    const Increment = (intervalName: string) => {
        if(intervalName === "break") {
            setbreakLengthInMinutes(breakLengthInMinutes + 1)
        } else if (intervalName === "session") {
            setsessionLengthInMinutes(sessionLengthInMinutes + 1)
        }

    }

    const formatTime = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 60)
        const remainingSeconds = timeInSeconds % 60

        return `${minutes.toString().padStart(2, '0')} : ${remainingSeconds.toString().padStart(2, '0')}`
    }


    return (
        <div className='flex flex-col h-lvh w-lvw justify-center items-center'>
            <header><h1>25 + 5 Clock</h1></header>
            <section className='flex flex-row justify-center items-center gap-10'>
                <fieldset id='break-field'>
                    <label id='break-label'>Break Length</label>
                    <div id='break-controls' className='flex gap-2'>
                        <button id='break-decrement' onClick={() => (Decrement("break"))} >DOWN</button>
                        <output id="break-length" className='text-2xl'>{breakLengthInMinutes}</output>
                        <button id='break-increment' onClick={() => (Increment("break"))} >UP</button>
                    </div>
                </fieldset>
                <fieldset id='session-field'>
                    <label id='session-label'>Session Length</label>
                    <div id='session-controls' className='flex gap-2'>
                        <button id='session-decrement' onClick={() => (Decrement("session"))} >DOWN</button>
                        <output id='session-length' className='text-2xl'>{sessionLengthInMinutes}</output>
                        <button id='session-increment' onClick={() => (Increment("session"))} >UP</button>
                    </div>
                </fieldset>
            </section>
            <section id="timer-controls-section" className='my-10 text-2xl flex  gap-7'>
                <button id='start_stop'>{isPaused ? "START" : "STOP"}</button>
                <button id='reset'>RESET</button>
            </section>
            <section id='timer-section' className='my-5 border border-black w-100 h-52 flex justify-evenly items-center flex-col'>
                <h2 id='timer-label' className='text-3xl'>{isSession ? "Session" : "Break"}</h2>
                <h2 id='time-left' className='text-7xl'>
                    {isSession ? `${formatTime(sessionLengthInSeconds)}` : `${(formatTime(breakLenghtInSeconds))}`}
                </h2>
            </section>
        </div>
  )
}
