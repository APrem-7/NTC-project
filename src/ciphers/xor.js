// XOR Stream Cipher Implementation

export function xorCipher(text, key) {
  if (!key) {
    throw new Error('XOR cipher requires a key')
  }
  
  const result = []
  for (let i = 0; i < text.length; i++) {
    const textCode = text.charCodeAt(i)
    const keyCode = key.charCodeAt(i % key.length)
    result.push(String.fromCharCode(textCode ^ keyCode))
  }
  return result.join('')
}

export function xorExplain(text, key) {
  let html = `
    <div class="cipher-info">
      <h3>XOR Stream Cipher</h3>
      <p><strong>Method:</strong> XOR each byte of plaintext with repeating key bytes.</p>
      <p><strong>Formula:</strong> <span class="formula">C = P ⊕ K</span> (where ⊕ is XOR)</p>
      <p><strong>Key:</strong> <code>${key}</code> (length: ${key.length})</p>
      <p><strong>Property:</strong> XOR is its own inverse: P ⊕ K ⊕ K = P</p>
    </div>
  `
  
  // XOR truth table reminder
  html += `
    <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 16px 0; font-family: 'Courier New', monospace; font-size: 0.85rem;">
      <strong>XOR Truth Table:</strong><br>
      0 ⊕ 0 = 0 | 0 ⊕ 1 = 1 | 1 ⊕ 0 = 1 | 1 ⊕ 1 = 0
    </div>
  `
  
  // Build step table (show first 8 characters)
  html += '<table class="steps-table"><thead><tr><th>Char</th><th>ASCII</th><th>Binary</th><th>Key Char</th><th>Key ASCII</th><th>Key Binary</th><th>XOR Result</th><th>Result Char</th></tr></thead><tbody>'
  
  const limit = Math.min(text.length, 8)
  for (let i = 0; i < limit; i++) {
    const textChar = text[i]
    const textCode = text.charCodeAt(i)
    const textBinary = textCode.toString(2).padStart(8, '0')
    
    const keyChar = key[i % key.length]
    const keyCode = keyChar.charCodeAt(0)
    const keyBinary = keyCode.toString(2).padStart(8, '0')
    
    const resultCode = textCode ^ keyCode
    const resultBinary = resultCode.toString(2).padStart(8, '0')
    const resultChar = String.fromCharCode(resultCode)
    const displayChar = resultCode >= 32 && resultCode < 127 ? resultChar : `[${resultCode}]`
    
    html += `
      <tr>
        <td>${textChar}</td>
        <td>${textCode}</td>
        <td>${textBinary}</td>
        <td>${keyChar}</td>
        <td>${keyCode}</td>
        <td>${keyBinary}</td>
        <td>${resultBinary}</td>
        <td><strong>${displayChar}</strong></td>
      </tr>
    `
  }
  
  if (text.length > 8) {
    html += '<tr><td colspan="8" style="text-align:center; font-style:italic;">...remaining characters omitted</td></tr>'
  }
  
  html += '</tbody></table>'
  
  html += `
    <div class="security-note">
      <strong>⚠ Security Note:</strong> Simple XOR with repeating key is vulnerable to known-plaintext attacks 
      and frequency analysis. Real stream ciphers use more complex key stream generation (e.g., ChaCha20, AES-CTR).
    </div>
  `
  
  return html
}
