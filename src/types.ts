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
