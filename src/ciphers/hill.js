// Hill Cipher Implementation (2×2 matrix)

function modInverse(a, m) {
  a = ((a % m) + m) % m
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x
  }
  return null
}

function determinant2x2(matrix) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
}

function inverse2x2(matrix) {
  const det = determinant2x2(matrix)
  const detInv = modInverse(((det % 26) + 26) % 26, 26)
  
  if (detInv === null) {
    throw new Error('Matrix is not invertible modulo 26')
  }
  
  return [
    [(matrix[1][1] * detInv) % 26, (-matrix[0][1] * detInv + 26 * 26) % 26],
    [(-matrix[1][0] * detInv + 26 * 26) % 26, (matrix[0][0] * detInv) % 26]
  ]
}

function parseMatrix(keyString) {
  const nums = keyString.split(',').map(n => parseInt(n.trim()))
  if (nums.length !== 4 || nums.some(isNaN)) {
    throw new Error('Key must be 4 numbers separated by commas (e.g., 6,24,1,13)')
  }
  return [[nums[0], nums[1]], [nums[2], nums[3]]]
}

export function hill(text, key, decrypt = false) {
  let matrix = parseMatrix(key)
  
  if (decrypt) {
    matrix = inverse2x2(matrix)
  }
  
  // Prepare text (only letters, uppercase)
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '')
  
  // Pad if odd length
  const workText = cleanText.length % 2 === 0 ? cleanText : cleanText + 'X'
  
  let result = ''
  
  for (let i = 0; i < workText.length; i += 2) {
    const p1 = workText.charCodeAt(i) - 65
    const p2 = workText.charCodeAt(i + 1) - 65
    
    const c1 = (matrix[0][0] * p1 + matrix[0][1] * p2) % 26
    const c2 = (matrix[1][0] * p1 + matrix[1][1] * p2) % 26
    
    result += String.fromCharCode(c1 + 65) + String.fromCharCode(c2 + 65)
  }
  
  return result
}

export function hillExplain(text, key, decrypt = false) {
  const originalMatrix = parseMatrix(key)
  const matrix = decrypt ? inverse2x2(originalMatrix) : originalMatrix
  const mode = decrypt ? 'Decryption' : 'Encryption'
  
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '')
  const workText = cleanText.length % 2 === 0 ? cleanText : cleanText + 'X'
  
  let html = `
    <div class="cipher-info">
      <h3>Hill Cipher (2×2 Matrix) — ${mode}</h3>
      <p><strong>Method:</strong> Use matrix multiplication mod 26 to encrypt blocks of letters.</p>
      <p><strong>Formula:</strong> <span class="formula">C = K × P (mod 26)</span></p>
      <p><strong>Invented:</strong> 1929 by Lester S. Hill</p>
    </div>
  `
  
  // Show matrix
  html += `
    <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 16px 0; font-family: 'Courier New', monospace; font-size: 0.85rem;">
      <strong>${decrypt ? 'Inverse ' : ''}Key Matrix:</strong><br>
      <div style="margin-top: 8px;">
        [ ${matrix[0][0]}  ${matrix[0][1]} ]<br>
        [ ${matrix[1][0]}  ${matrix[1][1]} ]
      </div>
    </div>
  `
  
  // Build step table
  html += '<table class="steps-table"><thead><tr><th>Block</th><th>Vector</th><th>Matrix Multiplication</th><th>Result</th><th>Cipher</th></tr></thead><tbody>'
  
  const limit = Math.min(workText.length / 2, 6)
  for (let i = 0; i < limit; i++) {
    const idx = i * 2
    const p1 = workText.charCodeAt(idx) - 65
    const p2 = workText.charCodeAt(idx + 1) - 65
    
    const c1 = (matrix[0][0] * p1 + matrix[0][1] * p2) % 26
    const c2 = (matrix[1][0] * p1 + matrix[1][1] * p2) % 26
    
    html += `
      <tr>
        <td>${workText[idx]}${workText[idx + 1]}</td>
        <td>[${p1}, ${p2}]</td>
        <td>[${matrix[0][0]}×${p1}+${matrix[0][1]}×${p2}, ${matrix[1][0]}×${p1}+${matrix[1][1]}×${p2}]</td>
        <td>[${c1}, ${c2}]</td>
        <td><strong>${String.fromCharCode(c1 + 65)}${String.fromCharCode(c2 + 65)}</strong></td>
      </tr>
    `
  }
  
  if (workText.length / 2 > 6) {
    html += '<tr><td colspan="5" style="text-align:center; font-style:italic;">...remaining blocks omitted</td></tr>'
  }
  
  html += '</tbody></table>'
  
  html += `
    <div class="security-note">
      <strong>⚠ Security Note:</strong> Hill cipher is resistant to frequency analysis 
      but vulnerable to known-plaintext attacks. The key matrix must be invertible modulo 26.
    </div>
  `
  
  return html
}
