
interface IntervalOptionProps {
    intervalType: string
    breakLength: number

}

export const IntervalOption = ({intervalType, breakLength,} : IntervalOptionProps) => {
  
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
  
    return (
        <fieldset id={`${intervalType}-field`} >
            <label id={`${intervalType}-label`}>{intervalType} Length</label>
            <div id={`${intervalType}-controls`} className='flex gap-2'>
                <button id={`${intervalType}-decrement`} onClick={() => (adjustInterval("break", -1))} >DOWN</button>
                <output id={`${intervalType}-length`} className='text-2xl'>{breakLength}</output>
                <button id={`${intervalType}-increment`} onClick={() => (adjustInterval("break", +1))} >UP</button>
            </div>
        </fieldset>
    )
}
