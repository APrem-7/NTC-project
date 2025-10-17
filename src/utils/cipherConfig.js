export const cipherConfig = {
  caesar: {
    needsKey: true,
    keyPlaceholder: 'Enter shift (0-25)',
    keyHint: 'Shift value (0-25)',
    defaultKey: '3',
    supportsDecrypt: true
  },
  // atbash removed
  vigenere: {
    needsKey: true,
    keyPlaceholder: 'Enter keyword (letters only)',
    keyHint: 'Alphabetic key (e.g., "KEY")',
    defaultKey: 'KEY',
    supportsDecrypt: true
  },
  playfair: {
    needsKey: true,
    keyPlaceholder: 'Enter keyword',
    keyHint: 'Alphabetic key for 5×5 grid',
    defaultKey: 'MONARCHY',
    supportsDecrypt: true
  },
  hill: {
    needsKey: true,
    keyPlaceholder: 'Enter 4 numbers (e.g., 6,24,1,13)',
    keyHint: '2×2 matrix as: a,b,c,d',
    defaultKey: '6,24,1,13',
    supportsDecrypt: true
  },
  // otp removed
  // xor removed
  sha256: {
    needsKey: false,
    supportsDecrypt: false
  }
}
