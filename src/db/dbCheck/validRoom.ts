import { ValidationResult, Error } from "./validation";

import { isNumber, isString, error } from "./validUtil";

export const validateRoom = (obj: any): ValidationResult => {
    const errors: Error[] = [];
  
    if (!isNumber(obj.number)) {
      errors.push(error(`room.number: number expected, got ${typeof obj.number}`));
    }
  
    if (!isNumber(obj.status)) {
      errors.push(error(`room.status: number expected, got ${typeof obj.status}`));
    }
  
    if (!isNumber(obj.priceperday)) {
      errors.push(error(`room.priceperday: number expected, got ${typeof obj.price}`));
    }
  
    return errors.length
      ? { ok: false, errors: errors }
      : { ok: true, errors: [] }
  }