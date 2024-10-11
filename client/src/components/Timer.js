import { useState, useEffect } from "react";
//import ReactDOM from "react-dom/client";
//import Question



const Timer = ({ count, setCount, onTimeOut, hasTimeOut, setHasTimedOut,timeRun, setTimeRun }) => {
    const seconds = 5;
    /*const [count, setCount] = useState(seconds); // Initialize with 30
    const [hasTimedOut, setHasTimedOut] = useState(false); // To prevent multiple timeouts*/
    useEffect(() => {
        if (timeRun) {
            if (count > 0) {
                const timer = setTimeout(() => {
                    setCount(count - 1); // Decrease the count by 1
                }, 1000);
    
                // Cleanup function to clear the timeout if component is unmounted
                return () => clearTimeout(timer);
            }
            else if (!hasTimeOut) {
                setHasTimedOut(true); // Ensure this block only runs once
                setTimeRun(false);
                onTimeOut(); // Call the passed-in onTimeOut function
            }
        }
         
  }, [count, setCount, onTimeOut, hasTimeOut,setHasTimedOut,timeRun, setTimeRun]);//[count, onTimeOut, hasTimedOut]); 

  return <h3>{count > 0 ? "Time: " + count : "Time's up!"}</h3>;
}

export default Timer;
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);*/