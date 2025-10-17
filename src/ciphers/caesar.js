// Caesar Cipher Implementation

export function caesar(text, k, decrypt = false) {
  const shift = k % 26
  
  return [...text].map(ch => {
    if (/[a-z]/i.test(ch)) {
      const base = ch === ch.toUpperCase() ? 65 : 97
      const index = ch.charCodeAt(0) - base
      const newIndex = decrypt 
        ? (index - shift + 26) % 26  // Fixed: subtract for decryption
        : (index + shift) % 26
      return String.fromCharCode(newIndex + base)
    }
    return ch
  }).join('')
}

export function caesarExplain(text, k, decrypt = false) {
  const shift = decrypt ? (26 - (k % 26)) % 26 : k % 26
  const mode = decrypt ? 'Decryption' : 'Encryption'
  
  let html = `
    <div class="cipher-info">
      <h3>Caesar Cipher — ${mode}</h3>
      <p><strong>Method:</strong> Shift each letter by ${k} positions ${decrypt ? 'backwards' : 'forwards'} in the alphabet.</p>
      <p><strong>Formula:</strong> <span class="formula">E(x) = (x + ${shift}) mod 26</span></p>
      <p><strong>Invented:</strong> ~100 BC by Julius Caesar</p>
    </div>
  `
  
  // Build step table (limit to first 10 chars for readability)
  html += '<table class="steps-table"><thead><tr><th>Plain</th><th>Index</th><th>Operation</th><th>Result Index</th><th>Cipher</th></tr></thead><tbody>'
  
  let count = 0
  for (let ch of text) {
    if (/[a-z]/i.test(ch) && count < 10) {
      const isUpper = ch === ch.toUpperCase()
      const base = isUpper ? 65 : 97
      const plainIdx = ch.charCodeAt(0) - base
      const cipherIdx = (plainIdx + shift) % 26
      const cipherCh = String.fromCharCode(cipherIdx + base)
      
      html += `
        <tr>
          <td>${ch}</td>
          <td>${plainIdx}</td>
          <td>(${plainIdx} + ${shift}) mod 26</td>
          <td>${cipherIdx}</td>
          <td><strong>${cipherCh}</strong></td>
        </tr>
      `
      count++
    }
  }
  
  if (count === 10) {
    html += '<tr><td colspan="5" style="text-align:center; font-style:italic;">...remaining characters omitted for brevity</td></tr>'
  }
  
  html += '</tbody></table>'
  
  html += `
    <div class="security-note">
      <strong>⚠ Security Note:</strong> Caesar cipher is extremely weak — only 25 possible keys. 
      Easily broken by brute force or frequency analysis.
    </div>
  `
  
  return html
}
