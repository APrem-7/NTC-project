// Vigenère Cipher Implementation

export function vigenere(text, key, decrypt = false) {
  // Clean key to only alphabetic characters
  key = key.replace(/[^a-zA-Z]/g, '').toLowerCase()
  
  if (!key) {
    throw new Error('Key must contain at least one letter')
  }
  
  let i = 0 // Key position counter
  
  return [...text].map(ch => {
    if (!/[a-zA-Z]/.test(ch)) return ch
    
    const base = ch === ch.toUpperCase() ? 65 : 97
    const p = ch.charCodeAt(0) - base
    const k = key[i % key.length].charCodeAt(0) - 97
    i++
    
    const shift = decrypt ? (26 - k) % 26 : k
    return String.fromCharCode(base + ((p + shift) % 26))
  }).join('')
}

export function vigenereExplain(text, key, decrypt = false) {
  key = key.replace(/[^a-zA-Z]/g, '').toLowerCase()
  const mode = decrypt ? 'Decryption' : 'Encryption'
  
  let html = `
    <div class="cipher-info">
      <h3>Vigenère Cipher — ${mode}</h3>
      <p><strong>Method:</strong> Use a repeating keyword to shift each letter by varying amounts.</p>
      <p><strong>Formula:</strong> <span class="formula">E(x) = (x + k<sub>i</sub>) mod 26</span></p>
      <p><strong>Key:</strong> <code>${key.toUpperCase()}</code> (repeats as needed)</p>
      <p><strong>Invented:</strong> 1553 by Giovan Battista Bellaso (named after Blaise de Vigenère)</p>
    </div>
  `
  
  // Show key mapping
  const keyValues = [...key].map(ch => ch.charCodeAt(0) - 97)
  html += `
    <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 16px 0; font-family: 'Courier New', monospace; font-size: 0.85rem;">
      <strong>Key Values:</strong><br>
      ${[...key].map((ch, i) => `${ch.toUpperCase()}=${keyValues[i]}`).join(', ')}
    </div>
  `
  
  // Build step table
  html += '<table class="steps-table"><thead><tr><th>Plain</th><th>P-Idx</th><th>Key Char</th><th>K-Val</th><th>Operation</th><th>Result</th><th>Cipher</th></tr></thead><tbody>'
  
  let count = 0
  let keyIdx = 0
  
  for (let ch of text) {
    if (/[a-z]/i.test(ch) && count < 10) {
      const isUpper = ch === ch.toUpperCase()
      const base = isUpper ? 65 : 97
      const plainIdx = ch.charCodeAt(0) - base
      
      const keyChar = key[keyIdx % key.length]
      const keyVal = keyChar.charCodeAt(0) - 97
      const shift = decrypt ? (26 - keyVal) % 26 : keyVal
      
      const cipherIdx = (plainIdx + shift) % 26
      const cipherCh = String.fromCharCode(cipherIdx + base)
      
      html += `
        <tr>
          <td>${ch}</td>
          <td>${plainIdx}</td>
          <td>${keyChar.toUpperCase()}</td>
          <td>${keyVal}</td>
          <td>(${plainIdx}${decrypt ? '-' : '+'}${keyVal}) mod 26</td>
          <td>${cipherIdx}</td>
          <td><strong>${cipherCh}</strong></td>
        </tr>
      `
      
      keyIdx++
      count++
    }
  }
  
  if (count === 10) {
    html += '<tr><td colspan="7" style="text-align:center; font-style:italic;">...remaining characters omitted</td></tr>'
  }
  
  html += '</tbody></table>'
  
  html += `
    <div class="security-note">
      <strong>⚠ Security Note:</strong> Vigenère resisted frequency analysis for centuries ("le chiffre indéchiffrable"). 
      However, it can be broken using Kasiski examination or index of coincidence if key length is discovered.
    </div>
  `
  
  return html
}
