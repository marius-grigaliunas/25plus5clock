import React, { useState } from 'react'

export default function () {

    const [breakLength, setBreakLength] = useState<number>(5)
    const [sessionLength, setSessionLength] = useState<number>(25)

    return (
        <div className='flex flex-col h-lvh w-lvw justify-center items-center'>
            <header><h1>25 + 5 Clock</h1></header>
            <section className='flex flex-row justify-center items-center gap-10'>
                <fieldset id='break-field'>
                    <label id='break-label'>Break Length</label>
                    <div id='break-controls' className='flex gap-2'>
                        <button id='break-decrement'>DOWN</button>
                        <output id='break-length' className='text-2xl'>{breakLength}</output>
                        <button id='break-increment'>UP</button>
                    </div>
                </fieldset>
                <fieldset id='session-field'>
                    <label id='break-label'>Session Length</label>
                    <div id='session-controls' className='flex gap-2'>
                        <button id='session-decrement'>DOWN</button>
                        <output id='session-length' className='text-2xl'>{sessionLength}</output>
                        <button id='session-increment'>UP</button>
                    </div>
                </fieldset>
            </section>
        </div>
  )
}
