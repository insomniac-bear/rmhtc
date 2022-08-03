import { ICompanyAddress, ICompanyData } from './CompanyCard.props';

export const arrayToObj = (arr: object[]) => arr.reduce((obj: any, item: any) => {
  const oldObj = obj;
  const newObj = (oldObj[item.type.replace(' ', '')] = item.value, oldObj);
  return newObj;
}, {});

// добавить возможность настройки актуального адреса?
export const findGeo = (arr: object[]) => {
  const current = arr.find((el: any) => el.addressType === 'Legal' || 'Actual' || 'Mailing');
  if (typeof current !== 'undefined') {
    return `${current.address.country}, ${current.address.city}`;
  }
  return null;
};

export const addressDataDto = (data: ICompanyAddress) => ({
  type: data?.addressType,
  address: {
    postCode: data?.postCode,
    country: data?.country,
    city: data?.city,
    street: data?.street,
    buildNum: data?.buildNum,
    roomNum: data?.roomNum,
  },
  value: Object.values(data).join(', ').replace(`, ${data?.addressType}`, ''),
});

export const headerDataDto = (data: ICompanyData) => ({
  logoUrl: data?.logoUrl,
  name: data?.name,
  description: data?.description,
  geo: findGeo(data?.addresses.map((el) => addressDataDto(el))),
});

export const basicInfoDataDto = (data: ICompanyData) => ({
  website: data?.website,
  ceo: data?.ceo,
  bussinesType: data?.bussinesType,
  ceoDocUrl: data?.ceoDocUrl,
});

export const legalInfoDataDto = (data) => ({
  legalForm: data?.legalForm,
  qcEmployees: data?.qcEmployees,
  budgetOfYear: data?.budgetOfYear,
  yearOfFoundation: data?.yearOfFoundation,
  regDocUrl: data?.regDocUrl,
  issuingAuthority: data?.issuingAuthority,
  [data?.regNumName]: data?.regNumber,
});

// Объект со всеми контактами
// export const contactsInfoDataDto = (data) => ({
//   ...arrayToObj(data?.addresses.map((el) => addressDataDto(el))),
//   ...arrayToObj(data?.contacts),
//   ...arrayToObj(data?.messangers),
// });
