// Playfair Cipher Implementation

function generatePlayfairGrid(key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I')
  const seen = new Set()
  const grid = []
  
  // Add key letters
  for (let ch of key) {
    if (!seen.has(ch)) {
      seen.add(ch)
      grid.push(ch)
    }
  }
  
  // Add remaining letters
  for (let i = 65; i <= 90; i++) {
    const ch = String.fromCharCode(i)
    if (ch !== 'J' && !seen.has(ch)) {
      grid.push(ch)
    }
  }
  
  // Convert to 5x5 matrix
  const matrix = []
  for (let i = 0; i < 5; i++) {
    matrix.push(grid.slice(i * 5, i * 5 + 5))
  }
  
  return matrix
}

function findPosition(matrix, char) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) {
        return [row, col]
      }
    }
  }
  return null
}

function preparePairs(text) {
  text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I')
  const pairs = []
  
  for (let i = 0; i < text.length; i += 2) {
    let a = text[i]
    let b = i + 1 < text.length ? text[i + 1] : 'X'
    
    // If both letters are the same, insert 'X'
    if (a === b) {
      b = 'X'
      i-- // Re-process the second letter
    }
    
    pairs.push([a, b])
  }
  
  return pairs
}

export function playfair(text, key, decrypt = false) {
  const matrix = generatePlayfairGrid(key)
  const pairs = preparePairs(text)
  let result = ''
  
  for (let [a, b] of pairs) {
    const [row1, col1] = findPosition(matrix, a)
    const [row2, col2] = findPosition(matrix, b)
    
    let newA, newB
    
    if (row1 === row2) {
      // Same row - shift columns
      newA = matrix[row1][(col1 + (decrypt ? 4 : 1)) % 5]
      newB = matrix[row2][(col2 + (decrypt ? 4 : 1)) % 5]
    } else if (col1 === col2) {
      // Same column - shift rows
      newA = matrix[(row1 + (decrypt ? 4 : 1)) % 5][col1]
      newB = matrix[(row2 + (decrypt ? 4 : 1)) % 5][col2]
    } else {
      // Rectangle - swap columns
      newA = matrix[row1][col2]
      newB = matrix[row2][col1]
    }
    
    result += newA + newB
  }
  
  return result
}

export function playfairExplain(text, key, decrypt = false) {
  const matrix = generatePlayfairGrid(key)
  const pairs = preparePairs(text)
  const mode = decrypt ? 'Decryption' : 'Encryption'
  
  let html = `
    <div class="cipher-info">
      <h3>Playfair Cipher — ${mode}</h3>
      <p><strong>Method:</strong> Use a 5×5 matrix based on keyword. Encrypt digraphs (pairs of letters).</p>
      <p><strong>Invented:</strong> 1854 by Charles Wheatstone, promoted by Lord Playfair</p>
      <p><strong>Note:</strong> I and J share the same position</p>
    </div>
  `
  
  // Show 5×5 grid
  html += `
    <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 16px 0; font-family: 'Courier New', monospace; font-size: 0.85rem;">
      <strong>5×5 Grid (Key: "${key.toUpperCase()}"):</strong><br>
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; max-width: 200px; margin-top: 8px;">
        ${matrix.flat().map(ch => `<div style="border: 1px solid #ddd; padding: 8px; text-align: center; background: white;">${ch}</div>`).join('')}
      </div>
    </div>
  `
  
  // Build step table
  html += '<table class="steps-table"><thead><tr><th>Pair</th><th>Positions</th><th>Rule</th><th>Result</th></tr></thead><tbody>'
  
  const limit = Math.min(pairs.length, 8)
  for (let i = 0; i < limit; i++) {
    const [a, b] = pairs[i]
    const [row1, col1] = findPosition(matrix, a)
    const [row2, col2] = findPosition(matrix, b)
    
    let rule, newA, newB
    
    if (row1 === row2) {
      rule = 'Same row → shift right'
      newA = matrix[row1][(col1 + (decrypt ? 4 : 1)) % 5]
      newB = matrix[row2][(col2 + (decrypt ? 4 : 1)) % 5]
    } else if (col1 === col2) {
      rule = 'Same column → shift down'
      newA = matrix[(row1 + (decrypt ? 4 : 1)) % 5][col1]
      newB = matrix[(row2 + (decrypt ? 4 : 1)) % 5][col2]
    } else {
      rule = 'Rectangle → swap columns'
      newA = matrix[row1][col2]
      newB = matrix[row2][col1]
    }
    
    html += `
      <tr>
        <td>${a}${b}</td>
        <td>(${row1},${col1}) (${row2},${col2})</td>
        <td>${rule}</td>
        <td><strong>${newA}${newB}</strong></td>
      </tr>
    `
  }
  
  if (pairs.length > 8) {
    html += '<tr><td colspan="4" style="text-align:center; font-style:italic;">...remaining pairs omitted</td></tr>'
  }
  
  html += '</tbody></table>'
  
  html += `
    <div class="security-note">
      <strong>⚠ Security Note:</strong> Playfair is more secure than simple substitution ciphers 
      as it encrypts digraphs. However, it's still vulnerable to frequency analysis of letter pairs.
      Used by British forces in WWI and WWII.
    </div>
  `
  
  return html
}
