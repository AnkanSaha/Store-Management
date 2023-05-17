// This file is used to send response to client

// interface for Success Response/* The `interface Success_Response` is defining the structure of an

/*object that will be used as an argument for the `Success_Response`
function. It specifies that the object should have properties `res`
of type `any`, `StatusCode` of type `number`, `Status` of type
`string`, `Message` of type `string`, and `Data` of type `any`.
This interface helps ensure that the correct properties are passed
to the function and can help with type checking and code
readability. */

// global types
type str = string; // type for string
type num = number; // type for number
type obj = object; // type for object
type blank = void; // type for void

// global interface
interface ResponseInterface {
    res: {
        status: (code: num) => {
            json: (code: obj) => void;
        }
    }
    Status: str;
    Message: str;
    Data: obj | blank;
}
/**
 * This is a TypeScript function that sends a success response with a specified status code, status,
 * message, and data.
 * @param {ResponseInterface}  - - `res`: The response object from the Express.js framework.
 */

// global Response code
enum ResponseCode {
    Success = 200,
    Fail = 404
}

export const Success_Response = ({res, Status, Message, Data}:ResponseInterface) : blank => {
    res.status(ResponseCode.Success).json({
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
/**
 * This is a TypeScript function that sends a failed response with a specified status code, status,
 * message, and data.
 * @param {ResponseInterface}  - - `res`: The response object from the Express.js framework.
 */
export const Failed_Response = ({res, Status, Message, Data}:ResponseInterface) : blank => {
    res.status(ResponseCode.Fail).json({
        Status: Status,
        Message: Message,
        Data: Data,
    }); // Send Response
}; // Failed Response Function