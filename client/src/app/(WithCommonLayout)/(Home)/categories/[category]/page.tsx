import CategoryMedicines from "@/components/modules/medicine/CategoryMedicines";

const CategoryMedicinesPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  return <CategoryMedicines category={category} />;
};

export default CategoryMedicinesPage;
