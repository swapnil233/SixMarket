import { Condition } from "@prisma/client";

export default function conditionToEnglish(condition: Condition) {
  switch (condition) {
    case Condition.NEW:
      return "New";
    case Condition.LIKE_NEW:
      return "Like New";
    case Condition.EXCELLENT:
      return "Excellent";
    case Condition.GOOD:
      return "Good";
    case Condition.FAIR:
      return "Fair";
    case Condition.SALVAGE:
      return "Salvage";
    default:
      return "Unknown";
  }
}
