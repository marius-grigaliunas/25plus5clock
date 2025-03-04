import { useEffect, useRef, useState } from 'react'

export default function () {

    const [breakLengthInMinutes, setbreakLengthInMinutes] = useState<number>(5)
    const [breakLenghtInSeconds, setBreakLengthInSeconds] = useState<number>(breakLengthInMinutes * 60)

    const [sessionLengthInMinutes, setSessionLengthInMinutes] = useState<number>(25)
    const [sessionLengthInSeconds, setSessionLengthInSeconds] = useState<number>(sessionLengthInMinutes * 60)
    
    const [isSession, setIsSession] = useState<boolean>(true)
    const [isPaused, setIsPaused] = useState<boolean>(true)

    const audioRef = useRef<HTMLAudioElement>(null)


    const Reset = () => {
        setIsPaused(true)
        setIsSession(true)
        setbreakLengthInMinutes(5)
        setSessionLengthInMinutes(25)
        setBreakLengthInSeconds(5 * 60)
        setSessionLengthInSeconds(25 * 60)
        stopSound()
    }

    const Decrement = (intervalName: string) => {
        if(intervalName === "break") {
            if(breakLengthInMinutes > 1) {
                setbreakLengthInMinutes(breakLengthInMinutes - 1)
                if(isPaused) {
                    setBreakLengthInSeconds((breakLengthInMinutes - 1) * 60)
                }
            }
        } else if (intervalName === "session") {
            if(sessionLengthInMinutes > 1) {
                setSessionLengthInMinutes(sessionLengthInMinutes - 1)
                if(isPaused) {
                    setSessionLengthInSeconds((sessionLengthInMinutes - 1) * 60)
                }
            }
        }

    }

    const Increment = (intervalName: string) => {
        if(intervalName === "break") {
            if(breakLengthInMinutes < 60) {
                setbreakLengthInMinutes(breakLengthInMinutes + 1)
                if(isPaused) {
                    setBreakLengthInSeconds((breakLengthInMinutes + 1) * 60)
                }
            }
        } else if (intervalName === "session") {
            if(sessionLengthInMinutes < 60) {
                setSessionLengthInMinutes(sessionLengthInMinutes + 1)
                if(isPaused) {
                    setSessionLengthInSeconds((sessionLengthInMinutes + 1) * 60)
                }
            }
        }

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

                if(isSession) {
                    setSessionLengthInSeconds((prevTime: number) => {
                        if(prevTime <= 0) {
                            clearInterval(intervalID)
                            setIsSession(false)
                            console.log(`new session value ${sessionLengthInMinutes * 60}`)
                            playSound()
                            return (sessionLengthInMinutes * 60)
                        }
                        return prevTime - 1
                    })
                } else {
                    setBreakLengthInSeconds((prevTime: number) => {
                        if(prevTime <= 0) {
                            clearInterval(intervalID)
                            setIsSession(true)
                            console.log(`new break value ${breakLengthInMinutes * 60}`)
                            playSound()
                            return (breakLengthInMinutes * 60)
                        }
                        return prevTime - 1
                    })
                }

            }, 1000)
        }

        return () => {
            clearInterval(intervalID)
        }
    }, [isPaused, isSession, sessionLengthInSeconds, breakLenghtInSeconds] )

    const StartPause = () => {
        if(isPaused) {
            setIsPaused(false)
        } else {
            setIsPaused(true)
        }
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
            <section id="timer-controls-section" className='my-10 text-2xl flex gap-7'>
                <button id='start_stop' onClick={StartPause}>{isPaused ? "START" : "STOP"}</button>
                <button id='reset' onClick={Reset}>RESET</button>
            </section>
            <section id='timer-section' className='my-5 border border-black w-100 h-52 flex justify-evenly items-center flex-col'>
                <h2 id='timer-label' className='text-3xl'>{isSession ? "Session" : "Break"}</h2>
                <h2 id='time-left' className='text-7xl'>
                    {isSession ? `${formatTime(sessionLengthInSeconds)}`:`${(formatTime(breakLenghtInSeconds))}`}
                </h2>
                <audio 
                    id='beep'
                    ref={audioRef}
                >
                    <source src='/public/beep.mp3' type='audio/mp3'/>
                    Your browser does not support the audio element.
                </audio>
            </section>
        </div>
  )
}
