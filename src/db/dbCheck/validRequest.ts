import { isDate } from "util/types";
import { ValidationResult, Error } from "./validation";

import { isNumber, isString, error } from "./validUtil";

export const validateRequest= (obj: any): ValidationResult => {
    const errors: Error[] = [];

    if (!isNumber(obj.id_room)) {
      errors.push(error(`request.id_room: number expected, got ${typeof obj.id_room}`));
    }
  
    if (!isNumber(obj.id_guest)) {
      errors.push(error(`request.id_guest: number expected, got ${typeof obj.id_guest}`));
    }

    if (!isDate(obj.timein)) {
        errors.push(error(`request.timeIn: date expected, got ${typeof obj.timeIn}`));
    }
    
    if (!isDate(obj.timeout)) {
        errors.push(error(`request.timeOut: date expected, got ${typeof obj.timeOut}`));
    }
    
    if (!isNumber(obj.price)) {
        errors.push(error(`request.price: number expected, got ${typeof obj.price}`));
    }  
    
    if (!isNumber(obj.status)) {
        errors.push(error(`request.status: number expected, got ${typeof obj.status}`));
    }  
    return errors.length
      ? { ok: false, errors: errors }
      : { ok: true, errors: [] }
  }