import { Header } from "./components/Header";
import { MoralisProvider } from "react-moralis";

function App() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <div className="App">
        <Header /> 
      </div>
    </MoralisProvider>
          
          
  );
}

export default App;
