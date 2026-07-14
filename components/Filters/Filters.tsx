"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import css from "./Filters.module.css";
import { fetchFiltersData } from "@/lib/api";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const priceOptions = [];
  if (data?.price) {
    for (let i = data.price.min; i <= data.price.max; i += 10) {
      priceOptions.push(i);
    }
  }

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
    router.push("/catalog", { scroll: false });
  };

  return (
    <form className={css.filtersForm} onSubmit={handleSearch}>
      <div className={css.filterGroup}>
        <label htmlFor="brand">Car brand</label>
        <select
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={css.select}
        >
          <option value="">Choose a brand</option>
          {data?.brands?.map((b: string) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className={css.filterGroup}>
        <label htmlFor="price">Price / 1 hour</label>
        <select
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={css.select}
        >
          <option value="">Choose a price</option>
          {priceOptions.map((p) => (
            <option key={p} value={p}>
              To ${p}
            </option>
          ))}
        </select>
      </div>

      <div className={css.filterGroup}>
        <label>Car mileage / km</label>
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
