import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconVariationType = "subtract" | "add" | "remove";

export type ButtonVariationType = "addToCart" | "primary";

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/* Icon variation */
export interface IconButtonProps extends BaseButtonProps {
  variation: "icon";
  variationType: IconVariationType;
}

/* Regular button variation */
export interface RegularButtonProps extends BaseButtonProps {
  variation: "button";
  variationType: ButtonVariationType;
}

export type ButtonProps = IconButtonProps | RegularButtonProps;