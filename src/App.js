import { EssentialProvider } from "./Assets/EssentialContext";
import Home from "./Components/Home/Home";

function App() {
  return (
    <EssentialProvider>
     <Home/>
    </EssentialProvider>
  );
}

export default App;
