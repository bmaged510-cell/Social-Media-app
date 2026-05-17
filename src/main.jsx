import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from 'next-themes' // ✅ أضفنا ThemeProvider

createRoot(document.getElementById('root')).render(
  <ThemeProvider attribute="class" defaultTheme="light"> {/* ✅ */}
    <App />
  </ThemeProvider>
)