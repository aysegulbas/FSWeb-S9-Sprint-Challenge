import AppFunctional from "./AppFunctional";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
beforeEach(() => {
  render(<AppFunctional />);
});
test("sanity", () => {
  expect(true).toBe(true);
});

test(() => {
  expect(screen.getByText("Koordinatlar (2,2)").toBeInTheDocument());
});
test(() => {
  expect(screen.getByText("0 kere ilerlediniz").toBeInTheDocument());
});
test(() => {
  expect(screen.getByText("YUKARI").toBeInTheDocument());
  expect(screen.getByText("AŞAĞI").toBeInTheDocument());
  expect(screen.getByText("SOL").toBeInTheDocument());
  expect(screen.getByText("SAĞ").toBeInTheDocument());
  expect(screen.getByText("reset").toBeInTheDocument());
});

test(() => {
  const mail = screen.getByPlaceholderText("emailgirin");
  userEvent.type(mail, "aysegul@aysegul.com");
  expect(screen.queryByTestId("email").textContent).toBe("aysegul@aysegul.com");
});
