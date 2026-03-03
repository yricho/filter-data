export type Province = {
  id: number;
  name: string;
};

export type Regency = {
  id: number;
  name: string;
  province_id: number;
};

export type District = {
  id: number;
  name: string;
  regency_id: number;
};

export type BreadcrumbComponentProps = {
  province?: Province;
  regency?: Regency;
  district?: District;
};

export type SelectOptionProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: number; name: string }[];
  disabled?: boolean;
  icon?: React.ReactNode;
};
