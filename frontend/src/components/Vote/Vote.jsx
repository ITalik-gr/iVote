import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../../constants/abi";
import { useState, useEffect } from "react";
import './vote.scss';
// const { ethers } = require('ethers');

export function Vote() {
  const { account, isWeb3Enabled } = useMoralis()

  const [voteNumber, setVoteNumber] = useState(""); // Стан для збереження введеного числа
  const [newCandidate, setNewCandidate] = useState(""); 
  const [candidates, setCandidates] = useState([]); 

  //? Variables
  const CONTRACT_ADDRESS =  "0xCCD431701e157813a02A40E52297c7042277abFd";
  // FIXME: Треба овнера брати з контракта
  const OWNER = account;
  let voteError = document.querySelector('.vote-error');

  //? Contract Functions
  const { runContractFunction: vote, isFetching: voteIsFetching } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS, // your contract address here
    functionName: "vote",
    params: {
      _index: voteNumber,
    },
    onSuccess: () => {
      // Оновлення інтерфейсу після успішного виконання транзакції
      console.log("Транзакція успішна.");
    },
    onComplete: () => {
      // Виконання дій після завершення транзакції
      console.log("Транзакція завершена.");
    },
  });

  const {runContractFunction: showCandidates} = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS, // your contract address here
    functionName: "showCandidates",
    params: {},
  });

  const {runContractFunction: showLeftTime} = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS, // your contract address here
    functionName: "showLeftTime",
    params: {},
  });

  const {runContractFunction: addCandidate} = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS, // your contract address here
    functionName: "addCandidate",
    params: {
      _name: newCandidate
    },
  });

  const {runContractFunction: owner} = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS, // your contract address here
    functionName: "i_owner",
    params: {},
  });




  //? Functions


// const handleShowCandidates = async () => {
//   const result = await showCandidates();
//   setCandidates(result);
//   console.log(result)
//   showMembers();
// };

  const showMembers = async () => {
    let candWrap = document.querySelector('.vote-list');

    const result = await showCandidates();
    console.log(result)
    setCandidates(result);
    console.log(candidates)
    console.log(candWrap)
    candWrap.innerHTML = candidates.map((item, i) => `
      <li key=${i} class="vote-list__item">
        <div class="vote-list__item__index">Index Score: ${i}</div> 
        <div class="vote-list__item__name">
          Name: ${item[0]} 
        </div> 
        <div class="vote-list__item__score">Score: ${item[1].toString()}</div>
      </li>
  `).join('');
  }


  const leftTime = async () => {
    let result = await showLeftTime();
    // console.log(result.toString())
    const leftTimeBlock = document.querySelector('.vote-left-time__timer');
    leftTimeBlock.innerHTML = `
      ${result}
    `
  } 
  // Add new candidate to list
  const addNewCandidate = async () => {
    await addCandidate();
  }


  

// Deb func
const showOwner = async () => {
  console.log(OWNER);
}

async function updateUI() {
  // Оновлення інтерфейсу
  console.log('Updating...')
  await leftTime();
  await showMembers();
}

  //? Use States, Use Efect

  useEffect(() => {
    if(account !== null) {
      updateUI();
    }
  }, [isWeb3Enabled ,voteIsFetching]);

//! СЛУХАТЬ

  // Підключення до блокчейну Sepolia через Alchemy
  // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/EAVn0eVr4ydxmX4Hn5NLVDgUteRV7wWx');

  // // Створення екземпляра смарт контракту
  // const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

  // // Функція оновлення UI
  // function updateUI(event) {        
  //   // Отримання даних з івенту та оновлення UI
  //   console.log('Event received:', event.args);
  //   // Виконайте необхідні дії для оновлення вашого UI з отриманими даними
  // }

  // // Слухати івенти з смарт контракту
  // contract.on('YourEventName', updateUI);


  return (
  <div className="vote">
    <div className="container mx-auto">
      <h2 className="vote-title">Voting</h2>

      <div className="vote-nav">

        <button className="vote-button"
                onClick={async () => showOwner()}>
          SHOW 
        </button>

        <button className="vote-button vote-button-showCandidate" 
                onClick={async () => await showMembers({
                  onSuccess: console.log("YEEES")
                })}>
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
            onError: (error) => voteError.innerHTML = `${error.message}`,
            onSuccess: async () => await updateUI(),
            onComplete: () => {
              console.log("Транзакція завершена.");
            },
          })} 
            className="vote-button vote-button-vote">
            Vote
        </button>

        <div className="vote-left-time">
          <button className="vote-button vote-left-time-btn"
                  onClick={async () => await leftTime()}>
            Show left time
          </button>
          Left Time: <span className="vote-left-time__timer"></span>m
        </div>

            <div className="vote-add">
              <button className="vote-button"
                      onClick={async () => addNewCandidate({
                        onError: (error) => voteError.innerHTML = `${error}`
                      })}
                      >Add new Candidate</button>
              <input value={newCandidate}
                    placeholder="New Candidate"
                    onChange={(e) => setNewCandidate(e.target.value)} 
                    className="vote-input vote-add" 
                    type="text"
                    id="vote-index"/>
            </div>

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