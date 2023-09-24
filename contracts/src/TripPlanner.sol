// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { EnumerableSet } from "openzeppelin/utils/structs/EnumerableSet.sol";
import { IERC20 } from "openzeppelin/token/ERC20/IERC20.sol";

contract TripPlanner {
    using EnumerableSet for EnumerableSet.AddressSet;

    enum TripStatus {
        Planning,
        Booked,
        Finished
    }

    enum TripInvitation {
        Pending,
        Accepted,
        Denied
    }

    enum BookingStatus {
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
        address organizer;
    }

    struct Booking {
        uint256 id;
        string startDate;
        string endDate;
        uint256 hostelId;
        uint256 numberOfNights;
        uint256 totalPriceToPay;
        address paymentCurrency;
        BookingStatus status;
    }

    struct Hostel {
        uint256 id;
        string name;
        string description;
        uint256[] pricesPerNight;
        address[] acceptedPaymentCurrencies;
        uint256 minPeople;
        uint256 maxPeople;
        address owner;
        HostelStatus status;
    }

    uint256 public tripCount = 0;
    uint256 public hostelCount = 0;
    uint256 public bookingCount = 0;

    Trip[] public trips;
    Hostel[] public hostels;
    Booking[] public bookings;
    mapping(address => uint256[]) userTrips;
    mapping(uint256 => EnumerableSet.AddressSet) tripParticipants;
    mapping(uint256 => Booking[]) tripProposedBookings;
    mapping(uint256 => Booking) tripAcceptedBooking;

    modifier onlyValidAndActiveTrip(uint256 _tripId) {
        Trip memory trip = trips[_tripId];
        require(
            _tripId < trips.length && trip.status == TripStatus.Planning,
            "Trip does not exist or is not active"
        );
        _;
    }

    modifier onlyValidHostel(uint256 _hostelId) {
        Hostel memory hostel = hostels[_hostelId];
        require(
            _hostelId < hostels.length && hostel.status == HostelStatus.Active,
            "Hostel does not exist or is not active"
        );
        _;
    }

    function createTrip(string memory _name, string memory _description, uint256 _maxPeople)
        external
    {
        Trip memory trip =
            Trip(tripCount, _name, _description, _maxPeople, TripStatus.Planning, msg.sender);
        tripParticipants[tripCount].add(msg.sender);
        userTrips[msg.sender].push(tripCount);
        trips.push(trip);
        ++tripCount;
    }

    function createHostel(
        string calldata _name,
        string calldata _description,
        uint256[] calldata _pricesPerNight,
        address[] calldata _acceptedPaymentCurrencies,
        uint256 _maxPeople,
        uint256 _minPeople
    ) public {
        require(_pricesPerNight.length == _acceptedPaymentCurrencies.length, "Invalid input");
        Hostel memory hostel = Hostel({
            id: hostelCount,
            name: _name,
            description: _description,
            pricesPerNight: _pricesPerNight,
            acceptedPaymentCurrencies: _acceptedPaymentCurrencies,
            minPeople: _minPeople,
            maxPeople: _maxPeople,
            owner: msg.sender,
            status: HostelStatus.Active
        });
        hostels.push(hostel);
        ++hostelCount;
    }

    function proposeBooking(
        uint256 _tripId,
        string calldata _startDate,
        string calldata _endDate,
        uint256 _numberOfNights,
        address _paymentCurrency,
        uint256 _hostelId
    ) external onlyValidAndActiveTrip(_tripId) onlyValidHostel(_hostelId) {
        Hostel memory hostel = hostels[_hostelId];
        uint256 totalPriceToPay = hostel.pricesPerNight[_numberOfNights] * _numberOfNights;
        Booking memory booking = Booking({
            id: bookingCount,
            totalPriceToPay: totalPriceToPay,
            startDate: _startDate,
            endDate: _endDate,
            numberOfNights: _numberOfNights,
            paymentCurrency: _paymentCurrency,
            hostelId: _hostelId,
            status: BookingStatus.Proposed
        });
        tripProposedBookings[_tripId].push(booking);
    }

    function denyBooking(uint256 _tripId, uint256 _bookingId)
        external
        onlyValidAndActiveTrip(_tripId)
    {
        Booking memory booking = tripProposedBookings[_tripId][_bookingId];
        booking.status = BookingStatus.Denied;
        tripProposedBookings[_tripId][_bookingId] = booking;
    }

    function payBooking(uint256 _tripId, uint256 _bookingId)
        external
        onlyValidAndActiveTrip(_tripId)
    {
        require(
            tripParticipants[_tripId].contains(msg.sender),
            "Only trip participants can pay bookings"
        );
        Booking memory booking = tripProposedBookings[_tripId][_bookingId];
        require(booking.status == BookingStatus.Accepted, "Can only pay for accepted bookings");
        booking.status = BookingStatus.Paid;
        tripProposedBookings[_tripId][_bookingId] = booking;
        Hostel memory hostel = hostels[booking.hostelId];
        IERC20 token = IERC20(booking.paymentCurrency);
        token.transferFrom(msg.sender, hostel.owner, booking.totalPriceToPay);
    }

    function addTripParticipant(uint256 _tripId, address _participant)
        external
        onlyValidAndActiveTrip(_tripId)
    {
        Trip memory trip = trips[_tripId];
        require(tripParticipants[_tripId].length() < trip.maxPeople, "Trip is full");
        require(msg.sender == trip.organizer, "Trip is exclusive");
        tripParticipants[_tripId].add(_participant);
        trips[_tripId] = trip;
    }

    function finishTrip(uint256 _tripId) external onlyValidAndActiveTrip(_tripId) {
        Trip memory trip = trips[_tripId];
        trip.status = TripStatus.Finished;
        Booking memory booking = tripAcceptedBooking[_tripId];
        Hostel memory hostel = hostels[booking.hostelId];
        hostel.status = HostelStatus.Active;
        hostels[booking.hostelId] = hostel;
        trips[_tripId] = trip;
    }

    function acceptBooking(uint256 _tripId, uint256 _bookingId)
        external
        onlyValidAndActiveTrip(_tripId)
    {
        Trip memory trip = trips[_tripId];
        require(msg.sender == trip.organizer, "Only organizer can accept bookings");
        Booking memory booking = tripProposedBookings[_tripId][_bookingId];
        booking.status = BookingStatus.Accepted;
        trip.status = TripStatus.Booked;
        Hostel memory hostel = hostels[booking.hostelId];
        hostel.status = HostelStatus.Booked;
        tripAcceptedBooking[_tripId] = booking;
    }

    function removeTripParticipant(uint256 _tripId, address _participant)
        external
        onlyValidAndActiveTrip(_tripId)
    {
        tripParticipants[_tripId].remove(_participant);
    }

    function getTripProposedBookings(uint256 _tripId) external view returns (Booking[] memory) {
        return tripProposedBookings[_tripId];
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
