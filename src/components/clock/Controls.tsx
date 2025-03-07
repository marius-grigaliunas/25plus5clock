
export const Controls = () => {
  return (
    <section id="timer-controls-section" className='my-10 text-2xl flex gap-7'>
    <button id='start_stop' onClick={startPause}>{isPaused ? "START" : "STOP"}</button>
    <button id='reset' onClick={reset}>RESET</button>
    </section>
  )
}
