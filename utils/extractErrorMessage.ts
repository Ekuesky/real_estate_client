/**
 * Extracts a user-friendly error message from a potentially complex error object.
 * Prioritizes a "detail" field if present, otherwise aggregates messages from nested structures.
 *
 * @param error - The error object to extract the message from.  Can be of any type.
 * @returns A string containing the error message, or null if no message could be extracted.
 */
export default function extractErrorMessage(error: unknown): string | null {
  // Type guard to check if the error is an object, not null, and contains a 'data' property.
  if (typeof error === "object" && error !== null && "data" in error) {
    // Type assertion to access the 'data' property safely.
		// We're assuming the data property is of some object type here, it might not always be in fact.
    const errorData = (error as { data: any }).data;

    // Priority check: If a "detail" property exists and is a string, return it directly.
		// This likely provides the most direct user message.
    if ("detail" in errorData && typeof errorData.detail === "string") {
      return errorData.detail;
    }

    // Array to store aggregated error messages.
    const messages: string[] = [];

    // Iterate over keys in the errorData object.
    Object.keys(errorData).forEach((key) => {
      // Skip "status_code" if it exists.
			// This implies this key shouldn't count towards the message we are displaying to users.
      if (key !== "status_code") {
        const fieldError = errorData[key];

        // Handle cases where error messages are nested within arrays.
        if (Array.isArray(fieldError)) {
          messages.push(...fieldError); // Spread syntax to add all array elements to the messages array.
        }
        // Handle nested object structures containing more error messages recursively.
        else if (typeof fieldError === "object" && fieldError !== null) {
          Object.values(fieldError).forEach((errorMessages: any) => {
            if (Array.isArray(errorMessages)) {
              messages.push(...errorMessages);
            }
          });
        }
      }
    });

    // Return the aggregated messages if any, otherwise return null.
    return messages.length > 0 ? messages.join(", ") : null;
  }
  // Return null if the error is not of the expected format or if it cannot extract the needed error message.
  return null;
}