import MedicineDetails from "@/components/modules/medicine/MedicineDetails";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ medicineId: string }>;
}) => {
  const { medicineId } = await params;
  return (
    <div>
      <MedicineDetails medicineId={medicineId} />
    </div>
  );
};

export default MedicineDetailsPage;
