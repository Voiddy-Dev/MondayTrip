// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/TripPlanner.sol";

contract TripPlannerTest is Test {
    TripPlanner public planner;
    address public alice = vm.addr(0xA11C3);

    function setUp() public {
        planner = new TripPlanner();
        uint256 pricePerNight = 1 ether;
        string memory location = "Hostelandia";
        string memory image = "image.jpg";
        vm.prank(alice);
        planner.createHostel({
            _name: "My Hostel",
            _description: "My Hostel Description",
            _pricePerNight: pricePerNight,
            _location: location,
            _imageUrl: image,
            _maxPeople: 10,
            _minPeople: 1
        });
        planner.createTrip({ _name: "My Trip", _description: "My Trip Description", _maxPeople: 10 });
    }

    function test_createTrip() public {
        planner.createTrip({ _name: "My Trip", _description: "My Trip Description", _maxPeople: 10 });
        assertEq(planner.getAllTrips().length, 2);
        assertEq(planner.getTrip(1).name, "My Trip");
    }

    function test_createHostel() public {
        uint256 pricePerNight = 1 ether;
        string memory location = "Hostelandia";
        string memory image = "image.jpg";
        planner.createHostel({
            _name: "My Hostel",
            _description: "My Hostel Description",
            _pricePerNight: pricePerNight,
            _location: location,
            _imageUrl: image,
            _maxPeople: 10,
            _minPeople: 1
        });
        assertEq(planner.getAllHostels().length, 2);
        assertEq(planner.getHostel(1).name, "My Hostel");
    }

    function test_proposeProposal() public {
        planner.proposeProposal({
            _tripId: 0,
            _hostelId: 0,
            _startDate: "2021-01-01",
            _endDate: "2021-01-10",
            _numberOfNights: 10
        });
        TripPlanner.Proposal[] memory proposals = planner.getTripProposals(0);
        assertEq(proposals.length, 1);
        assertEq(proposals[0].startDate, "2021-01-01");
    }

    function test_denyProposal() public {
        planner.proposeProposal({
            _tripId: 0,
            _hostelId: 0,
            _startDate: "2021-01-01",
            _endDate: "2021-01-10",
            _numberOfNights: 10
        });
        planner.denyProposal({ _tripId: 0, _proposalId: 0 });
        TripPlanner.Proposal[] memory proposals = planner.getTripProposals(0);
        assertEq(proposals[0].status == TripPlanner.ProposalStatus.Denied, true);
    }

    function test_acceptProposal() public {
        planner.proposeProposal({
            _tripId: 0,
            _hostelId: 0,
            _startDate: "2021-01-01",
            _endDate: "2021-01-10",
            _numberOfNights: 10
        });
        planner.approveProposal({ _tripId: 0, _proposalId: 0 });
        planner.acceptProposal({ _tripId: 0, _proposalId: 0 });
        TripPlanner.Proposal memory proposal = planner.getAcceptedProposal(0);
        assertEq(proposal.status == TripPlanner.ProposalStatus.Accepted, true);
    }

    function test_payProposal() public {
        planner.proposeProposal({
            _tripId: 0,
            _hostelId: 0,
            _startDate: "2021-01-01",
            _endDate: "2021-01-10",
            _numberOfNights: 10
        });
        planner.approveProposal({ _tripId: 0, _proposalId: 0 });
        planner.acceptProposal({ _tripId: 0, _proposalId: 0 });
        TripPlanner.Proposal memory proposal = planner.getAcceptedProposal(0);
        deal(address(this), proposal.totalPriceToPay);
        planner.contributeToTrip{ value: proposal.totalPriceToPay }({ _tripId: 0 });
        planner.payProposal({ _tripId: 0 });
        assertEq(alice.balance, proposal.totalPriceToPay);
    }

    function test_contributeToTrip() public {
        deal(address(this), 1 ether);
        planner.contributeToTrip{ value: 1 ether }({ _tripId: 0 });
        assertEq(planner.totalTripPool(0), 1 ether);
        assertEq(planner.tripContributions(0, address(this)), 1 ether);
    }

    function test_inviteParticipant() public {
        planner.inviteParticipant({ _tripId: 0, _participant: alice });
        assertEq(planner.tripInvitations(0, alice) == TripPlanner.InvitationStatus.Pending, true);
    }

    function test_acceptInvitation() public {
        planner.inviteParticipant({ _tripId: 0, _participant: alice });
        vm.prank(alice);
        planner.acceptInvitation({ _tripId: 0 });
        assertEq(planner.tripInvitations(0, alice) == TripPlanner.InvitationStatus.Accepted, true);
        assertEq(planner.getTripParticipants(0).length, 2);
    }

    function test_rejectInvitation() public {
        planner.inviteParticipant({ _tripId: 0, _participant: alice });
        vm.prank(alice);
        planner.rejectInvitation({ _tripId: 0 });
        assertEq(planner.tripInvitations(0, alice) == TripPlanner.InvitationStatus.Rejected, true);
        assertEq(planner.getTripParticipants(0).length, 1);
    }

    function test_finishTrip() public {
        planner.finishTrip({ _tripId: 0 });
        TripPlanner.Trip memory trip = planner.getTrip(0);
        assertEq(trip.status == TripPlanner.TripStatus.Finished, true);
    }
}
