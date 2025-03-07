
export const Timer = () => {
  return (
    <section id='timer-section' className='my-5 border border-black w-100 h-52 flex justify-evenly items-center flex-col'>
    <h2 id='timer-label' className='text-3xl'>{isSession ? "Session" : "Break"}</h2>
    <h2 id='time-left' className='text-7xl'>
        {formatTime(currentTime)}
    </h2>
    <audio 
        id='beep'
        ref={audioRef}
    >
        <source src='beep.mp3' type='audio/mp3'/>
        When the timer ends, you are supposed to hear a beep, but your browser does not support the audio element.
    </audio>
</section>
  )
}
