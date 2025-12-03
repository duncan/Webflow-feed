import * as React from "react";
import * as Types from "./types";

declare function HeroPhotoSection(props: {
  as?: React.ElementType;
  /** This is the big photo*/
  photograph?: Types.Asset.Image;
  location?: React.ReactNode;
  camera?: React.ReactNode;
}): React.JSX.Element;
