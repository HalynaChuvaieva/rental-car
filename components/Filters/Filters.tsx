"use client";
import { fetchFilters } from "@/lib/api";
import css from "./Filters.module.css";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

const formatLabel = (str: string) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Filters() {
  const {
    data: filterOptions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["camperFilters"],
    queryFn: fetchFilters,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <aside className={css.sidebar}>
      <label className={css.label} htmlFor="location">
        Location
      </label>
      <div className={css.location}>
        <svg className={css.icon} width="20" height="20">
          <use href="/sprite.svg#map"></use>
        </svg>
        <input
          type="text"
          id="location"
          className={css.input}
          placeholder="City"
          defaultValue="Kyiv"
        />
      </div>

      <h3 className={css.filters}>Filters</h3>

      {isLoading && <Loader />}
      {isError && <p>Error loading filters. Please try again.</p>}

      {filterOptions && (
        <ul className={css.filtersList}>
          {/* Camper form */}
          {filterOptions.forms?.length > 0 && (
            <li>
              <h4 className={css.filterTitle}>Camper form</h4>
              <ul className={css.radioList}>
                {filterOptions.forms.map((form) => (
                  <li key={form}>
                    <label className={css.radioLabel}>
                      <input
                        type="radio"
                        name="camperForm"
                        value={form}
                        className={css.visuallyHidden}
                      />
                      <span className={css.customRadio}></span>
                      {formatLabel(form)}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* Engine */}
          {filterOptions.engines?.length > 0 && (
            <li>
              <h4 className={css.filterTitle}>Engine</h4>
              <ul className={css.radioList}>
                {filterOptions.engines.map((engine) => (
                  <li key={engine}>
                    <label className={css.radioLabel}>
                      <input
                        type="radio"
                        name="engine"
                        value={engine}
                        className={css.visuallyHidden}
                      />
                      <span className={css.customRadio}></span>
                      {formatLabel(engine)}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* Transmission */}
          {filterOptions.transmissions?.length > 0 && (
            <li>
              <h4 className={css.filterTitle}>Transmission</h4>
              <ul className={css.radioList}>
                {filterOptions.transmissions.map((transmission) => (
                  <li key={transmission}>
                    <label className={css.radioLabel}>
                      <input
                        type="radio"
                        name="transmission"
                        value={transmission}
                        className={css.visuallyHidden}
                      />
                      <span className={css.customRadio}></span>
                      {formatLabel(transmission)}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      )}

      <ul className={css.buttonList}>
        <li>
          <button className={css.search}>Search</button>
        </li>
        <li>
          <button className={css.clear}>
            <svg width="12" height="12" className={css.clearIcon}>
              <use href="/sprite.svg#clear"></use>
            </svg>
            Clear filters
          </button>
        </li>
      </ul>
    </aside>
  );
}
