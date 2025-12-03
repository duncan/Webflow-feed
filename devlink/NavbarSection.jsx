"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NavbarSection.module.css";

export function NavbarSection({ as: _Component = _Builtin.NavbarWrapper }) {
  return (
    <_Component
      className={_utils.cx(_styles, "navbar")}
      tag="div"
      config={{
        animation: "default",
        collapse: "small",
        docHeight: false,
        duration: 400,
        easing: "ease",
        easing2: "ease",
        noScroll: false,
      }}
    >
      <_Builtin.NavbarContainer
        className={_utils.cx(_styles, "header-container")}
        tag="div"
      >
        <_Builtin.Link
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "image")}
            loading="eager"
            width="50"
            height="50"
            alt=""
            src="https://cdn.prod.website-files.com/68cc47f2dd4fe7f3f4d6064f/692887dd4f661d917d006b9a_dd.png"
          />
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "link-block-3")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className={_utils.cx(_styles, "brand")} tag="div">
            {"Duncan Davidson"}
          </_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.NavbarContainer>
    </_Component>
  );
}
