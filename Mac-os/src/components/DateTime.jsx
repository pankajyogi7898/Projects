import React, { useEffect, useState } from 'react'

const DateTime = () => {
    const [dateTimeText, setDateTimeText] = useState('')

    useEffect(() => {
        const formatDateTime = () => {
            const now = new Date()
            const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
            const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

            const weekday = weekdays[now.getDay()]
            const month = months[now.getMonth()]
            const day = now.getDate()

            let hour = now.getHours()
            const minutes = String(now.getMinutes()).padStart(2, '0')
            const seconds = String(now.getSeconds()).padStart(2, '0')
            const ampm = hour >= 12 ? 'PM' : 'AM'
            hour = hour % 12
            if (hour === 0) hour = 12
            const hourText = String(hour).padStart(2, '0')

            return `${weekday}  ${month} ${day} ${hourText}:${minutes}:${seconds} ${ampm}`
        }

        setDateTimeText(formatDateTime())
        const timer = setInterval(() => {
            setDateTimeText(formatDateTime())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return <span>{dateTimeText}</span>
}

export default DateTime

