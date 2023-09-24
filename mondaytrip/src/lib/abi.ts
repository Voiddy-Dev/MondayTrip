const plannerAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "acceptInvitation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "acceptProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "approveProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "contributeToTrip",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageUrl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_pricePerNight",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxPeople",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_minPeople",
        "type": "uint256"
      }
    ],
    "name": "createHostel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_maxPeople",
        "type": "uint256"
      }
    ],
    "name": "createTrip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "denyProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "finishTrip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "getAcceptedProposal",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "startDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "endDate",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "hostelId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "numberOfNights",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalPriceToPay",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "approvals",
            "type": "uint256"
          },
          {
            "internalType": "enum TripPlanner.ProposalStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct TripPlanner.Proposal",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllHostels",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageUrl",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "pricePerNight",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minPeople",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxPeople",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum TripPlanner.HostelStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct TripPlanner.Hostel[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllTrips",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "maxPeople",
            "type": "uint256"
          },
          {
            "internalType": "enum TripPlanner.TripStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "startDate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "endDate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              }
            ],
            "internalType": "struct TripPlanner.TripInformation",
            "name": "information",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "organizer",
            "type": "address"
          }
        ],
        "internalType": "struct TripPlanner.Trip[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hostelId",
        "type": "uint256"
      }
    ],
    "name": "getHostel",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageUrl",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "pricePerNight",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minPeople",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxPeople",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum TripPlanner.HostelStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct TripPlanner.Hostel",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "getTrip",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "maxPeople",
            "type": "uint256"
          },
          {
            "internalType": "enum TripPlanner.TripStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "startDate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "endDate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              }
            ],
            "internalType": "struct TripPlanner.TripInformation",
            "name": "information",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "organizer",
            "type": "address"
          }
        ],
        "internalType": "struct TripPlanner.Trip",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "getTripParticipants",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "getTripParticipantsAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "getTripProposals",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "startDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "endDate",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "hostelId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "numberOfNights",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalPriceToPay",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "approvals",
            "type": "uint256"
          },
          {
            "internalType": "enum TripPlanner.ProposalStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct TripPlanner.Proposal[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserTrips",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "hostelCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "hostels",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imageUrl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "pricePerNight",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minPeople",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxPeople",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "enum TripPlanner.HostelStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_participant",
        "type": "address"
      }
    ],
    "name": "inviteParticipant",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "payProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proposalCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "startDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "endDate",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "hostelId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numberOfNights",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalPriceToPay",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "approvals",
        "type": "uint256"
      },
      {
        "internalType": "enum TripPlanner.ProposalStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_startDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_endDate",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_numberOfNights",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_hostelId",
        "type": "uint256"
      }
    ],
    "name": "proposeProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      }
    ],
    "name": "rejectInvitation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tripId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_participant",
        "type": "address"
      }
    ],
    "name": "removeTripParticipant",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "totalTripPool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tripAcceptedProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "startDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "endDate",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "hostelId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numberOfNights",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalPriceToPay",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "approvals",
        "type": "uint256"
      },
      {
        "internalType": "enum TripPlanner.ProposalStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "tripContributions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tripCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "tripInvitations",
    "outputs": [
      {
        "internalType": "enum TripPlanner.InvitationStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tripProposals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "startDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "endDate",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "hostelId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "numberOfNights",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalPriceToPay",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "approvals",
        "type": "uint256"
      },
      {
        "internalType": "enum TripPlanner.ProposalStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "trips",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "maxPeople",
        "type": "uint256"
      },
      {
        "internalType": "enum TripPlanner.TripStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "startDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "endDate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          }
        ],
        "internalType": "struct TripPlanner.TripInformation",
        "name": "information",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "organizer",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userTrips",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const;

export default plannerAbi;