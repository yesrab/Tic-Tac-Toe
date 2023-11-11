import "./App.css";
import QuoteBox from "./components/QuoteBox";
import GamePage from "./pages/GamePage";
import Toast from "./components/Toast";
import { useToast } from "./lib/useToast";

function App() {
  const [showtoast, setTrigger, toastText, setToastText] = useToast();

  return (
    <div className='container'>
      <QuoteBox />
      <GamePage setToastText={setToastText} setTrigger={setTrigger} />
      {showtoast ? <Toast toastText={toastText} /> : ""}
    </div>
  );
}

export default App;
