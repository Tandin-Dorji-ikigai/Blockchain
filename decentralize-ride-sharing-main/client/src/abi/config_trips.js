export const RIDE_LIST_ADDRESS = "0x2a80872baa411419A2dD4d121d2d7be2020832Cd"
export const RIDE_LIST_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "driverAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rideID",
        "type": "uint256"
      }
    ],
    "name": "acceptRequestEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "driverAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rideID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "cancelDriverRequestEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "driverAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rideID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "cancelRiderRequestEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rideId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "riderAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "pickUpLocation",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "dropOffLocation",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "pickUpDate",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "pickUpTime",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "enum Ride.Status",
        "name": "requestStatus",
        "type": "uint8"
      }
    ],
    "name": "createTripEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "riderAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "driverAddress",
        "type": "address"
      }
    ],
    "name": "tripCompletedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rideId",
        "type": "uint256"
      }
    ],
    "name": "updaterequestStatus",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "driverCancelReason",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "riderCancelReason",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
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
    "name": "tripForDriver",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
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
    "name": "tripForRider",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "tripRequestCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
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
        "name": "rideId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "riderAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "pickUpLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dropOffLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pickUpDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pickUpTime",
        "type": "string"
      },
      {
        "internalType": "enum Ride.Status",
        "name": "requestStatus",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "driverAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "remark",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_pickUpLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dropOffLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_pickUpDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_pickUpTime",
        "type": "string"
      }
    ],
    "name": "makeTrip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_riderId",
        "type": "uint256"
      }
    ],
    "name": "acceptRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "cancelRiderRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tripCompleted",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "cancelDriverRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_remark",
        "type": "string"
      }
    ],
    "name": "payment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getLatestTripForRider",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getLatestTripForDriver",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]