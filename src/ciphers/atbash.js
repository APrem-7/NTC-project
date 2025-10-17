// Atbash Cipher Implementation

export function atbash(text) {
  return [...text].map(ch => {
    if (/[a-z]/.test(ch)) {
      return String.fromCharCode(122 - (ch.charCodeAt(0) - 97))
    }
    if (/[A-Z]/.test(ch)) {
      return String.fromCharCode(90 - (ch.charCodeAt(0) - 65))
    }
    return ch
  }).join('')
}

export function atbashExplain(text) {
  let html = `
    <div class="cipher-info">
      <h3>Atbash Cipher</h3>
      <p><strong>Method:</strong> Reverse the alphabet — A↔Z, B↔Y, C↔X, etc.</p>
      <p><strong>Formula:</strong> <span class="formula">E(x) = 25 - x</span></p>
      <p><strong>Origin:</strong> Ancient Hebrew cipher (biblical times)</p>
      <p><strong>Property:</strong> Atbash is its own inverse (applying twice gives original text)</p>
    </div>
  `
  
  // Show alphabet mapping
  html += `
    <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 16px 0; font-family: 'Courier New', monospace; font-size: 0.85rem;">
      <strong>Alphabet Mapping:</strong><br>
      Plain:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br>
      Cipher: Z Y X W V U T S R Q P O N M L K J I H G F E D C B A
    </div>
  `
  
  // Build step table
  html += '<table class="steps-table"><thead><tr><th>Plain</th><th>Index</th><th>Operation</th><th>Result Index</th><th>Cipher</th></tr></thead><tbody>'
  
  let count = 0
  for (let ch of text) {
    if (/[a-z]/i.test(ch) && count < 10) {
      const isUpper = ch === ch.toUpperCase()
      const base = isUpper ? 65 : 97
      const plainIdx = ch.charCodeAt(0) - base
      const cipherIdx = 25 - plainIdx
      const cipherCh = String.fromCharCode(cipherIdx + base)
      
      html += `
        <tr>
          <td>${ch}</td>
          <td>${plainIdx}</td>
          <td>25 - ${plainIdx}</td>
          <td>${cipherIdx}</td>
          <td><strong>${cipherCh}</strong></td>
        </tr>
      `
      count++
    }
  }
  
  if (count === 10) {
    html += '<tr><td colspan="5" style="text-align:center; font-style:italic;">...remaining characters omitted</td></tr>'
  }
  
  html += '</tbody></table>'
  
  html += `
    <div class="security-note">
      <strong>⚠ Security Note:</strong> Atbash is a monoalphabetic substitution cipher, 
      vulnerable to frequency analysis. No key means no security beyond obscurity.
    </div>
  `
  
  return html
}
