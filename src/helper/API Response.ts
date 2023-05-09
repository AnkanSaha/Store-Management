// This file is used to send response to client

// interface for Success Response/* The `interface Success_Response` is defining the structure of an

/*object that will be used as an argument for the `Success_Response`
function. It specifies that the object should have properties `res`
of type `any`, `StatusCode` of type `number`, `Status` of type
`string`, `Message` of type `string`, and `Data` of type `any`.
This interface helps ensure that the correct properties are passed
to the function and can help with type checking and code
readability. */
interface Success_Response {
    res: any;
    StatusCode: number;
    Status: string;
    Message: string;
    Data: any;
}
/**
 * This is a TypeScript function that sends a success response with a specified status code, status,
 * message, and data.
 * @param {Success_Response}  - - `res`: The response object from the Express.js framework.
 */

export const Success_Response = ({res, StatusCode, Status, Message, Data}:Success_Response) => {
    res.status(StatusCode).json({
        Status: Status,
        Message: Message,
        Data: Data,
    }); // Send Response
}; // Success Response Function

/* The `interface Failed_Response` is defining the structure of an object that will be used as an
argument for the `Failed_Response` function. It specifies that the object should have properties
`res` of type `any`, `StatusCode` of type `number`, `Status` of type `string`, `Message` of type
`string`, and `Data` of type `any`. This interface helps ensure that the correct properties are
passed to the function and can help with type checking and code readability. */
// interface for Failed Response
interface Failed_Response {
    res: any;
    StatusCode: number;
    Status: string;
    Message: string;
    Data: any;
}

/**
 * This is a TypeScript function that sends a failed response with a specified status code, status,
 * message, and data.
 * @param {Failed_Response}  - - `res`: The response object from the Express.js framework.
 */
export const Failed_Response = ({res, StatusCode, Status, Message, Data}:Failed_Response) => {
    res.status(StatusCode).json({
        Status: Status,
        Message: Message,
        Data: Data,
    }); // Send Response
}; // Failed Response Function