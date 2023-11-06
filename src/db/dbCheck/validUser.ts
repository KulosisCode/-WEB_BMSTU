import { ValidationResult, Error } from "./validation";

import { isNumber, isString, error } from "./validUtil";

export const validateUser = (obj: any): ValidationResult => {
    const errors: Error[] = [];
  
    if (!isString(obj.login)) {
      errors.push(error(`user.login: string expected, got ${typeof obj.login}`));
    }
  
    if (!isString(obj.password)) {
      errors.push(error(`user.password: string expected, got ${typeof obj.password}`));
    }
  
    if (!isNumber(obj.role)) {
      errors.push(error(`user.role: number expected, got ${typeof obj.role}`));
    }
  
    return errors.length
      ? { ok: false, errors: errors }
      : { ok: true, errors: [] }
  }