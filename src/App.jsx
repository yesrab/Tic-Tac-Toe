import "./App.css";
import QuoteBox from "./components/QuoteBox";
import GamePage from "./pages/GamePage";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className='container'>
      <QuoteBox />
      <GamePage />
      <Toaster />
    </div>
  );
}

export default App;
