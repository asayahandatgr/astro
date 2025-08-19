import './App.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LoadingGate from './components/LoadingGate.jsx'
import RetroBackground from './components/RetroBackground.jsx'
import GlobalSoundtrack from './components/GlobalSoundtrack.jsx'

function App() {

  return (
    <>
      <GlobalSoundtrack />
      <RetroBackground>
      <LoadingGate>
        <Navbar />
        <Hero />
      </LoadingGate>
      </RetroBackground>
    </>
  )
}

export default App
