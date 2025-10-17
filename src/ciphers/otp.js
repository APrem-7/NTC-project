// One-Time Pad Implementation

function generateRandomKey(length) {
  let key = ''
  for (let i = 0; i < length; i++) {
    key += String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }
  return key
}

export function otp(text, key, decrypt = false) {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '')
  
  // Generate random key if not provided
  if (!key || key.length < cleanText.length) {
    key = generateRandomKey(cleanText.length)
  }
  
  key = key.toUpperCase().replace(/[^A-Z]/g, '')
  
  let result = ''
  
  for (let i = 0; i < cleanText.length; i++) {
    const p = cleanText.charCodeAt(i) - 65
    const k = key.charCodeAt(i % key.length) - 65
    
    let c
    if (decrypt) {
      c = (p - k + 26) % 26
    } else {
      c = (p + k) % 26
    }
    
    result += String.fromCharCode(c + 65)
  }
  
  return result + (key.length > 0 ? `\n\n[Key used: ${key.substring(0, cleanText.length)}]` : '')
}

export function otpExplain(text, key, decrypt = false) {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '')
  
  // Generate random key if not provided
  if (!key || key.length < cleanText.length) {
    key = generateRandomKey(cleanText.length)
  }
  
  key = key.toUpperCase().replace(/[^A-Z]/g, '')
  const mode = decrypt ? 'Decryption' : 'Encryption'
  
  let html = `
    <div class="cipher-info">
      <h3>One-Time Pad (OTP) — ${mode}</h3>
      <p><strong>Method:</strong> Add key to plaintext modulo 26 (Vernam cipher with letters).</p>
      <p><strong>Formula:</strong> <span class="formula">C = (P + K) mod 26</span></p>
      <p><strong>Security:</strong> Theoretically unbreakable (Shannon's perfect secrecy)</p>
      <p><strong>Key:</strong> <code>${key.substring(0, Math.min(key.length, 50))}${key.length > 50 ? '...' : ''}</code></p>
    </div>
  `
  
  html += `
    <div style="background: #e8f8f5; padding: 12px; border-radius: 6px; margin: 16px 0; font-size: 0.9rem; border-left: 4px solid #27ae60;">
      <strong>✓ Perfect Secrecy Requirements:</strong><br>
      1. Key must be truly random<br>
      2. Key must be at least as long as plaintext<br>
      3. Key must never be reused<br>
      4. Key must be kept completely secret
    </div>
  `
  
  // Build step table
  html += '<table class="steps-table"><thead><tr><th>Plain</th><th>P-Val</th><th>Key Char</th><th>K-Val</th><th>Operation</th><th>Result</th><th>Cipher</th></tr></thead><tbody>'
  
  const limit = Math.min(cleanText.length, 10)
  for (let i = 0; i < limit; i++) {
    const plainChar = cleanText[i]
    const p = plainChar.charCodeAt(0) - 65
    const keyChar = key[i % key.length]
    const k = keyChar.charCodeAt(0) - 65
    
    let c
    if (decrypt) {
      c = (p - k + 26) % 26
    } else {
      c = (p + k) % 26
    }
    
    const cipherChar = String.fromCharCode(c + 65)
    
    html += `
      <tr>
        <td>${plainChar}</td>
        <td>${p}</td>
        <td>${keyChar}</td>
        <td>${k}</td>
        <td>(${p} ${decrypt ? '-' : '+'} ${k}) mod 26</td>
        <td>${c}</td>
        <td><strong>${cipherChar}</strong></td>
      </tr>
    `
  }
  
  if (cleanText.length > 10) {
    html += '<tr><td colspan="7" style="text-align:center; font-style:italic;">...remaining characters omitted</td></tr>'
  }
  
  html += '</tbody></table>'
  
  html += `
    <div class="security-note">
      <strong>✓ Security Note:</strong> OTP is the ONLY provably unbreakable cipher when used correctly. 
      Used in the Cold War "hotline" and by intelligence agencies. The main challenge is secure key distribution.
    </div>
  `
  
  return html
}
