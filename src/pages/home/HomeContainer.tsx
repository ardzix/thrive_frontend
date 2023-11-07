import React from "react";
import CustomLayout from "../shared/components/CustomLayout";
import CategorySection from "./components/CategorySection";

export default function HomeContainer() {
  return (
    <CustomLayout>
      <h1>HomeContainer</h1>
      <CategorySection />
    </CustomLayout>
  );
}
