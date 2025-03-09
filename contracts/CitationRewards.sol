// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ResearchNFT.sol";

contract CitationRewards is Ownable {
    ResearchNFT public researchNFT;
    IERC20 public rewardToken;
    
    // Mapping from research ID to citation count
    mapping(uint256 => uint256) public citationCount;
    
    // Mapping from research ID to claimed rewards
    mapping(uint256 => uint256) public claimedRewards;
    
    // Reward per citation (in tokens)
    uint256 public rewardPerCitation = 10 * 10**18; // 10 tokens
    
    event CitationAdded(uint256 indexed citingResearchId, uint256 indexed citedResearchId);
    event RewardsClaimed(uint256 indexed researchId, address indexed author, uint256 amount);
    
    constructor(address _researchNFT, address _rewardToken) {
        researchNFT = ResearchNFT(_researchNFT);
        rewardToken = IERC20(_rewardToken);
    }
    
    function addCitation(uint256 citingResearchId, uint256 citedResearchId) public {
        // Verify that both research papers exist
        require(researchNFT.getResearchData(citingResearchId).author != address(0), "Citing research does not exist");
        require(researchNFT.getResearchData(citedResearchId).author != address(0), "Cited research does not exist");
        
        // Verify that the caller is the author of the citing research
        require(researchNFT.getResearchData(citingResearchId).author == msg.sender, "Only the author can add citations");
        
        // Increment citation count
        citationCount[citedResearchId]++;
        
        emit CitationAdded(citingResearchId, citedResearchId);
    }
    
    function claimRewards(uint256 researchId) public {
        // Verify that the research exists
        ResearchNFT.ResearchMetadata memory metadata = researchNFT.getResearchData(researchId);
        require(metadata.author != address(0), "Research does not exist");
        
        // Verify that the caller is the author
        require(metadata.author == msg.sender, "Only the author can claim rewards");
        
        // Calculate unclaimed rewards
        uint256 totalRewards = citationCount[researchId] * rewardPerCitation;
        uint256 unclaimedRewards = totalRewards - claimedRewards[researchId];
        
        require(unclaimedRewards > 0, "No rewards to claim");
        
        // Update claimed rewards
        claimedRewards[researchId] += unclaimedRewards;
        
        // Transfer rewards
        require(rewardToken.transfer(msg.sender, unclaimedRewards), "Reward transfer failed");
        
        emit RewardsClaimed(researchId, msg.sender, unclaimedRewards);
    }
    
    function setRewardPerCitation(uint256 _rewardPerCitation) public onlyOwner {
        rewardPerCitation = _rewardPerCitation;
    }
}