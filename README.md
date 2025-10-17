# 🔐 From Caesar to SHA — Evolution of Ciphers

An interactive educational React web application demonstrating the evolution of cryptographic techniques from classical ciphers to modern hashing algorithms.

## 🎯 Project Overview

This single-page web application allows users to:
- **Encrypt and decrypt** text using various classical and modern ciphers
- View **step-by-step mathematical explanations** of how each cipher works
- Understand the **security properties** and **historical context** of each method
- Experience the **evolution of cryptography** from ancient times to the modern era

## 🧩 Tech Stack

- **React 19** — UI library
- **Vite** — Lightning-fast build tool
- **Vanilla CSS** — Clean, custom styling (no frameworks)
- **Web Crypto API** — For SHA-256 hashing
- **ES6 Modules** — Modern JavaScript

**No backend required** — runs entirely in the browser!

## 🔐 Implemented Ciphers

### ✅ All 8 Ciphers Fully Working

1. **Caesar Cipher** *(~100 BC)* — Classical substitution cipher with fixed shift
2. **Atbash Cipher** *(Biblical times)* — Reverse alphabet substitution
3. **Vigenère Cipher** *(1553)* — Polyalphabetic cipher with keyword
4. **Playfair Cipher** *(1854)* — Digraph substitution using 5×5 matrix
5. **Hill Cipher** *(1929)* — Matrix-based block cipher using linear algebra
6. **One-Time Pad** *(1882/1917)* — Theoretically unbreakable encryption
7. **XOR Stream Cipher** — Simple XOR encryption with repeating key
8. **SHA-256** *(2001)* — Cryptographic hash function (NSA design)

## 📁 Project Structure

```
/NTC Project
├── index.html              # Entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies & scripts
├── /src
│   ├── main.jsx            # React entry
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   ├── /components         # React components
│   │   ├── InputPanel.jsx
│   │   ├── OutputPanel.jsx
│   │   └── ExplanationPanel.jsx
│   ├── /ciphers            # Cipher implementations
│   │   ├── caesar.js       # ✅ Caesar cipher
│   │   ├── atbash.js       # ✅ Atbash cipher
│   │   ├── vigenere.js     # ✅ Vigenère cipher
│   │   ├── playfair.js     # ✅ Playfair cipher
│   │   ├── hill.js         # ✅ Hill cipher
│   │   ├── otp.js          # ✅ One-Time Pad
│   │   ├── xor.js          # ✅ XOR cipher
│   │   └── hash.js         # ✅ SHA-256 hash
│   └── /utils              # Helper utilities
│       ├── cipherConfig.js
│       └── cipherRunner.js
└── README.md               # This file
```

## 🚀 How to Run

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open in browser:**
   - Vite will display the local URL (usually `http://localhost:5173`)
   - Open that URL in your browser

4. **Build for production (optional):**
```bash
npm run build
npm run preview
```

## 💡 How to Use

1. **Select a cipher** from the dropdown menu
2. **Enter your text** in the input textarea
3. **Enter a key** (if required by the selected cipher)
4. **Choose mode**: Encrypt or Decrypt (when applicable)
5. **Click "Run"** to see the result
6. **View explanation** panel for step-by-step mathematical breakdown
7. **Copy output** using the copy button

## 🧮 Educational Features

Each cipher implementation includes:
- **Clear mathematical formula** showing the algorithm
- **Step-by-step table** demonstrating character-by-character transformation
- **Historical context** about when and where the cipher was invented
- **Security analysis** explaining vulnerabilities and real-world applicability
- **Interactive examples** with detailed explanations

## 🎨 Design Principles

- **Minimal and clean** interface focused on learning
- **Responsive layout** (works on desktop, tablet, and mobile)
- **No external dependencies** — pure React and vanilla CSS
- **Accessible** — semantic HTML and keyboard navigation
- **Educational first** — emphasis on understanding over complexity
- **Professional aesthetics** — modern, clean UI with subtle animations

## 📚 Cipher Details

### Classical Ciphers
- **Caesar** — Simple shift cipher, 25 possible keys, easily broken
- **Atbash** — Self-inverse cipher, no key required
- **Vigenère** — "The indecipherable cipher" (until Kasiski examination)
- **Playfair** — Used in WWI & WWII, encrypts letter pairs

### Modern Ciphers
- **Hill** — First cipher to use linear algebra
- **OTP** — Only provably unbreakable cipher (with proper key management)
- **XOR** — Foundation of many stream ciphers
- **SHA-256** — Used in Bitcoin, TLS, and digital signatures

## 🧪 Testing Examples

Try these examples to verify implementations:

### Caesar (shift 3)
- Input: `HELLO` → Output: `KHOOR`
- Decrypt: `KHOOR` → Output: `HELLO`

### Vigenère (key: "KEY")
- Input: `HELLO` → Output: `RIJVS`
- Decrypt: `RIJVS` → Output: `HELLO`

### SHA-256
- Input: `HELLO` → Output: `18...` (64 hex chars)
- Same input always produces same hash

## 🎓 Learning Outcomes

This project demonstrates:
- **Evolution of cryptography** from simple substitution to modern hashing
- **Mathematical foundations** of encryption algorithms
- **Security properties** and vulnerability analysis
- **Practical implementation** of cryptographic algorithms in JavaScript
- **React component architecture** and state management
- **Clean code practices** with modular design

## 🚀 Deployment

Deploy easily to:
- **Vercel**: `npm run build` then drag-and-drop `dist` folder
- **Netlify**: Connect to GitHub and auto-deploy
- **GitHub Pages**: Build and deploy `dist` folder

## 🤝 Contributing

This is an educational project. Enhancements welcome:
- Add more cipher implementations (RSA, AES, etc.)
- Improve visualizations (animated Caesar wheel, etc.)
- Enhance explanations with interactive diagrams
- Add unit tests for cipher implementations

## 📝 License

This project is for educational purposes. Feel free to use and modify as needed.

## 👨‍💻 Author

Created as a Network Technology and Cybersecurity course project demonstrating the evolution of cryptographic techniques.

---

## 🔒 Security Disclaimer

**⚠️ Important:** This is a demonstration project for educational purposes only. 

**DO NOT use these implementations for real-world security applications.**

For production code:
- Use established cryptographic libraries (e.g., Web Crypto API, libsodium, OpenSSL)
- Follow current security best practices
- Consult with security experts
- Use modern algorithms (AES, ChaCha20, etc.)

Classical ciphers shown here are **historically significant but cryptographically broken**.

---

**Built with ❤️ for learning and teaching cryptography**
