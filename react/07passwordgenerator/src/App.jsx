import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(10);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook to reference the password input field for selection
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    if (isNumberAllowed) str += "0123456789";
    if (isCharacterAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    for (let i = 1; i <= length; i++) {
      // FIX: Removed the '+ 1' to avoid index out of bounds
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isNumberAllowed, isCharacterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    // Select the text visually for better UX
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999); // For mobile compatibility
    
    // Copy to clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // FIX: Added useEffect to call the generator when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharacterAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-xl my-8 text-orange-400 bg-gray-700 px-4 py-3'>
        <h1 className="text-3xl text-center text-white my-3">Password Generator</h1>
        
        <div className='flex rounded-xl shadow-md overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password} 
            className="w-full text-gray-700 px-4 py-2 focus:outline-none bg-white" 
            placeholder='Password'
            readOnly // FIX: Made the input read-only
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            className='bg-blue-700 text-white px-3 py-0.5 shrink-0 outline-none hover:bg-blue-800 transition-colors'
          >
            copy
          </button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range" 
              min={6} 
              max={100} 
              value={length} 
              onChange={(e) => setLength(e.target.value)} 
              className="cursor-pointer"
            />
            <label className="text-white">Length: {length}</label>
          </div>
          
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={isNumberAllowed} 
              id="numberInput" 
              onChange={() => setIsNumberAllowed((prev) => !prev)}
              className="cursor-pointer" 
            />
            <label htmlFor="numberInput" className="text-white cursor-pointer">Numbers</label>
          </div>
          
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={isCharacterAllowed} 
              id="characterInput" 
              onChange={() => setIsCharacterAllowed((prev) => !prev)}
              className="cursor-pointer" 
            />
            <label htmlFor="characterInput" className="text-white cursor-pointer">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App