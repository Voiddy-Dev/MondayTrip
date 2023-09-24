// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {EnumerableSet} from "openzeppelin/utils/structs/EnumerableSet.sol";
import {IERC20} from "openzeppelin/token/ERC20/IERC20.sol";

contract TripPlanner {
    using EnumerableSet for EnumerableSet.AddressSet;

    enum TripStatus {
        Planning,
        Booked,
        Finished
    }

    enum InvitationStatus {
        Pending,
        Accepted,
        Rejected
    }

    enum ProposalStatus {
        Proposed,
        Accepted,
        Denied,
        Paid
    }

    enum HostelStatus {
        Active,
        Booked
    }

    struct Trip {
        uint256 id;
        string name;
        string description;
        uint256 maxPeople;
        TripStatus status;
        TripInformation information;
        address organizer;
    }

    struct TripInformation {
        string startDate;
        string endDate;
        string location;
    }

    struct Proposal {
        uint256 id;
        string startDate;
        string endDate;
        uint256 hostelId;
        uint256 numberOfNights;
        uint256 totalPriceToPay;
        ProposalStatus status;
    }

    struct Hostel {
        uint256 id;
        string name;
        string description;
        string location;
        string imageUrl;
        uint256 pricePerNight;
        uint256 minPeople;
        uint256 maxPeople;
        address owner;
        HostelStatus status;
    }

    uint256 public tripCount = 0;
    uint256 public hostelCount = 0;
    uint256 public proposalCount = 0;

    Trip[] public trips;
    Hostel[] public hostels;
    Proposal[] public proposals;
    mapping(address => uint256[]) userTrips;
    mapping(uint256 => EnumerableSet.AddressSet) tripParticipants;
    mapping(uint256 => Proposal[]) tripProposals;
    mapping(uint256 => Proposal) tripAcceptedProposal;
    mapping(uint256 => mapping(address => InvitationStatus)) tripInvitations;

    modifier onlyValidAndActiveTrip(uint256 _tripId) {
        Trip memory trip = trips[_tripId];
        require(_tripId < trips.length && trip.status == TripStatus.Planning, "Trip does not exist or is not active");
        _;
    }

    modifier onlyValidHostel(uint256 _hostelId) {
        Hostel memory hostel = hostels[_hostelId];
        require(
            _hostelId < hostels.length && hostel.status == HostelStatus.Active, "Hostel does not exist or is not active"
        );
        _;
    }

    receive() external payable {}

    function createTrip(string memory _name, string memory _description, uint256 _maxPeople) external {
        Trip memory trip = Trip(
            tripCount, _name, _description, _maxPeople, TripStatus.Planning, TripInformation("", "", ""), msg.sender
        );
        tripParticipants[tripCount].add(msg.sender);
        userTrips[msg.sender].push(tripCount);
        trips.push(trip);
        ++tripCount;
    }

    function createHostel(
        string calldata _name,
        string calldata _description,
        string calldata _location,
        string calldata _imageUrl,
        uint256 _pricePerNight,
        uint256 _maxPeople,
        uint256 _minPeople
    ) public {
        Hostel memory hostel = Hostel({
            id: hostelCount,
            name: _name,
            description: _description,
            location: _location,
            imageUrl: _imageUrl,
            pricePerNight: _pricePerNight,
            minPeople: _minPeople,
            maxPeople: _maxPeople,
            owner: msg.sender,
            status: HostelStatus.Active
        });
        hostels.push(hostel);
        ++hostelCount;
    }

    function proposeProposal(
        uint256 _tripId,
        string calldata _startDate,
        string calldata _endDate,
        uint256 _numberOfNights,
        uint256 _hostelId
    ) external onlyValidAndActiveTrip(_tripId) onlyValidHostel(_hostelId) {
        Hostel memory hostel = hostels[_hostelId];
        uint256 totalPriceToPay = hostel.pricePerNight * _numberOfNights;
        Proposal memory proposal = Proposal({
            id: proposalCount,
            totalPriceToPay: totalPriceToPay,
            startDate: _startDate,
            endDate: _endDate,
            numberOfNights: _numberOfNights,
            hostelId: _hostelId,
            status: ProposalStatus.Proposed
        });
        tripProposals[_tripId].push(proposal);
    }

    function denyProposal(uint256 _tripId, uint256 _proposalId) external onlyValidAndActiveTrip(_tripId) {
        Proposal memory proposal = tripProposals[_tripId][_proposalId];
        proposal.status = ProposalStatus.Denied;
        tripProposals[_tripId][_proposalId] = proposal;
    }

    function payProposal(uint256 _tripId, uint256 _proposalId) external payable onlyValidAndActiveTrip(_tripId) {
        require(tripParticipants[_tripId].contains(msg.sender), "Only trip participants can pay proposals");
        Proposal memory proposal = tripProposals[_tripId][_proposalId];
        require(proposal.status == ProposalStatus.Accepted, "Can only pay for accepted proposals");
        proposal.status = ProposalStatus.Paid;
        tripProposals[_tripId][_proposalId] = proposal;
        Hostel memory hostel = hostels[proposal.hostelId];
        (bool success,) = hostel.owner.call{value: proposal.totalPriceToPay}("");
        require(success, "Payment failed");
    }

    function inviteParticipant(uint256 _tripId, address _participant) external onlyValidAndActiveTrip(_tripId) {
        Trip memory trip = trips[_tripId];
        require(msg.sender == trip.organizer, "Only organizer can invite participants");
        tripInvitations[_tripId][_participant] = InvitationStatus.Pending;
    }

    function rejectInvitation(uint256 _tripId) external onlyValidAndActiveTrip(_tripId) {
        require(tripInvitations[_tripId][msg.sender] == InvitationStatus.Pending, "No pending invitation for this trip");
        tripInvitations[_tripId][msg.sender] = InvitationStatus.Rejected;
    }

    function acceptInvitation(uint256 _tripId) external onlyValidAndActiveTrip(_tripId) {
        require(tripInvitations[_tripId][msg.sender] == InvitationStatus.Pending, "No pending invitation for this trip");
        tripInvitations[_tripId][msg.sender] = InvitationStatus.Accepted;
        Trip memory trip = trips[_tripId];
        require(tripParticipants[_tripId].length() < trip.maxPeople, "Trip is full");
        tripParticipants[_tripId].add(msg.sender);
    }

    function finishTrip(uint256 _tripId) external onlyValidAndActiveTrip(_tripId) {
        Trip memory trip = trips[_tripId];
        trip.status = TripStatus.Finished;
        Proposal memory proposal = tripAcceptedProposal[_tripId];
        Hostel memory hostel = hostels[proposal.hostelId];
        hostel.status = HostelStatus.Active;
        hostels[proposal.hostelId] = hostel;
        trips[_tripId] = trip;
    }

    function acceptProposal(uint256 _tripId, uint256 _proposalId) external onlyValidAndActiveTrip(_tripId) {
        Trip memory trip = trips[_tripId];
        require(msg.sender == trip.organizer, "Only organizer can accept proposals");
        Proposal memory proposal = tripProposals[_tripId][_proposalId];
        proposal.status = ProposalStatus.Accepted;
        trip.status = TripStatus.Booked;
        Hostel memory hostel = hostels[proposal.hostelId];
        hostel.status = HostelStatus.Booked;
        tripAcceptedProposal[_tripId] = proposal;
    }

    function removeTripParticipant(uint256 _tripId, address _participant) external onlyValidAndActiveTrip(_tripId) {
        tripParticipants[_tripId].remove(_participant);
    }

    function getTripProposals(uint256 _tripId) external view returns (Proposal[] memory) {
        return tripProposals[_tripId];
    }

    function getTripParticipants(uint256 _tripId) external view returns (address[] memory) {
        return tripParticipants[_tripId].values();
    }

    function getTrip(uint256 _tripId) external view returns (Trip memory) {
        return trips[_tripId];
    }

    function getHostel(uint256 _hostelId) external view returns (Hostel memory) {
        return hostels[_hostelId];
    }

    function getAllTrips() external view returns (Trip[] memory) {
        return trips;
    }

    function getAllHostels() external view returns (Hostel[] memory) {
        return hostels;
    }

    function getUserTrips(address _user) external view returns (uint256[] memory) {
        return userTrips[_user];
    }
}
