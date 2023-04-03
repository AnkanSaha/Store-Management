// This File is used as a middleware to generate UserID for Account Creation

export async function GenerateID() {
  let Numbers: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; // All Possible Numbers to generate

  // Number of Rounds
  let CountRound = 10; // Number of Rounds

  // Final ID Array
  let FinalID: Number[] = []; // Final ID

  while (CountRound > 0) {
    let TempRandomNumBer: Number = Math.random() * (9 - 0) + 0; // Generate Random Number
    let FinalRandomNumber: any = TempRandomNumBer.toFixed(); // Round the Number
    // Push the Number to Final ID Array
    FinalID.push(Numbers[FinalRandomNumber]); // Push the Number to Final ID
    CountRound--; // Decrease the Number of Rounds
  }

  // Make the Final ID From Array to String
  let FinalIDString: String = FinalID.join(""); // Join the Array to String

  return FinalIDString; // Return the Final ID
}
