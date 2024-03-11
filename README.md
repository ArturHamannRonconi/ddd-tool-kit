# ddd-tool-kit
A development tool kit for using Domain Driven Design in your Web API Node.js

## How to use?
You have two ways for use this tool kit...

  - Using our implementations
  - Using your own implementation

### Our implementation
```ts
  import { EmailValueObject, throwFailOutput } from '';

  const email = 'user@mail.com';

  const initEmail = EmailValueObject.init({ value: email });
  if (initEmail.isFailure) return throwFailOutput(initEmail); // Output fail

  const emailValueObject = initEmail.result as EmailValueObject;
  
  console.log(emailValueObject.value) // user@mail.com
```

### Your own implementation
```ts
  import { EmailValueObject, HttpStatus, IError, IBaseDomainValueObject } from '';

  export const INVALID_EMAIL: IError = {
    message: 'invalid email',
    statusCode: HttpStatus.BAD_REQUEST,
  };


  // This base value object interface has a "value: GenericType" in the content
  export interface IEmailProps extends IBaseDomainValueObject<string> {}


  export class EmailValueObject
    extends ValueObject<IEmailProps>
  {
    protected sanitizeProps(): void {
      // sanitize your this.value
    }

    protected isValidProps(): boolean {
      // verify is valid your this.value
    }

    static init(props: IEmailProps): Output<IError> | Output<EmailValueObject>
    {
      // create value object (constructor is alwats protected)
      const email = new EmailValueObject(props);
      
      // verify value object has valid props
      const isInvalidProps = !email.isValidProps();

      // if is invalid props return some output fail object with a message
      if (isInvalidProps) return Output.fail(INVALID_EMAIL);
      
      // if output is a success, return email value object
      return Output.success(email);
    }
  }
```

Much more than that, you have a complete kit of implementations, interfaces and abstract classes to be used.

#### Implementations
  - IdValueObject
  - IpValueObject
  - DateValueObject
  - EmailValueObject
  - PasswordValueObject
  - SessionEntity

#### Interfaces
  - IError
  - IUseCase
  - IController
  - IRepository
  - IUnidirectionalMapper
  - IBidirectionalMapper

  - IBaseDomainEntity
  - IBaseDomainAggregate
  - IBaseDomainValueObject

#### Abstract Classes
  - Entity
  - Aggregate
  - ValueObject
