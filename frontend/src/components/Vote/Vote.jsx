import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../../constants/abi";
import { useState, useEffect } from "react";
import './vote.scss';

export function Vote() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const { enableWeb3, isWeb3Enabled } = useMoralis();
  const CONTRACT_ADDRESS =  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  const showMembers = () => {
    candWrap.innerHTML = candidates.map((item, i) => `
    <li key=${i} class="vote-list__item">
      <div class="vote-list__item__index">Index Score: ${i}</div> 
      <div class="vote-list__item__name">
        Name: ${item[0]} 
      </div> 
      <div class="vote-list__item__score">Score: ${item[1]}</div>
    </li>
  `).join('');
  }
  const [voteNumber, setVoteNumber] = useState(""); // Стан для збереження введеного числа
  // const [candidates, setCandidates] = useState([]);

  const { data, error, runContractFunction: vote, isFetching, isLoading } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS, // your contract address here
    functionName: "vote",
    params: {
      _index: voteNumber,
    },
  });

  const {runContractFunction: showCandidates} = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS, // your contract address here
    functionName: "showCandidates",
    params: {},
  });
  let candidates = [];

  let candWrap = document.querySelector('.vote-list')



  const handleShowCandidates = async () => {
    const result = await showCandidates();
    candidates = result;
    console.log(candidates)
    showMembers();
  };

  
  return (
  <div className="vote">
    <div className="container mx-auto">
      <h2 className="vote-title">Voting</h2>

      <div className="vote-nav">

        <button className="vote-button vote-button-showCandidate" 
                onClick={handleShowCandidates}>
          Show all available candidates
        </button>


        <label className="vote-index__wrap" htmlFor="vote-index">
          <span>Enter your candidate's postal code here:</span>
          <input value={voteNumber}
              placeholder="Enter the index"
              onChange={(e) => setVoteNumber(e.target.value)} 
              className="vote-input vote-index" 
              type="number"
              id="vote-index"/>
        </label>

        <button onClick={ async () => await 
          vote({
            onError: (error) => console.error(error.message),
          })} 
            className="vote-button vote-button-vote">
            Vote
        </button>
          


        <div className="vote-error"></div>
      </div>

        <div className="vote-body">
          <h3 className="vote-body__title">Members</h3>

          <ul className="vote-list">
          <li key="" className="vote-list__item">
            <div className="vote-list__item__index">Index Score: 1</div> 
            <div className="vote-list__item__name">
              Name: IIIIIIIIIIIasdsad
            </div> 
            <div className="vote-list__item__score">Score: 00</div>
          </li>
          </ul>
        </div>


      </div>
    </div>

  )
}