// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StreakBadgeNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => uint256) public badgesClaimed;
    uint256 public constant MILESTONE_30 = 30;
    uint256 public constant MILESTONE_50 = 50;

    // Pass msg.sender into Ownable so it becomes the initial owner
    constructor() 
        ERC721("StreakBadge", "STB") 
        Ownable(msg.sender) 
    {}

    function mintBadge(address to, uint256 streak) external onlyOwner {
        require(streak == MILESTONE_30 || streak == MILESTONE_50, "Invalid milestone");
        require(badgesClaimed[to] == 0, "Badge already claimed");

        badgesClaimed[to] = streak;
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURIForStreak(streak));
    }

    function tokenURIForStreak(uint256 streak) public pure returns (string memory) {
        if (streak == MILESTONE_30) {
            return "ipfs://Qm.../30day.json";
        } else {
            return "ipfs://Qm.../50day.json";
        }
    }
}
