
export const IntervalOption = () => {
  return (
        <section className='flex flex-row justify-center items-center gap-10'>
            <fieldset id='break-field'>
                <label id='break-label'>Break Length</label>
                <div id='break-controls' className='flex gap-2'>
                    <button id='break-decrement' onClick={() => (adjustInterval("break", -1))} >DOWN</button>
                    <output id="break-length" className='text-2xl'>{breakLengthInMinutes}</output>
                    <button id='break-increment' onClick={() => (adjustInterval("break", +1))} >UP</button>
                </div>
            </fieldset>
        </section>
    )
}
