export type Error = { message: string }

export type ValidationResult = 
    | { ok: true, errors: []}
    | { ok: false, errors: Error[] | []}