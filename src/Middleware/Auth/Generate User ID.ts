// This File is used as a middleware to generate UserID for Account Creation

// global typescript types
type num = number; // Type for number
type str = string; // Type for string
type globe = any; // Type for string

/**
 * This TypeScript function generates a random 10-digit number ID.
 * @returns a randomly generated 10-digit number as a number data type.
 */
export async function GenerateID():Promise<num> {
   /* Creating an array of numbers from 0 to 9 that will be used to generate the random 10-digit number
   ID. */
    const Numbers: num[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; // All Possible Numbers to generate

    /* The code is initializing two variables: `CountRound` and `FinalID`. */
    // Number of Rounds
    let CountRound :num = 10; // Number of Rounds

    // Final ID Array
    const FinalID: num[] = []; // Final ID

   /* This code block is generating a random 10-digit number ID by looping through 10 rounds. In each
   round, a random number between 0 and 9 is generated using the `Math.random()` method and then
   rounded to the nearest integer using the `toFixed()` method. The rounded number is then used as
   an index to select a number from the `Numbers` array, which contains all possible numbers that
   can be used to generate the ID. The selected number is then pushed to the `FinalID` array. After
   10 rounds, the `FinalID` array is joined into a string and converted to a number, which is then
   returned as the final ID. */
    while (CountRound > 0) {
        const TempRandomNumBer: num = Math.random() * (9 - 0) + 0; // Generate Random Number
        const FinalRandomNumber: num | globe = TempRandomNumBer.toFixed(); // Round the Number
        // Push the Number to Final ID Array
        FinalID.push(Numbers[FinalRandomNumber]); // Push the Number to Final ID
        CountRound--; // Decrease the Number of Rounds
    }

  /* This code block is converting the `FinalID` array, which contains the randomly generated 10-digit
  number ID, into a string by joining all the elements of the array together with an empty string
  separator. Then, the string is converted back into a number data type using the `Number()` method
  and assigned to the `FinalIDNumber` variable. Finally, the `FinalIDNumber` variable is returned as
  the final ID. */
    // Make the Final ID From Array to String
    const FinalIDString: str = FinalID.join(''); // Join the Array to String
    const FinalIDNumber: num = Number(FinalIDString); // Convert the String to Number

    return FinalIDNumber; // Return the Final ID
}
