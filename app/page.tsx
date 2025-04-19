"use client";

import { AddBouquetModal } from "@/components/add-bouquet-modal";
import { BouquetCard } from "@/components/bouquet-card";
import { SelectBouquetsModal } from "@/components/share-modal";
import { useGetAllBouquets } from "@/hooks/use-bouquet-hook";
import { useHeader } from "@/hooks/use-header";
import { Bouquet } from "@/types";
import { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { LoadingGrid } from "@/components/loading";
import { ErrorComponent } from "@/components/error-component";

export default function Home() {
  const { data, isLoading, isError } = useGetAllBouquets();
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }, []);

  if (isLoading) {
    return <LoadingGrid />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  const bouquets: Bouquet[] = data;

  return (
    <div className="container mx-auto p-6">
      <div>
        <div className="flex flex-col md:flex-row  justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Bouquet List</h2>
          <div className="flex gap-4 items-center">
            <SelectBouquetsModal bouquets={bouquets} />
            <AddBouquetModal />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bouquets.map((bouquet) => (
          <BouquetCard key={bouquet._id} bouquet={bouquet} />
        ))}
      </div>
    </div>
  );
}
