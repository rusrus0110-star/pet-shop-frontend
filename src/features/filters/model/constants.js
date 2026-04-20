export const DEFAULT_FILTERS = {
  priceFrom: "",
  priceTo: "",
  discountOnly: false,
  sortValue: "default",
};

export const SORT_OPTIONS = [
  { value: "default", label: "by default" },
  { value: "price-high-low", label: "price: high-low" },
  { value: "price-low-high", label: "price: low-high" },
];
