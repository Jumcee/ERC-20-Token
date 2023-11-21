networks; {
  sepolia; {
    url; "https://eth-sepolia.g.alchemy.com/v2/8bU0xeG2dXOerpJPndJIeppX-zaZpV3f", // Put the URL in double quotes
    chainId; 11155111, // Replace with the actual chain ID for Sepolia
    accounts; [process.env.PRIVATE_KEY] // Enclose process.env.PRIVATE_KEY in an array
  }
}
