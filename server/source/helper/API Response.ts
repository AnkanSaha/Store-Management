// This file is used to send response to client

// interface for Success Response/* The `interface Success_Response` is defining the structure of an

// global types
type str = string; // type for string
type int = number; // type for int
type obj = object; // type for object
type blank = void; // type for void

// global interface
interface ResponseInterface {
    res: {
        status: (code: int) => {
            json: (code: obj) => blank;
        };
    };
    Status: str;
    StatusCode: int;
    Message: str;
    Data: obj | blank;
}
/**
 * This is a TypeScript function that sends a success response with a specified status code, status,
 * message, and data.
 * @param {ResponseInterface}  - - `res`: The response object from the Express.js framework.
 */

/**
 * This is a TypeScript function that sends a success response with a status code, message, and data.
 * @param {ResponseInterface}  - - `res`: The response object from the Express.js framework.
 */
export const Response = ({ res, StatusCode, Status, Message, Data }: ResponseInterface): blank => {
    res.status(StatusCode).json({
        Status,
        Message,
        Data,
    }); // Send Response
}; // Success Response Function
