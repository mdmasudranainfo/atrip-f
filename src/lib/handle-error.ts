import { toast } from "sonner"
import { ZodError } from "zod"
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

interface QuarkusValidationError {
  field: string;
  message: string;
}

const unknownError = "An unknown error occurred. Please try again later."

export function getErrorMessage(err: unknown, message = '') {
  if (err instanceof ZodError) {
    return err.errors[0]?.message ?? unknownError
  }
  else if (err instanceof Error) {

    if(err.message == 'NEXT_REDIRECT') {
      return 'Login required'
    }

    return err.message

  } else {
    return message || "An unknown error occurred. Please try again later."
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err)
  console.log({ errorMessage })

  return toast.error(errorMessage)
}


/**
 * Formats and sets errors from a server response to React Hook Form.
 *
* @param error - The error response object from the server.
 * @param setError - The `setError` function from React Hook Form.
 * @param fields - The Zod schema fields used for validation (to check if fields exist).
 */
export function formatAndSetErrors<T extends FieldValues>(
  violations: QuarkusValidationError[],
  setError: UseFormSetError<T>,
  fields: string[] // Updated to use 'ZodType' directly
) {
  if (violations?.length) {
    violations.forEach((violation) => {
      const fieldPath = violation.field.split(".").pop(); // Extract the actual field name
      // Check if the field exists in the schema before setting the error
      if (fieldPath && fields.includes(fieldPath)) {
        setError(`${fieldPath}` as Path<T>, {
          type: "server",
          message: violation.message,
        });
      }
    });
  }
}



