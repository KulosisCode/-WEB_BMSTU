import { ValidationResult, Error } from "./validation";

import { isNumber, isString, error } from "./validUtil";

export const validatePerson = (obj: any): ValidationResult => {
    const errors: Error[] = [];

    if (!isNumber(obj.id_login)) {
      errors.push(error(`person.id_login: number expected, got ${typeof obj.id_user}`));
    }
  
    if (!isString(obj.name)) {
      errors.push(error(`person.name: string expected, got ${typeof obj.name}`));
    }

    if (!isNumber(obj.age)) {
        errors.push(error(`person.age: number expected, got ${typeof obj.age}`));
    }
    
    if (!isString(obj.email)) {
        errors.push(error(`person.email: string expected, got ${typeof obj.email}`));
    }
    
    if (!isString(obj.address)) {
        errors.push(error(`person.address: string expected, got ${typeof obj.address}`));
    }   
    return errors.length
      ? { ok: false, errors: errors }
      : { ok: true, errors: [] }
  }