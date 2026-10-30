// Economics of the review job: a coach reviews members' submissions against the owner's rubric, with a first-pass
// draft from `skool-kit review`. Kept apart from the renewal calculator on purpose: this case must stand without any
// renewal change. Every input is an assumption until a pilot measures it (minutes per review, share saved).
//
// Four kinds of benefit, never added together:
//   1. cash avoided   - paid reviewer hours actually cut (only the share of saved hours that were paid and cut)
//   2. capacity freed - saved hours nobody stops paying for (time back, not money)
//   3. incremental net contribution - only if freed time produces new sales; not estimated here (0)
//   4. speculative    - renewals; excluded (0)
import { PILOT_OFFER } from "./pilot-offer.js";
import { EFFORT_TOTALS, mid } from "./effort.js";

export const REVIEW_CASES = {
  // The design target: a community that already pays coaches by the hour to review work.
  target: { label: "Design target: 100 reviews a month by paid coaches, 30% of review time saved",
    reviewsPerMonth: 100, manualMinutes: 15, savedShare: 0.3, coachHourCost: 35, paidCutShare: 1 },
  // Downside: the saving seen for a grading tool in a large course (about 10%), and no renewal change.
  downside: { label: "Downside: same volume, 10% saved, no renewal change",
    reviewsPerMonth: 100, manualMinutes: 15, savedShare: 0.1, coachHourCost: 35, paidCutShare: 1 },
  // A smaller community where the owner reviews unpaid: nothing becomes cash.
  small: { label: "Owner reviews 30 a month unpaid, 30% saved",
    reviewsPerMonth: 30, manualMinutes: 15, savedShare: 0.3, coachHourCost: 35, paidCutShare: 0 },
};

export const REVIEW_COMMON = {
  months: 12,
  fee: PILOT_OFFER.terms.feeAmount,
  ownerSetupHours: mid(EFFORT_TOTALS.customerSetup),
  ownerHourValue: 50,
  rubricUpkeepHoursMonthly: 0.5,   // keeping the rubric in step with the lessons
  softwareMonthly: 0,              // the review tool is free; coaches use their own computer
  logMinutesPerReview: 0.5,        // the coach records decision and minutes during the pilot month only
};

export function reviewEconomics(input) {
  const i = { ...REVIEW_COMMON, ...input };
  const savedHoursMonthly = (i.reviewsPerMonth * i.manualMinutes * i.savedShare) / 60;
  const cashAvoided = savedHoursMonthly * i.paidCutShare * i.coachHourCost * i.months;
  const capacityHours = savedHoursMonthly * (1 - i.paidCutShare) * i.months;
  const cashCosts = i.fee + i.softwareMonthly * i.months;
  const timeCosts = (i.ownerSetupHours + i.rubricUpkeepHoursMonthly * i.months) * i.ownerHourValue
    + (i.reviewsPerMonth * i.logMinutesPerReview / 60) * i.coachHourCost;
  return {
    inputs: i,
    savedHoursMonthly,
    cashAvoided,
    capacityHours,
    capacityValue: capacityHours * i.coachHourCost,
    incrementalContribution: 0,
    speculative: 0,
    cashCosts,
    timeCosts,
    cashMultiple: cashAvoided / cashCosts,
    // Cash and capacity, against cash and time: capacity is valued, but it is not money unless hours are cut.
    totalMultiple: (cashAvoided + capacityHours * i.coachHourCost) / (cashCosts + timeCosts),
    breakEvenMonths: savedHoursMonthly * i.paidCutShare * i.coachHourCost > 0
      ? (cashCosts + timeCosts) / (savedHoursMonthly * i.paidCutShare * i.coachHourCost) : null,
  };
}
