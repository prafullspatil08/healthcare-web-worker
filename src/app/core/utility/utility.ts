export function matchesCriteria(item: any, text: any): boolean {
  let searchText = text?.trim()?.toLowerCase();
  let personalDetails = item?.personal_details;
  let insuranceDetails = item?.insurance_details;
  let medicalHistory = item?.medical_history;
  let ongoingTreatment = item?.ongoing_treatment;
  return (
    (personalDetails?.first_name &&
      personalDetails?.first_name?.toLowerCase()?.includes(searchText)) ||
    (personalDetails?.last_name &&
      personalDetails?.last_name?.toLowerCase()?.includes(searchText)) ||
    (insuranceDetails?.provider &&
      insuranceDetails?.provider?.toLowerCase()?.includes(searchText)) ||
    ongoingTreatment?.some((treatMent: any) =>
      treatMent?.treatment_name?.toLowerCase()?.includes(searchText)
    ) ||
    medicalHistory.some((history: any) =>
      history?.condition?.toLowerCase()?.includes(searchText)
    ) ||
    (insuranceDetails?.expiry_date &&
      new Date(insuranceDetails?.expiry_date)
        ?.toISOString()
        ?.toLowerCase()
        ?.includes(searchText))
  );
}
