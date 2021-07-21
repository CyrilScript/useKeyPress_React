import { useState, useEffect } from "react";
// Usage
export default function App() {
  // Call our hook for each key that we'd like to monitor
  const happyPress = useKeyPress("h");
  const sadPress = useKeyPress("s");
  const robotPress = useKeyPress("r");
  const foxPress = useKeyPress("f");
  const leftArrow = useKeyPress("ArrowLeft");
  const rightArrow = useKeyPress("ArrowRight");
  const upArrow = useKeyPress("ArrowUp");
  const downArrow = useKeyPress("ArrowDown");
  return (
    <div>
      <div>h, s, r, f</div>
      <div>
        {happyPress && "😊"}
        {sadPress && "😢"}
        {robotPress && "🤖"}
        {foxPress && "🦊"}
        {leftArrow && "⬅️"}
        {rightArrow && "➡️"}
        {upArrow && "⬆️"}
        {downArrow && "⬇️"}
      </div>
    </div>
  );
}
// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    console.log(key); //To check just any key you just clicked, which you can add as parameter to useKeyPress() in line 5-10

    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
