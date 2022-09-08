// Вынести в utils когда устаканится объект
const getPrice = (priceObj: any) => {
  if (priceObj) {
    const currency = priceObj?.currency ? priceObj?.currency : '';
    const value = priceObj?.value ? ` ${priceObj?.value}` : '';
    const unit = priceObj?.unit ? `/${priceObj?.unit}` : '';

    return currency + value + unit;
  }
  return null;
};

export const offerHeaderDataDto = (data: any) => ({
  photos: data?.photos,
  name: data?.name,
  price: getPrice(data?.price),
  offerType: data?.offerType,
  categories: data?.categories,
  company: data?.company,
});

export const offerDescriptionDataDto = (data: any) => ({
  description: data?.description,
  presentationUrl: data?.presentationUrl,
});
