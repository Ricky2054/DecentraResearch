// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ResearchDAO is Ownable {
    IERC20 public governanceToken;
    
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        string ipfsHash; // For detailed proposal
        uint256 forVotes;
        uint256 againstVotes;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        mapping(address => bool) hasVoted;
    }
    
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    
    // Minimum tokens required to create a proposal
    uint256 public proposalThreshold = 100 * 10**18; // 100 tokens
    
    // Voting period in seconds
    uint256 public votingPeriod = 3 days;
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);
    
    constructor(address _governanceToken) {
        governanceToken = IERC20(_governanceToken);
    }
    
    function createProposal(string memory description, string memory ipfsHash) public returns (uint256) {
        require(governanceToken.balanceOf(msg.sender) >= proposalThreshold, "Not enough tokens to create proposal");
        
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        proposal.proposer = msg.sender;
        proposal.description = description;
        proposal.ipfsHash = ipfsHash;
        proposal.startTime = block.timestamp;
        proposal.endTime = block.timestamp + votingPeriod;
        
        emit ProposalCreated(proposalCount, msg.sender, description);
        
        return proposalCount;
    }
    
    function castVote(uint256 proposalId, bool support) public {
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        uint256 votes = governanceToken.balanceOf(msg.sender);
        require(votes > 0, "No voting power");
        
        proposal.hasVoted[msg.sender] = true;
        
        if (support) {
            proposal.forVotes += votes;
        } else {
            proposal.againstVotes += votes;
        }
        
        emit VoteCast(proposalId, msg.sender, support, votes);
    }
    
    function executeProposal(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Proposal already executed");
        require(proposal.forVotes > proposal.againstVotes, "Proposal not passed");
        
        proposal.executed = true;
        
        // In a real implementation, you would add execution logic here
        // For example, calling a function on another contract
        
        emit ProposalExecuted(proposalId);
    }
    
    function setProposalThreshold(uint256 _proposalThreshold) public onlyOwner {
        proposalThreshold = _proposalThreshold;
    }
    
    function setVotingPeriod(uint256 _votingPeriod) public onlyOwner {
        votingPeriod = _votingPeriod;
    }
}