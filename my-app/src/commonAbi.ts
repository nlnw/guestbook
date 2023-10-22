export const GUESTBOOK_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "string", name: "message", type: "string" },
          {
            internalType: "address",
            name: "encrypted_receiver",
            type: "address",
          },
          {
            internalType: "string",
            name: "encrypted_message",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct Guestbook.Post",
        name: "post",
        type: "tuple",
      },
    ],
    name: "Posted",
    type: "event",
  },
  {
    inputs: [],
    name: "count",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "message", type: "string" }],
    name: "post",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "message", type: "string" },
      {
        internalType: "address",
        name: "encrypted_receiver",
        type: "address",
      },
      {
        internalType: "string",
        name: "encrypted_message",
        type: "string",
      },
    ],
    name: "postEncrypted",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "posts",
    outputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "string", name: "message", type: "string" },
      {
        internalType: "address",
        name: "encrypted_receiver",
        type: "address",
      },
      {
        internalType: "string",
        name: "encrypted_message",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
