// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


error Voting_is_over();
error You_have_already_voted();

contract Voting {

    event Voting__endVoting(uint endVoting);

    modifier onlyOwner {
        require(msg.sender == i_owner);
        _;
    }

    struct Candidate {
        string name;
        uint vote;
    }

    address public immutable i_owner;
    mapping (address => bool) voters;
    Candidate[] public candidates;
    uint public startVoting;
    uint public endVoting;

    constructor(string[] memory _candidateName, uint _votingTime) {
        require(_candidateName.length > 1, "2 or more candidates are required");
        startVoting = block.timestamp;
        endVoting = block.timestamp + (_votingTime * 1 minutes);
        i_owner = msg.sender;

        for(uint i = 0; i < _candidateName.length; i++) {
            candidates.push(Candidate({
                name: _candidateName[i],
                vote: 0
            }));    
        }
        emit Voting__endVoting(endVoting / 60);
    }

    function vote(uint _index) public {
        if(block.timestamp >= endVoting) {
            revert Voting_is_over();
        }
        if(voters[msg.sender] == true) {
            revert You_have_already_voted();
        }
        voters[msg.sender] = true;
        candidates[_index].vote++;
    }

    function addCandidate(string memory _name) public onlyOwner {
        if(block.timestamp >= endVoting) {
            revert Voting_is_over();
        }
        candidates.push(Candidate({
            name: _name,
            vote: 0
        }));
    }

    function showCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function showLeftTime() public view returns(uint) {
        return (endVoting - block.timestamp) / 60;
    }
}