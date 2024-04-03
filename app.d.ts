// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./auth/lucia").Auth;
  type DatabaseUserAttributes = {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    gender: string;
    caste: string;
    maritalStatus: string;
    country: string;
    state: string,
    city: string;
    pfpArray: string[];
    dateOfBirth: DateTime;
    timeOfBirth: string;
    isPaid: Boolean;
    isProfileComplete: boolean;
  };
  type DatabaseSessionAttributes = {};
}
