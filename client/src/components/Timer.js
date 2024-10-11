import { useEffect } from "react";

/*  count - number of seconds
    setCount - update the number of seconds
    onTimeOut - a function we need to call when the time is up
    hasTimeOut - true when 0 seconds are left, otherwise false
    setHasTimeOut - changes the timeout to true or false 
    timeRun - the user still thinking of the answer and there is still time to think
    setTimeRun - stop the timer, an answer was chosen   */
const Timer = ({ count, setCount, onTimeOut, hasTimeOut, setHasTimedOut, timeRun, setTimeRun }) => {
    
    useEffect(() => {
        if (timeRun) {
            if (count > 0) { 
                const timer = setTimeout(() => {
                    setCount(count - 1); // Decrease the count by 1
                }, 1000);  //every one second
    
                // Cleanup function to clear the timeout if component is unmounted
                return () => clearTimeout(timer);
            }
            else  // count == 0
                if (!hasTimeOut) {  
                setHasTimedOut(true); // Ensure this block only runs once
                setTimeRun(false);
                onTimeOut(); // Call the passed-in onTimeOut function
            }
        }
         
  }, [count, setCount, onTimeOut, hasTimeOut, setHasTimedOut, timeRun, setTimeRun]);

  return <h3>{count > 0 ? "Time: " + count : "Time's up!"}</h3>;
}

export default Timer;
