"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import css from "./Filters.module.css";
import { fetchFiltersData } from "@/lib/api";
import CustomSelect, { Option } from "@/components/CustomSelect/CustomSelect";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFiltersData,
  });

  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [minMileage, setMinMileage] = useState(
    searchParams.get("minMileage") || "",
  );
  const [maxMileage, setMaxMileage] = useState(
    searchParams.get("maxMileage") || "",
  );

  const [error, setError] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const urlBrand = searchParams.get("brand") || "";
      const urlPrice = searchParams.get("price") || "";
      const urlMin = searchParams.get("minMileage") || "";
      const urlMax = searchParams.get("maxMileage") || "";

      setBrand((prev) => (prev !== urlBrand ? urlBrand : prev));
      setPrice((prev) => (prev !== urlPrice ? urlPrice : prev));
      setMinMileage((prev) => (prev !== urlMin ? urlMin : prev));
      setMaxMileage((prev) => (prev !== urlMax ? urlMax : prev));
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [searchParams]);

  const priceOptions: Option[] = [];
  if (data?.price) {
    for (let i = data.price.min; i <= data.price.max; i += 10) {
      priceOptions.push({
        value: i,
        label: i.toString(),
      });
    }
  }

  const brandOptions: Option[] = data?.brands
    ? data.brands.map((b: string) => ({
        value: b,
        label: b,
      }))
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (minMileage && maxMileage) {
      if (Number(maxMileage) <= Number(minMileage)) {
        setError("Maximum mileage must be greater than minimum.");
        return;
      }
    }

    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (price) params.set("price", price);
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    setError("");
    router.push(pathname, { scroll: false });
  };

  return (
    <form className={css.filtersForm} onSubmit={handleSearch}>
      <div className={css.filterGroup}>
        <label className={css.label}>Car brand</label>
        <CustomSelect
          options={brandOptions}
          value={brand}
          onChange={(val) => setBrand(val as string)}
          placeholder="Choose a brand"
        />
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Price / 1 hour</label>
        <CustomSelect
          options={priceOptions}
          value={price ? Number(price) : ""}
          onChange={(val) => setPrice(val.toString())}
          placeholder="Choose a price"
          prefix="To $"
        />
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageInputs}>
          <input
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(e) => {
              setMinMileage(e.target.value);
              setError("");
            }}
            className={css.inputLeft}
            min={0}
          />
          <input
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => {
              setMaxMileage(e.target.value);
              setError("");
            }}
            className={css.inputRight}
            min={minMileage ? Number(minMileage) + 1 : 0}
          />
        </div>
        {error && (
          <span
            className={css.errorText}
            style={{
              color: "#ec383b",
              fontSize: "12px",
              marginTop: "4px",
              display: "block",
            }}
          >
            {error}
          </span>
        )}
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.searchBtn}>
          Search
        </button>
        <button type="button" onClick={handleClear} className={css.clearBtn}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
