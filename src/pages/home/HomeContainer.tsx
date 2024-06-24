import React from "react";

import CategorySection from "./components/CategorySection";
import CustomLayout from "../shared/components/CustomLayout";

export default function HomeContainer() {
  return (
    <CustomLayout>
      <h1>HomeContainer</h1>
      <CategorySection />
    </CustomLayout>
  );
}
