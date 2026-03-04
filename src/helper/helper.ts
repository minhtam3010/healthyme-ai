import { BASIC_INFO } from "../constant/user";
import type { User } from "../interface/user";

// Helper function
function checkValue(
  id: string,
  val: number,
  obj?: { min?: number; max?: number },
) {
  return (val ?? 0) === 0 ||
    (val ?? 0) < (obj?.min ?? 0) ||
    (val ?? 0) > (obj?.max ?? 0)
    ? {
        id: id,
        message:
          (val ?? 0) === 0
            ? "Please fill out this form"
            : `Allow min: ${obj?.min} & max: ${obj?.max}`,
      }
    : null;
}

export function checkFields(user: User) {
  const notCompleteName =
    (user?.name ?? "") === ""
      ? {
          id: "name",
          message: "Please fill out this form",
        }
      : null;
  const notCompleteGender =
    (user?.gender ?? "") === ""
      ? {
          id: "gender",
          message: "Please fill out this form",
        }
      : null;

  const notCompleteAge = checkValue(
    "age",
    user?.age,
    BASIC_INFO?.flat()?.find((v) => v?.id === "age"),
  );

  const notCompleteWeight = checkValue(
    "weight",
    user?.weight,
    BASIC_INFO?.flat()?.find((v) => v?.id === "weight"),
  );
  const notCompleteHeight = checkValue(
    "height",
    user?.height,
    BASIC_INFO?.flat()?.find((v) => v?.id === "height"),
  );
  const notCompleteGoalWeight = checkValue(
    "goalWeight",
    user?.goalWeight,
    BASIC_INFO?.flat()?.find((v) => v?.id === "goalWeight"),
  );

  const fields = [
    notCompleteName,
    notCompleteAge,
    notCompleteGender,
    notCompleteWeight,
    notCompleteHeight,
    notCompleteGoalWeight,
  ]?.filter((v) => v !== null);

  return fields;
}
