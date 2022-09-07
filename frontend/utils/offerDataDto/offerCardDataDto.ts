const getPrice = (price: any) => `${price?.currency} ${price?.value}/${price?.unit}`;

export const offerHeaderDataDto = (data: any) => ({
  photos: data?.photos,
  name: data?.name,
  price: getPrice(data?.price),
  offerType: data?.offerType,
  categories: data?.categories,
  company: data?.company?.name,
});

export const offerDescriptionDataDto = (data: any) => ({
  description: data?.description,
  presentationUrl: data?.presentationUrl,
});
