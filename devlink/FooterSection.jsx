"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FooterSection.module.css";

export function FooterSection({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "section-8")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "", "", "footer-container")}
        grid={{
          type: "container",
        }}
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
            className={_utils.cx(_styles, "image-2")}
            loading="lazy"
            width="40"
            height="40"
            alt=""
            src="https://cdn.prod.website-files.com/68cc47f2dd4fe7f3f4d6064f/692887dd4f661d917d006b9a_dd.png"
          />
        </_Builtin.Link>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "footer-text")}
            tag="div"
          >
            {"© 2025 James Duncan Davidson"}
            <br />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "footer-text")}
            tag="div"
          >
            {"MADEWITHANDHOSTED IN"}
            <_Builtin.Link
              className={_utils.cx(_styles, "footer-link")}
              button={false}
              block=""
              options={{
                href: "#",
                target: "_blank",
              }}
            >
              {"WEBFLOW"}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
