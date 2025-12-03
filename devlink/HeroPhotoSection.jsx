"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./HeroPhotoSection.module.css";

export function HeroPhotoSection({
  as: _Component = _Builtin.Section,
  photograph = "",
  location = "LOCATION",
  camera = "CAMERA",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "hero-photo-section")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "container-16")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "hero-photo")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src={photograph}
        />
      </_Builtin.BlockContainer>
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "caption-container")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Paragraph className={_utils.cx(_styles, "location")}>
          {location}
        </_Builtin.Paragraph>
        <_Builtin.Paragraph className={_utils.cx(_styles, "camera")}>
          {camera}
        </_Builtin.Paragraph>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
