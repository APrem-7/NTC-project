// SHA-256 Hash Implementation

export async function sha256Hash(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export function sha256Explain(text, hash) {
  let html = `
    <div class="cipher-info">
      <h3>SHA-256 Cryptographic Hash</h3>
      <p><strong>Type:</strong> One-way hash function (not encryption — no decryption possible)</p>
      <p><strong>Output:</strong> Fixed 256-bit (64 hexadecimal characters) hash</p>
      <p><strong>Properties:</strong></p>
      <ul>
        <li>Deterministic: same input always produces same hash</li>
        <li>Fast to compute</li>
        <li>Infeasible to reverse (pre-image resistance)</li>
        <li>Small input change = completely different hash (avalanche effect)</li>
        <li>Collision resistant: hard to find two inputs with same hash</li>
      </ul>
      <p><strong>Algorithm:</strong> Designed by NSA, published 2001</p>
    </div>
  `
  
  // Show input/output
  html += `
    <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 16px 0; font-family: 'Courier New', monospace; font-size: 0.85rem; word-break: break-all;">
      <strong>Input Text:</strong><br>
      "${text}"<br><br>
      <strong>Input Length:</strong> ${text.length} characters<br><br>
      <strong>SHA-256 Hash:</strong><br>
      <span style="color: #e74c3c; font-weight: bold;">${hash}</span><br><br>
      <strong>Hash Length:</strong> 64 hex chars (256 bits)
    </div>
  `
  
  // Show avalanche effect example
  html += `
    <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 16px 0; font-size: 0.9rem;">
      <strong> Avalanche Effect Demonstration:</strong><br>
      Try changing just one character in your input and hash again — the entire hash will be completely different!
      This property makes hashes excellent for integrity verification and password storage.
    </div>
  `
  
  html += `
    <div class="cipher-info" style="margin-top: 16px;">
      <h3>Common Uses</h3>
      <ul>
        <li><strong>Password Storage:</strong> Store hash instead of plaintext password</li>
        <li><strong>File Integrity:</strong> Verify downloads haven't been tampered with</li>
        <li><strong>Digital Signatures:</strong> Hash message before signing</li>
        <li><strong>Blockchain:</strong> Bitcoin and other cryptocurrencies use SHA-256</li>
        <li><strong>Git:</strong> Version control uses SHA hashes for commits</li>
      </ul>
    </div>
  `
  
  html += `
    <div class="security-note">
      <strong> Security Note:</strong> SHA-256 is currently considered secure. 
      No practical attacks are known. It's part of the SHA-2 family and widely used in TLS, blockchain, and digital signatures.
    </div>
  `
  
  return html
}
