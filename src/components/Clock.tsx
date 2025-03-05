import { useEffect, useRef, useState } from 'react'

type IntervalType = "break" | "session"

export default function () {

    const [breakLengthInMinutes, setbreakLengthInMinutes] = useState<number>(5)
    const [sessionLengthInMinutes, setSessionLengthInMinutes] = useState<number>(25)

    const [currentTime, setCurrentTime] = useState<number>(sessionLengthInMinutes * 60)

    const [isSession, setIsSession] = useState<boolean>(true)
    const [isPaused, setIsPaused] = useState<boolean>(true)

    const audioRef = useRef<HTMLAudioElement>(null)


    const reset = () => {
        setIsPaused(true)
        setIsSession(true)
        setbreakLengthInMinutes(5)
        setSessionLengthInMinutes(25)
        setCurrentTime(25*60)
        stopSound()  
    }

    const adjustInterval = (intervalType: IntervalType, amount: number) => {
        const isBreak = intervalType === "break"
        const currentLength = isBreak ? breakLengthInMinutes : sessionLengthInMinutes
        const setLength = isBreak ? setbreakLengthInMinutes : setSessionLengthInMinutes

        if(currentLength + amount >= 1 && currentLength + amount <= 60) {
            setLength(currentLength + amount)

            if(isPaused && isBreak && !isSession)
                adjustCurrentTime(amount * 60)
            else if (isPaused && !isBreak && isSession)
                adjustCurrentTime(amount*60)

        }
    }

    const adjustCurrentTime = (amount: number) => {
        setCurrentTime((prevTime: number) => prevTime + amount)
    }


    const formatTime = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 60)
        const remainingSeconds = timeInSeconds % 60

        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    useEffect(() => {
        let intervalID : number

        if(!isPaused) {
            intervalID = setInterval(() => {
                setCurrentTime((prevTime: number) => {
                    if(prevTime <= 0) {
                        clearInterval(intervalID)
                        playSound()

                        if(isSession) {
                            setIsSession(false)
                            return (breakLengthInMinutes * 60)
                        } else {
                            setIsSession(true)
                            return (sessionLengthInMinutes * 60)
                        }

                    }
                    return prevTime - 1
                })
            }, 1000)
        }

        return () => {
            clearInterval(intervalID)
        }
    }, [isPaused, isSession, breakLengthInMinutes, sessionLengthInMinutes] )

    const startPause = () => {
        setIsPaused(prevState => !prevState)
    }

    const playSound = () => {
        if(audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            console.log('play')
            audioRef.current.play()
        }
    }

    const stopSound = () => {
        if(audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
    }

    return (
        <div className='flex flex-col h-lvh w-lvw justify-center items-center'>
            <header><h1>25 + 5 Clock</h1></header>
            <section className='flex flex-row justify-center items-center gap-10'>
                <fieldset id='break-field'>
                    <label id='break-label'>Break Length</label>
                    <div id='break-controls' className='flex gap-2'>
                        <button id='break-decrement' onClick={() => (adjustInterval("break", -1))} >DOWN</button>
                        <output id="break-length" className='text-2xl'>{breakLengthInMinutes}</output>
                        <button id='break-increment' onClick={() => (adjustInterval("break", +1))} >UP</button>
                    </div>
                </fieldset>
                <fieldset id='session-field'>
                    <label id='session-label'>Session Length</label>
                    <div id='session-controls' className='flex gap-2'>
                        <button id='session-decrement' onClick={() => (adjustInterval("session", -1))} >DOWN</button>
                        <output id='session-length' className='text-2xl'>{sessionLengthInMinutes}</output>
                        <button id='session-increment' onClick={() => (adjustInterval("session", +1))} >UP</button>
                    </div>
                </fieldset>
            </section>
            <section id="timer-controls-section" className='my-10 text-2xl flex gap-7'>
                <button id='start_stop' onClick={startPause}>{isPaused ? "START" : "STOP"}</button>
                <button id='reset' onClick={reset}>RESET</button>
            </section>
            <section id='timer-section' className='my-5 border border-black w-100 h-52 flex justify-evenly items-center flex-col'>
                <h2 id='timer-label' className='text-3xl'>{isSession ? "Session" : "Break"}</h2>
                <h2 id='time-left' className='text-7xl'>
                    {formatTime(currentTime)}
                </h2>
                <audio 
                    id='beep'
                    ref={audioRef}
                >
                    <source src='/public/beep.mp3' type='audio/mp3'/>
                    When the timer ends, you are supposed to hear a beep, but your browser does not support the audio element.
                </audio>
            </section>
        </div>
  )
}
