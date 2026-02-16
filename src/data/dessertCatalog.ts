import baklavaDesktop from "../assets/images/image-baklava-desktop.jpg";
import baklavaMobile from "../assets/images/image-baklava-mobile.jpg";
import baklavaTablet from "../assets/images/image-baklava-tablet.jpg";
import brownieDesktop from "../assets/images/image-brownie-desktop.jpg";
import brownieMobile from "../assets/images/image-brownie-mobile.jpg";
import brownieTablet from "../assets/images/image-brownie-tablet.jpg";
import cakeDesktop from "../assets/images/image-cake-desktop.jpg";
import cakeMobile from "../assets/images/image-cake-mobile.jpg";
import cakeTablet from "../assets/images/image-cake-tablet.jpg";
import cremeBruleeDesktop from "../assets/images/image-creme-brulee-desktop.jpg";
import cremeBruleeMobile from "../assets/images/image-creme-brulee-mobile.jpg";
import cremeBruleeTablet from "../assets/images/image-creme-brulee-tablet.jpg";
import macaronDesktop from "../assets/images/image-macaron-desktop.jpg";
import macaronMobile from "../assets/images/image-macaron-mobile.jpg";
import macaronTablet from "../assets/images/image-macaron-tablet.jpg";
import meringueDesktop from "../assets/images/image-meringue-desktop.jpg";
import meringueMobile from "../assets/images/image-meringue-mobile.jpg";
import meringueTablet from "../assets/images/image-meringue-tablet.jpg";
import pannaCottaDesktop from "../assets/images/image-panna-cotta-desktop.jpg";
import pannaCottaMobile from "../assets/images/image-panna-cotta-mobile.jpg";
import pannaCottaTablet from "../assets/images/image-panna-cotta-tablet.jpg";
import tiramisuDesktop from "../assets/images/image-tiramisu-desktop.jpg";
import tiramisuMobile from "../assets/images/image-tiramisu-mobile.jpg";
import tiramisuTablet from "../assets/images/image-tiramisu-tablet.jpg";
import waffleDesktop from "../assets/images/image-waffle-desktop.jpg";
import waffleMobile from "../assets/images/image-waffle-mobile.jpg";
import waffleTablet from "../assets/images/image-waffle-tablet.jpg";

interface DessertImageSources {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface DessertCatalogItem {
  category: string;
  name: string;
  price: number;
  imageSources: DessertImageSources;
}

const dessertCatalogItems: DessertCatalogItem[] = [
  {
    category: "Waffle",
    name: "Waffle with Berries",
    price: 6.5,
    imageSources: {
      mobile: waffleMobile,
      tablet: waffleTablet,
      desktop: waffleDesktop,
    },
  },
  {
    category: "Crème Brûlée",
    name: "Vanilla Bean Crème Brûlée",
    price: 7,
    imageSources: {
      mobile: cremeBruleeMobile,
      tablet: cremeBruleeTablet,
      desktop: cremeBruleeDesktop,
    },
  },
  {
    category: "Macaron",
    name: "Macaron Mix of Five",
    price: 8,
    imageSources: {
      mobile: macaronMobile,
      tablet: macaronTablet,
      desktop: macaronDesktop,
    },
  },
  {
    category: "Tiramisu",
    name: "Classic Tiramisu",
    price: 5.5,
    imageSources: {
      mobile: tiramisuMobile,
      tablet: tiramisuTablet,
      desktop: tiramisuDesktop,
    },
  },
  {
    category: "Baklava",
    name: "Pistachio Baklava",
    price: 4,
    imageSources: {
      mobile: baklavaMobile,
      tablet: baklavaTablet,
      desktop: baklavaDesktop,
    },
  },
  {
    category: "Pie",
    name: "Lemon Meringue Pie",
    price: 5,
    imageSources: {
      mobile: meringueMobile,
      tablet: meringueTablet,
      desktop: meringueDesktop,
    },
  },
  {
    category: "Cake",
    name: "Red Velvet Cake",
    price: 4.5,
    imageSources: {
      mobile: cakeMobile,
      tablet: cakeTablet,
      desktop: cakeDesktop,
    },
  },
  {
    category: "Brownie",
    name: "Salted Caramel Brownie",
    price: 5.5,
    imageSources: {
      mobile: brownieMobile,
      tablet: brownieTablet,
      desktop: brownieDesktop,
    },
  },
  {
    category: "Panna Cotta",
    name: "Vanilla Panna Cotta",
    price: 6.5,
    imageSources: {
      mobile: pannaCottaMobile,
      tablet: pannaCottaTablet,
      desktop: pannaCottaDesktop,
    },
  },
];

// Returns the static dessert catalog used by the current visual-only empty page.
export function getDessertCatalogItems(): DessertCatalogItem[] {
  return dessertCatalogItems;
}
