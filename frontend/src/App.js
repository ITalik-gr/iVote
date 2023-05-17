import { Header } from "./components/Header";
import { Vote } from "./components/Vote";
import { MoralisProvider } from "react-moralis";

function App() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <div className="App">
        <Header /> 
        <Vote />
      </div>
    </MoralisProvider>
          
          
  );
}

export default App;
