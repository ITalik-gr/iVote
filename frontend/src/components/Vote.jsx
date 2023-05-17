import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi";
import { useState, useEffect } from "react";

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
    <li key=${i} className="flex justify-between w-full">Name: ${item[0]} <span>Score: ${item[1]}</span></li>
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

  let candWrap = document.querySelector('.candidates-wrap')



  const handleShowCandidates = async () => {
    const result = await showCandidates();
    candidates = result;
    // console.log(candidates[0][1].toString())
    showMembers();
  };

  
  return (
    <>
      <h3 className="text-xl">Vote here:</h3> 
    <button onClick={async () => {
      await vote({
        onError: (error) => console.error(error.message),
      })
      showMembers();
    }}>


    </button>
      <button onClick={ async () => await 
      vote({
        onError: (error) => console.error(error.message),
      })
      
      } className="rounded-full border-black border-2 px-1 py-1">Vote to</button>

      <input value={voteNumber}
             onChange={(e) => setVoteNumber(e.target.value)} 
             className=" border-solid border-black border-2 ml-2" 
             type="number"/>

      <button onClick={handleShowCandidates}>showCandidates</button>

      <div className="er">ERROR?</div>

      <div className="flex flex-col	justify-center items-center	">
        <h3 className=" text-center text-4xl font-bold">Members</h3>
        <ul className="w-4/5 candidates-wrap">
          <li className="flex justify-between w-full">Name: <span>1</span></li>
          {/* {candidates.map((item, index) => (
            <li key={index}>{item}</li>
          ))} */}
        </ul>
      </div>

    </>
  )
}