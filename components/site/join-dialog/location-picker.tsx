"use client";

import { useEffect, useMemo, useState } from "react";

import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { COUNTRIES } from "@/lib/geo/countries";
import { MAJOR_CITIES } from "@/lib/geo/major-cities";

const CITY_SEARCH_MIN_LENGTH = 2;
const CITY_SEARCH_DEBOUNCE_MS = 300;

// Currents is Gold Coast, Australia based — most applicants won't need to
// change this, so default it instead of making everyone pick it.
const DEFAULT_COUNTRY = COUNTRIES.find((country) => country.code === "AU")!;

interface StateOption {
  code: string;
  geonamesAdminCode1: string;
  name: string;
}

interface CityOption {
  id: string;
  name: string;
}

function useDebounced(value: string, delayMs: number): string {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

function fieldLabelClass(): string {
  return "mb-1.5 block font-space text-[10px] tracking-[0.14em] text-cream/50 uppercase";
}

function LocationField({
  children,
  label,
  required,
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  // Not a <label htmlFor>: the Combobox's underlying input's id is generated
  // internally by cmdk (see components/ui/combobox.tsx), so it's given an
  // accessible name via the `label` prop instead, not DOM label association.
  return (
    <div>
      <span className={fieldLabelClass()}>
        {label}
        {required && <span className="ml-0.5 text-lime/70">*</span>}
      </span>
      {children}
    </div>
  );
}

function LocationPicker() {
  const countryOptions = useMemo<ComboboxOption[]>(
    () =>
      COUNTRIES.map((country) => ({
        value: country.code,
        label: country.name,
      })),
    [],
  );

  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY.code);
  const [countryName, setCountryName] = useState(DEFAULT_COUNTRY.name);

  const [states, setStates] = useState<StateOption[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");

  const [cityQuery, setCityQuery] = useState("");
  const [cities, setCities] = useState<CityOption[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [cityId, setCityId] = useState("");
  const [cityName, setCityName] = useState("");

  const debouncedCityQuery = useDebounced(cityQuery, CITY_SEARCH_DEBOUNCE_MS);
  const selectedState = states.find((state) => state.code === stateCode);

  // Some countries (e.g. Singapore) have no state/region division in GeoNames
  // at all — treat the country itself as the "state" level for them instead
  // of leaving City permanently blocked on a selection that can't exist.
  const noStatesForCountry =
    Boolean(countryCode) && !statesLoading && states.length === 0;
  const effectiveStateCode = noStatesForCountry ? countryCode : stateCode;
  const effectiveStateName = noStatesForCountry ? countryName : stateName;

  const bundledCities = MAJOR_CITIES[countryCode];
  const useBundledCities = Boolean(bundledCities?.length);

  useEffect(() => {
    if (!countryCode) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- kicking off the loading state for this fetch, not deriving it.
    setStatesLoading(true);

    fetch(`/api/geo/states?country=${encodeURIComponent(countryCode)}`)
      .then((response) => response.json())
      .then((body: { states?: StateOption[] }) => {
        if (!cancelled) setStates(body.states ?? []);
      })
      .catch(() => {
        if (!cancelled) setStates([]);
      })
      .finally(() => {
        if (!cancelled) setStatesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [countryCode]);

  useEffect(() => {
    // Bundled countries filter the local dataset instead of hitting GeoNames.
    if (useBundledCities) return;

    if (
      !countryCode ||
      !effectiveStateCode ||
      debouncedCityQuery.trim().length < CITY_SEARCH_MIN_LENGTH
    ) {
      return;
    }

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- kicking off the loading state for this fetch, not deriving it.
    setCitiesLoading(true);

    const params = new URLSearchParams({
      country: countryCode,
      q: debouncedCityQuery.trim(),
    });
    if (selectedState)
      params.set("adminCode1", selectedState.geonamesAdminCode1);

    fetch(`/api/geo/cities?${params.toString()}`)
      .then((response) => response.json())
      .then((body: { cities?: CityOption[] }) => {
        if (!cancelled) setCities(body.cities ?? []);
      })
      .catch(() => {
        if (!cancelled) setCities([]);
      })
      .finally(() => {
        if (!cancelled) setCitiesLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    useBundledCities,
    countryCode,
    effectiveStateCode,
    selectedState?.geonamesAdminCode1,
    debouncedCityQuery,
  ]);

  const stateOptions: ComboboxOption[] = countryCode
    ? states.map((state) => ({ value: state.code, label: state.code }))
    : [];

  const cityOptions: ComboboxOption[] = useBundledCities
    ? (bundledCities ?? [])
        .filter(
          (city) =>
            !effectiveStateCode || city.stateCode === effectiveStateCode,
        )
        .map((city) => ({ value: city.id, label: city.name }))
    : effectiveStateCode
      ? cities.map((city) => ({ value: city.id, label: city.name }))
      : [];

  return (
    <>
      <LocationField label="Country" required>
        <Combobox
          label="Country"
          value={countryCode}
          options={countryOptions}
          placeholder="Select a country"
          searchPlaceholder="Search countries…"
          onSelect={(option) => {
            setCountryCode(option.value);
            setCountryName(option.label);
            setStateCode("");
            setStateName("");
            setCityId("");
            setCityName("");
            setCityQuery("");
          }}
        />
        <input type="hidden" name="countryCode" value={countryCode} readOnly />
        <input type="hidden" name="countryName" value={countryName} readOnly />
      </LocationField>

      <LocationField label="State / Region" required>
        <Combobox
          label="State / Region"
          value={stateCode}
          options={stateOptions}
          disabled={!countryCode || noStatesForCountry}
          loading={statesLoading}
          placeholder={
            noStatesForCountry
              ? "Not applicable for this country"
              : countryCode
                ? "Select a state / region"
                : "Select a country first"
          }
          searchPlaceholder="Search states…"
          emptyText="No states found."
          onSelect={(option) => {
            setStateCode(option.value);
            // The combobox shows the short code — look up the full name
            // (still what gets stored as state_name) separately.
            setStateName(
              states.find((state) => state.code === option.value)?.name ??
                option.label,
            );
            setCityId("");
            setCityName("");
            setCityQuery("");
          }}
        />
        <input
          type="hidden"
          name="stateCode"
          value={effectiveStateCode}
          readOnly
        />
        <input
          type="hidden"
          name="stateName"
          value={effectiveStateName}
          readOnly
        />
      </LocationField>

      <LocationField label="City" required>
        <Combobox
          label="City"
          value={cityId}
          options={cityOptions}
          disabled={!effectiveStateCode}
          loading={!useBundledCities && citiesLoading}
          placeholder={
            effectiveStateCode
              ? "Search for your city"
              : "Select a state / region first"
          }
          searchPlaceholder="Start typing…"
          emptyText={
            !useBundledCities &&
            cityQuery.trim().length < CITY_SEARCH_MIN_LENGTH
              ? "Keep typing…"
              : "No cities found."
          }
          query={useBundledCities ? undefined : cityQuery}
          onQueryChange={useBundledCities ? undefined : setCityQuery}
          onSelect={(option) => {
            setCityId(option.value);
            setCityName(option.label);
          }}
        />
        <input type="hidden" name="cityId" value={cityId} readOnly />
        <input type="hidden" name="cityName" value={cityName} readOnly />
      </LocationField>
    </>
  );
}

export { LocationPicker };
