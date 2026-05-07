import type React from "react";
import { ThemeToggle } from "./components/ThemeToggle";

const App:React.FC = () => {
  return (
    <div className=" p-10">
      <h1 className="text-brand-dark font-bold">DineDash Title</h1>
      <button className="bg-brand-main p-2 rounded">
        Click Me
      </button>
      <ThemeToggle/>
      
      {/* You can even use the accent color we added */}
      <span className="text-accent">Special Offer</span>
    </div>
  )
}

export default App;