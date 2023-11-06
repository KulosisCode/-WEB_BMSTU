import { isDate } from "util/types";
import { ValidationResult, Error } from "./validation";

import { isNumber, isString, error } from "./validUtil";

export const validateHistory= (obj: any): ValidationResult => {
    const errors: Error[] = [];

    if (!isNumber(obj.id_request)) {
      errors.push(error(`history.id: number expected, got ${typeof obj.id_history}`));
    }
  
    if (!isNumber(obj.id_staff)) {
      errors.push(error(`history.id_staff: number expected, got ${typeof obj.id_staff}`));
    }

    if (!isDate(obj.timeadded)) {
        errors.push(error(`history.timeAdded: date expected, got ${typeof obj.timeAdded}`));
    }
    return errors.length
      ? { ok: false, errors: errors }
      : { ok: true, errors: [] }
  }