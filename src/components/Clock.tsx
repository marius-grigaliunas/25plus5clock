import React, { useState } from 'react'

export default function () {

    const [breakLength, setBreakLength] = useState<number>(5)

    return (
        <div className='flex flex-col h-lvh w-lvw justify-center items-center'>
            <header><h1>25 + 5 Clock</h1></header>
            <section>
                <fieldset id='break-field'>
                    <label id='break-label'>Break Length</label>
                    <div id='break-controls' className='flex gap-2'>
                        <button id='break-decrement'>DOWN</button>
                        <output id='break-length' className='text-2xl'>{breakLength}</output>
                        <button id='break-increment'>UP</button>
                    </div>
                </fieldset>
                <fieldset id='session-section'>
        
                </fieldset>
            </section>
        </div>
  )
}
