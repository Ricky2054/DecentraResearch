// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ResearchNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Mapping from token ID to research metadata
    mapping(uint256 => ResearchMetadata) public researchData;
    
    struct ResearchMetadata {
        address author;
        uint256 timestamp;
        string ipfsHash;
        bool verified;
    }
    
    event ResearchMinted(uint256 indexed tokenId, address indexed author, string ipfsHash);
    event ResearchVerified(uint256 indexed tokenId, address indexed verifier);
    
    constructor() ERC721("DecentraResearch", "DRES") {}
    
    function mintResearchNFT(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        researchData[newItemId] = ResearchMetadata({
            author: msg.sender,
            timestamp: block.timestamp,
            ipfsHash: tokenURI,
            verified: false
        });
        
        emit ResearchMinted(newItemId, msg.sender, tokenURI);
        
        return newItemId;
    }
    
    function verifyResearch(uint256 tokenId) public {
        require(_exists(tokenId), "Research does not exist");
        // In a real implementation, you would add verification logic here
        // For example, only allowing verified reviewers to call this function
        
        researchData[tokenId].verified = true;
        
        emit ResearchVerified(tokenId, msg.sender);
    }
    
    function getResearchData(uint256 tokenId) public view returns (ResearchMetadata memory) {
        require(_exists(tokenId), "Research does not exist");
        return researchData[tokenId];
    }
}