import { useState } from 'react'
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel'
import ExplanationPanel from './components/ExplanationPanel'
import { runCipher } from './utils/cipherRunner'

function App() {
  const [cipher, setCipher] = useState('caesar')
  const [inputText, setInputText] = useState('HELLO WORLD')
  const [keyValue, setKeyValue] = useState('3')
  const [mode, setMode] = useState('encrypt')
  const [output, setOutput] = useState('')
  const [explanation, setExplanation] = useState('')

  const handleRun = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text!')
      return
    }

    try {
      const result = await runCipher(cipher, inputText, keyValue, mode === 'decrypt')
      setOutput(result.output)
      setExplanation(result.explanation)
    } catch (error) {
      alert(`Error: ${error.message}`)
      console.error(error)
    }
  }

  const handleClear = () => {
    setInputText('')
    setOutput('')
    setExplanation('')
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>🔐 From Caesar to SHA</h1>
        <p className="subtitle">Interactive Journey Through Cryptographic Evolution</p>
      </header>

      {/* Main Grid */}
      <main className="grid">
        <InputPanel
          cipher={cipher}
          setCipher={setCipher}
          inputText={inputText}
          setInputText={setInputText}
          keyValue={keyValue}
          setKeyValue={setKeyValue}
          mode={mode}
          setMode={setMode}
          onRun={handleRun}
          onClear={handleClear}
        />
        
        <OutputPanel output={output} />
        
        <ExplanationPanel explanation={explanation} />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p><strong>Implemented Ciphers:</strong> Caesar • Atbash • Vigenère • Playfair • Hill • OTP • XOR • SHA-256</p>
        <p className="credits">Built with React + Vite • No backend • Runs entirely in your browser</p>
      </footer>
    </div>
  )
}

export default App
