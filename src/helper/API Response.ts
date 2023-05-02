// This file is used to send response to client

// interface for Success Response
interface Success_Response {
    res: any;
    StatusCode: number;
    Status: string;
    Message: string;
    Data: any;
}

export const Success_Response = ({res, StatusCode, Status, Message, Data}:Success_Response) => {
    res.status(StatusCode).json({
        Status: Status,
        Message: Message,
        Data: Data,
    }); // Send Response
}; // Success Response Function

// interface for Failed Response
interface Failed_Response {
    res: any;
    StatusCode: number;
    Status: string;
    Message: string;
    Data: any;
}

export const Failed_Response = ({res, StatusCode, Status, Message, Data}:Failed_Response) => {
    res.status(StatusCode).json({
        Status: Status,
        Message: Message,
        Data: Data,
    }); // Send Response
}; // Failed Response Function