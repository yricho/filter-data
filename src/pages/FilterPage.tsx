import {
  Building2,
  ChevronDown,
  ChevronRight,
  Earth,
  Map,
  MapPin,
  MoveDown,
  SlidersHorizontal,
} from "lucide-react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import type {
  BreadcrumbComponentProps,
  District,
  Province,
  Regency,
  SelectOptionProps,
} from "../types";

export async function regionLoader() {
  const res = await fetch("/data/indonesia_regions.json");
  return res.json();
}

export const BreadcrumbComponent = ({
  province,
  regency,
  district,
}: BreadcrumbComponentProps) => (
  <div className="breadcrumb flex items-center px-12 py-6 text-sm text-gray-400 bg-white border-b border-gray-200">
    Indonesia
    {province && <ChevronRight className="w-4 h-4 mx-2" />}
    {province && province.name}
    {regency && <ChevronRight className="w-4 h-4 mx-2" />}
    {regency && regency.name}
    {district && <ChevronRight className="w-4 h-4 mx-2" />}
    {district && district.name}
  </div>
);

export const SelectComponent = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled,
  icon = <Map className="w-4 h-4" />,
}: SelectOptionProps) => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <select
      disabled={disabled}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-xl pl-12 pr-10 py-3 appearance-none bg-white"
    >
      <option value="">Pilih {label}</option>
      {options.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
      <ChevronDown className="w-4 h-4" />
    </div>
  </div>
);

export default function FilterPage() {
  const { provinces, regencies, districts } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const province = searchParams.get("province") || "";
  const regency = searchParams.get("regency") || "";
  const district = searchParams.get("district") || "";

  const filteredRegencies = regencies.filter(
    (r: Regency) => r.province_id === Number(province),
  );

  const filteredDistricts = districts.filter(
    (d: District) => d.regency_id === Number(regency),
  );

  const selectedProvince = provinces.find(
    (p: Province) => p.id === Number(province),
  );
  const selectedRegency = regencies.find(
    (r: Regency) => r.id === Number(regency),
  );
  const selectedDistrict = districts.find(
    (d: District) => d.id === Number(district),
  );

  const handleChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ province: e.target.value });
  };

  const handleChangeRegency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      province,
      regency: e.target.value,
    });
  };

  const handleChangeDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      province,
      regency,
      district: e.target.value,
    });
  };

  const handleResetFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-80 border-r border-gray-200 p-8">
        <div className="mb-10 flex items-center space-x-3">
          <Earth />
          <h1 className="text-lg font-semibold">Frontend Assessment</h1>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-widest text-gray-400 mb-2">
              FILTER WILAYAH
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">
              PROVINSI
            </label>
            <SelectComponent
              label="Provinsi"
              name="province"
              value={province}
              onChange={handleChangeProvince}
              options={provinces}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">
              KOTA/KABUPATEN
            </label>
            <SelectComponent
              label="Kota/Kabupaten"
              name="regency"
              value={regency}
              onChange={handleChangeRegency}
              options={filteredRegencies}
              icon={<Building2 className="w-4 h-4" />}
              disabled={!province}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">
              KECAMATAN
            </label>
            <SelectComponent
              label="Kecamatan"
              name="district"
              value={district}
              onChange={handleChangeDistrict}
              options={filteredDistricts}
              icon={<MapPin className="w-4 h-4" />}
              disabled={!regency}
            />
          </div>

          <button
            onClick={handleResetFilter}
            className="flex w-full border-2 border-blue-500 justify-center gap-2 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50"
          >
            <SlidersHorizontal />
            RESET
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <BreadcrumbComponent
          province={selectedProvince}
          regency={selectedRegency}
          district={selectedDistrict}
        />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-16">
            {selectedProvince && (
              <div>
                <p className="text-xs tracking-widest text-blue-400 mb-4">
                  PROVINSI
                </p>
                <h2 className="text-6xl font-bold text-gray-900">
                  {selectedProvince.name}
                </h2>
              </div>
            )}

            {selectedRegency && (
              <div className="justify-items-center space-y-12">
                <MoveDown className="text-gray-300" />
                <p className="text-xs tracking-widest text-blue-400">
                  KOTA / KABUPATEN
                </p>
                <h2 className="text-5xl font-bold text-gray-900">
                  {selectedRegency.name}
                </h2>
              </div>
            )}

            {selectedDistrict && (
              <div className="justify-items-center space-y-12">
                <MoveDown className="text-gray-300" />
                <p className="text-xs tracking-widest text-blue-400">
                  KECAMATAN
                </p>
                <h2 className="text-4xl font-bold text-gray-900">
                  {selectedDistrict.name}
                </h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
