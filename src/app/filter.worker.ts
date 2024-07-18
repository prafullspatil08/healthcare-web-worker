/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { array, term } = data;

  const matchesCriteria = (item: any, term: string): boolean => {
    const personalDetails = item.personal_details;
    const insuranceDetails = item.insurance_details;
    const medicalHistory = item.medical_history;
    const ongoingTreatment = item.ongoing_treatment;

    return (
      (personalDetails.first_name && personalDetails.first_name.toLowerCase().includes(term)) ||
      (personalDetails.last_name && personalDetails.last_name.toLowerCase().includes(term)) ||
      (insuranceDetails.provider && insuranceDetails.provider.toLowerCase().includes(term)) ||
      (ongoingTreatment.some((t: any) => t.treatment_name.toLowerCase().includes(term))) ||
      (medicalHistory.some((m: any) => m.condition.toLowerCase().includes(term))) ||
      (insuranceDetails.expiry_date && new Date(insuranceDetails.expiry_date).toISOString().toLowerCase().includes(term))
    );
  };

  const filtered = array.filter((item: any) => matchesCriteria(item, term));

  postMessage(filtered);
});
