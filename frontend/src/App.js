import { Header } from "./components/Header/Header";
import { Vote } from "./components/Vote/Vote";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { MoralisProvider } from "react-moralis";

function App() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <div className="App">
        <Header /> 
        <AboutUs />
        <Vote />
      </div>
    </MoralisProvider>
          
          
  );
}

export default App;
