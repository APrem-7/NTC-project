import { caesar, caesarExplain } from '../ciphers/caesar'
import { atbash, atbashExplain } from '../ciphers/atbash'
import { vigenere, vigenereExplain } from '../ciphers/vigenere'
import { playfair, playfairExplain } from '../ciphers/playfair'
import { hill, hillExplain } from '../ciphers/hill'
import { otp, otpExplain } from '../ciphers/otp'
import { xorCipher, xorExplain } from '../ciphers/xor'
import { sha256Hash, sha256Explain } from '../ciphers/hash'

export async function runCipher(cipher, text, key, isDecrypt) {
  let output = ''
  let explanation = ''

  switch(cipher) {
    case 'caesar':
      const shift = parseInt(key) || 0
      output = caesar(text, shift, isDecrypt)
      explanation = caesarExplain(text, shift, isDecrypt)
      break
      
    case 'atbash':
      output = atbash(text)
      explanation = atbashExplain(text)
      break
      
    case 'vigenere':
      if (!key.trim()) {
        throw new Error('Please enter a key!')
      }
      output = vigenere(text, key, isDecrypt)
      explanation = vigenereExplain(text, key, isDecrypt)
      break
      
    case 'playfair':
      if (!key.trim()) {
        throw new Error('Please enter a key!')
      }
      output = playfair(text, key, isDecrypt)
      explanation = playfairExplain(text, key, isDecrypt)
      break
      
    case 'hill':
      if (!key.trim()) {
        throw new Error('Please enter a matrix key!')
      }
      output = hill(text, key, isDecrypt)
      explanation = hillExplain(text, key, isDecrypt)
      break
      
    case 'otp':
      output = otp(text, key, isDecrypt)
      explanation = otpExplain(text, key, isDecrypt)
      break
      
    case 'xor':
      if (!key.trim()) {
        throw new Error('Please enter a key!')
      }
      output = xorCipher(text, key)
      explanation = xorExplain(text, key)
      break
      
    case 'sha256':
      output = await sha256Hash(text)
      explanation = sha256Explain(text, output)
      break
      
    default:
      throw new Error('Unknown cipher')
  }

  return { output, explanation }
}
