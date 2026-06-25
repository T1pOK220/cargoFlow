import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

function Test() {
    const countRenders = useRef(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        countRenders.current += 1;
        console.log(countRenders.current)
    },[count])
  return (
      <>
          <p>{count}</p>
          <button onClick={()=>setCount(prev=>prev+1)}>+</button>
    </>
  );
}

export default Test;