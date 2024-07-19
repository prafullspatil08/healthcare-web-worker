export function matchesCriteria(item: any, text: any): boolean {
  const searchText = text?.trim()?.toLowerCase();

  if (!searchText) return false;

  const {
    personal_details,
    insurance_details,
    medical_history,
    ongoing_treatment,
  } = item;

  return (
    personal_details?.first_name?.toLowerCase()?.includes(searchText) ||
    personal_details?.last_name?.toLowerCase()?.includes(searchText) ||
    insurance_details?.provider?.toLowerCase()?.includes(searchText) ||
    ongoing_treatment?.some((treatment: any) =>
      treatment?.treatment_name?.toLowerCase()?.includes(searchText)
    ) ||
    medical_history?.some((history: any) =>
      history?.condition?.toLowerCase()?.includes(searchText)
    ) ||
    (insurance_details?.expiry_date &&
      new Date(insurance_details.expiry_date)
        .toISOString()
        .toLowerCase()
        .includes(searchText))
  );
}
