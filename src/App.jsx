import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [includeNum, setIncludeNum] = useState(false);
  const [includeSpChar, setIncludeSpChar] = useState(false);
  const [password, setPassword] = useState("");


  // this useRef hook is used for referencing where we can pass ref attribute to any of the input fields
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let finalStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (includeNum) finalStr += "0123456789"
    if (includeSpChar) finalStr += "@#$%^&*_-~`|{}[]()"

    let finalPassword = "";

    for (let index = 0; index < length; index++) {
      finalPassword += finalStr.charAt(
        Math.floor((Math.random() * (finalStr.length)) + 1)
      );
    }
    setPassword(finalPassword);
  }, [length, includeNum, includeSpChar, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, includeNum, includeSpChar, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-xl text-orange-500 text-center bg-gray-700 rounded-lg px-4 py-3 mx-auto my-8 shadow-lg">
        <h1 className="text-center my-3 text-2xl">Password Generator</h1>
        <div className="flex shadow-2xl rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full outline-none py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className="bg-blue-600 px-3 text-white outline-none hover:bg-slate-600 focus:bg-slate-800 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={99}
              value={length}
              className="cursor-grab"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="font-bold">Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              id = "numIncluded"
              defaultChecked={includeNum}
              className="cursor-pointer"
              onChange={() => {
                setIncludeNum((prev) => !prev);
              }}

            />
            <lable htmlFor = "numIncluded" className="font-bold">Number</lable>
            <input
              type="checkbox"
              defaultChecked = {includeSpChar}
              className="cursor-pointer"
              id = "spCharInclude"
              onChange={() => {
                setIncludeSpChar((prev) => !prev);
              }}
            />
            <lable htmlFor = "spCharInclude" className="font-bold">Special Character</lable>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
