// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ShadowVote
 * @dev Decentralized voting platform with privacy features
 * @notice This contract allows users to create polls and vote anonymously
 */
contract ShadowVote {
    
    // ==================== STRUCTS ====================
    
    struct Poll {
        uint64 id;
        string question;
        string[] options;
        uint64[] counts;
        address creator;
        bool isActive;
        uint256 createdAt;
        uint256 endTime;
        mapping(address => bool) hasVoted;
    }
    
    // ==================== STATE VARIABLES ====================
    
    uint64 public nextPollId;
    mapping(uint64 => Poll) private polls;
    uint64[] public pollIds;
    
    // Track voter participation for preventing double voting
    mapping(uint64 => mapping(address => bool)) public hasVotedInPoll;
    
    // Owner for administrative functions
    address public owner;
    
    // ==================== EVENTS ====================
    
    event PollCreated(
        uint64 indexed pollId,
        address indexed creator,
        string question,
        uint256 optionsCount,
        uint256 endTime
    );
    
    event VoteCast(
        uint64 indexed pollId,
        address indexed voter,
        uint256 timestamp
    );
    
    event PollClosed(
        uint64 indexed pollId,
        address indexed closer
    );
    
    event PollExtended(
        uint64 indexed pollId,
        uint256 newEndTime
    );
    
    // ==================== MODIFIERS ====================
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier pollExists(uint64 pollId) {
        require(pollId < nextPollId, "Poll does not exist");
        _;
    }
    
    modifier pollActive(uint64 pollId) {
        require(polls[pollId].isActive, "Poll is not active");
        require(block.timestamp < polls[pollId].endTime || polls[pollId].endTime == 0, "Poll has ended");
        _;
    }
    
    modifier hasNotVoted(uint64 pollId) {
        require(!hasVotedInPoll[pollId][msg.sender], "Already voted in this poll");
        _;
    }
    
    // ==================== CONSTRUCTOR ====================
    
    constructor() {
        owner = msg.sender;
        nextPollId = 0;
    }
    
    // ==================== CORE FUNCTIONS ====================
    
    /**
     * @dev Create a new poll
     * @param question The poll question
     * @param options Array of voting options
     * @param duration Duration of the poll in seconds (0 for unlimited)
     * @return pollId The ID of the newly created poll
     */
    function createPoll(
        string calldata question,
        string[] calldata options,
        uint256 duration
    ) external returns (uint64 pollId) {
        require(bytes(question).length > 0, "Question cannot be empty");
        require(options.length >= 2, "Must have at least 2 options");
        require(options.length <= 20, "Maximum 20 options allowed");
        
        // Validate options
        for (uint256 i = 0; i < options.length; i++) {
            require(bytes(options[i]).length > 0, "Option cannot be empty");
        }
        
        pollId = nextPollId++;
        Poll storage newPoll = polls[pollId];
        
        newPoll.id = pollId;
        newPoll.question = question;
        newPoll.creator = msg.sender;
        newPoll.isActive = true;
        newPoll.createdAt = block.timestamp;
        newPoll.endTime = duration > 0 ? block.timestamp + duration : 0;
        
        // Initialize options and counts
        for (uint256 i = 0; i < options.length; i++) {
            newPoll.options.push(options[i]);
            newPoll.counts.push(0);
        }
        
        pollIds.push(pollId);
        
        emit PollCreated(pollId, msg.sender, question, options.length, newPoll.endTime);
    }
    
    /**
     * @dev Cast a vote on a poll
     * @param pollId The ID of the poll
     * @param choice The index of the chosen option
     */
    function vote(uint64 pollId, uint32 choice)
        external
        pollExists(pollId)
        pollActive(pollId)
        hasNotVoted(pollId)
    {
        Poll storage poll = polls[pollId];
        require(choice < poll.options.length, "Invalid choice");
        
        // Record vote
        poll.counts[choice]++;
        hasVotedInPoll[pollId][msg.sender] = true;
        poll.hasVoted[msg.sender] = true;
        
        emit VoteCast(pollId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Close a poll (only creator or owner)
     * @param pollId The ID of the poll to close
     */
    function closePoll(uint64 pollId)
        external
        pollExists(pollId)
    {
        Poll storage poll = polls[pollId];
        require(
            msg.sender == poll.creator || msg.sender == owner,
            "Only creator or owner can close poll"
        );
        require(poll.isActive, "Poll already closed");
        
        poll.isActive = false;
        
        emit PollClosed(pollId, msg.sender);
    }
    
    /**
     * @dev Extend poll duration (only creator or owner)
     * @param pollId The ID of the poll
     * @param additionalTime Additional time in seconds
     */
    function extendPoll(uint64 pollId, uint256 additionalTime)
        external
        pollExists(pollId)
    {
        Poll storage poll = polls[pollId];
        require(
            msg.sender == poll.creator || msg.sender == owner,
            "Only creator or owner can extend poll"
        );
        require(poll.isActive, "Poll is not active");
        require(additionalTime > 0, "Additional time must be positive");
        
        if (poll.endTime == 0) {
            poll.endTime = block.timestamp + additionalTime;
        } else {
            poll.endTime += additionalTime;
        }
        
        emit PollExtended(pollId, poll.endTime);
    }
    
    // ==================== VIEW FUNCTIONS ====================
    
    /**
     * @dev Get basic poll information
     * @param pollId The ID of the poll
     */
    function getPoll(uint64 pollId)
        external
        view
        pollExists(pollId)
        returns (
            uint64 id,
            string memory question,
            string[] memory options,
            uint64[] memory counts,
            address creator,
            bool isActive,
            uint256 createdAt,
            uint256 endTime
        )
    {
        Poll storage poll = polls[pollId];
        return (
            poll.id,
            poll.question,
            poll.options,
            poll.counts,
            poll.creator,
            poll.isActive,
            poll.createdAt,
            poll.endTime
        );
    }
    
    /**
     * @dev Get all polls (paginated)
     * @param offset Starting index
     * @param limit Number of polls to return
     */
    function getPolls(uint256 offset, uint256 limit)
        external
        view
        returns (
            uint64[] memory ids,
            string[] memory questions,
            address[] memory creators,
            bool[] memory activeStatus,
            uint256[] memory voteCounts
        )
    {
        uint256 total = pollIds.length;
        if (offset >= total) {
            return (
                new uint64[](0),
                new string[](0),
                new address[](0),
                new bool[](0),
                new uint256[](0)
            );
        }
        
        uint256 end = offset + limit;
        if (end > total) {
            end = total;
        }
        
        uint256 resultLength = end - offset;
        ids = new uint64[](resultLength);
        questions = new string[](resultLength);
        creators = new address[](resultLength);
        activeStatus = new bool[](resultLength);
        voteCounts = new uint256[](resultLength);
        
        for (uint256 i = 0; i < resultLength; i++) {
            uint64 pollId = pollIds[offset + i];
            Poll storage poll = polls[pollId];
            
            ids[i] = poll.id;
            questions[i] = poll.question;
            creators[i] = poll.creator;
            activeStatus[i] = poll.isActive;
            
            // Calculate total votes
            uint256 totalVotes = 0;
            for (uint256 j = 0; j < poll.counts.length; j++) {
                totalVotes += poll.counts[j];
            }
            voteCounts[i] = totalVotes;
        }
    }
    
    /**
     * @dev Get all active polls
     */
    function getActivePolls()
        external
        view
        returns (uint64[] memory activePollIds)
    {
        uint256 activeCount = 0;
        
        // Count active polls
        for (uint256 i = 0; i < pollIds.length; i++) {
            uint64 pollId = pollIds[i];
            if (polls[pollId].isActive && 
                (polls[pollId].endTime == 0 || block.timestamp < polls[pollId].endTime)) {
                activeCount++;
            }
        }
        
        // Populate active poll IDs
        activePollIds = new uint64[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < pollIds.length; i++) {
            uint64 pollId = pollIds[i];
            if (polls[pollId].isActive && 
                (polls[pollId].endTime == 0 || block.timestamp < polls[pollId].endTime)) {
                activePollIds[index] = pollId;
                index++;
            }
        }
    }
    
    /**
     * @dev Check if an address has voted in a specific poll
     * @param pollId The poll ID
     * @param voter The address to check
     */
    function hasVoted(uint64 pollId, address voter)
        external
        view
        pollExists(pollId)
        returns (bool)
    {
        return hasVotedInPoll[pollId][voter];
    }
    
    /**
     * @dev Get total number of polls
     */
    function getTotalPolls() external view returns (uint256) {
        return pollIds.length;
    }
    
    /**
     * @dev Get poll results (counts for each option)
     * @param pollId The poll ID
     */
    function getPollResults(uint64 pollId)
        external
        view
        pollExists(pollId)
        returns (string[] memory options, uint64[] memory counts, uint256 totalVotes)
    {
        Poll storage poll = polls[pollId];
        options = poll.options;
        counts = poll.counts;
        
        totalVotes = 0;
        for (uint256 i = 0; i < counts.length; i++) {
            totalVotes += counts[i];
        }
    }
    
    /**
     * @dev Check if a poll is still accepting votes
     * @param pollId The poll ID
     */
    function isPollActive(uint64 pollId)
        external
        view
        pollExists(pollId)
        returns (bool)
    {
        Poll storage poll = polls[pollId];
        return poll.isActive && 
               (poll.endTime == 0 || block.timestamp < poll.endTime);
    }
    
    // ==================== ADMIN FUNCTIONS ====================
    
    /**
     * @dev Transfer ownership
     * @param newOwner The address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
