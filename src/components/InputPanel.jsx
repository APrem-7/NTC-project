import { cipherConfig } from '../utils/cipherConfig'

function InputPanel({ cipher, setCipher, inputText, setInputText, keyValue, setKeyValue, mode, setMode, onRun, onClear }) {
  const config = cipherConfig[cipher]

  return (
    <section className="panel input-panel">
      <h2>Input & Controls</h2>
      
      <label htmlFor="cipher-select">Choose Cipher:</label>
      <select 
        id="cipher-select" 
        value={cipher} 
        onChange={(e) => {
          setCipher(e.target.value)
          setKeyValue(cipherConfig[e.target.value].defaultKey || '')
        }}
      >
        <option value="caesar">Caesar Cipher</option>
        <option value="atbash">Atbash Cipher</option>
        <option value="vigenere">Vigenère Cipher</option>
        <option value="playfair">Playfair Cipher</option>
        <option value="hill">Hill Cipher (2×2)</option>
        <option value="otp">One-Time Pad</option>
        <option value="xor">XOR Stream Cipher</option>
        <option value="sha256">SHA-256 Hash</option>
      </select>

      <label htmlFor="input-text">Enter Your Text:</label>
      <textarea 
        id="input-text" 
        rows="6" 
        placeholder="Type your message here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      {config.needsKey && (
        <div>
          <label htmlFor="key-input">Key:</label>
          <input 
            type="text" 
            id="key-input" 
            placeholder={config.keyPlaceholder}
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
          />
          <small className="key-hint">{config.keyHint}</small>
        </div>
      )}

      <div className="mode-toggle" style={{ opacity: config.supportsDecrypt ? '1' : '0.5', pointerEvents: config.supportsDecrypt ? 'auto' : 'none' }}>
        <label>
          <input 
            type="radio" 
            name="mode" 
            value="encrypt" 
            checked={mode === 'encrypt'}
            onChange={(e) => setMode(e.target.value)}
          />
          Encrypt
        </label>
        <label>
          <input 
            type="radio" 
            name="mode" 
            value="decrypt"
            checked={mode === 'decrypt'}
            onChange={(e) => setMode(e.target.value)}
          />
          Decrypt
        </label>
      </div>

      <div className="button-group">
        <button onClick={onRun} className="btn btn-primary">▶ Run</button>
        <button onClick={onClear} className="btn btn-secondary">Clear</button>
      </div>
    </section>
  )
}

export default InputPanel
