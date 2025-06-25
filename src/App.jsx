import './App.css'
import BoardsList from './components/BoardsList'

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

function App() {


  return (
    <>
      <h1>Inspiration Board</h1>
      <div id="flex-boards-list">
        < BoardsList />
      </div>
    </>
  )
}

export default App
