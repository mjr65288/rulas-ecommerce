"use client";
import React from "react";
import { classNames } from "primereact/utils";
import { Container } from "react-bootstrap";

const Content = (props: any) => {
  return (
    <Container
      fluid
      className={classNames("content", { "is-open": props.isOpen })}
    >
      {props.children}
    </Container>
  );
};

export default Content;
