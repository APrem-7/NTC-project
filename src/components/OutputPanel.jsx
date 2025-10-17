import { useState } from 'react'

function OutputPanel({ output }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="panel output-panel">
      <h2>Output</h2>
      <textarea 
        className="output-text"
        rows="6" 
        readOnly 
        placeholder="Result will appear here..."
        value={output}
      />
      <button 
        onClick={handleCopy} 
        className="btn btn-secondary btn-copy"
        disabled={!output}
        style={{
          background: copied ? '#27ae60' : '',
          color: copied ? 'white' : ''
        }}
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </button>
    </section>
  )
}

export default OutputPanel
