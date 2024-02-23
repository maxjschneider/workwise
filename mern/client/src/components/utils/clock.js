import { useEffect, useState } from 'react'

export default function Clock() {
  const [time, setTime] = useState()

  const updateTime = () => {
    const dateObject = new Date()
  
    const hour = (dateObject.getHours() + 24) % 12 || 12
    const minute = dateObject.getMinutes()
    const second = dateObject.getSeconds()
  
    const currentTime = hour + ' : ' + minute + ' : ' + second
    
    setTime(currentTime);
  }

  useEffect(() => {
    updateTime();

    setInterval(() => {
      updateTime();
    }, 1000)

  }, [])

  return <>{ time }</>
}