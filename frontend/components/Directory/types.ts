export type TValue = {
  createdAt: string;
  updatedAt: string;
  uuid: string;
  value: string;
}

export type TFetchParams = {
    type: string;
    route: string;
    label: string;
  }

export type TDirectory = {
  values: TValue[];
  fetchParams: TFetchParams;
}
