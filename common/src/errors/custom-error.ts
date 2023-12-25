// this is where typescript excels compared to javascript
// creating a custom abstract class for errors
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // necessities for typescript extend feature
    super(message); // message will be sent up to the Error parent class for dev logging purposes
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // expect an array of errors with the following format
  // forces custom error types created to conform to the class rules and normalize the errors returned in a list format
  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
