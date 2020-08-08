import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Questions from "./questions";

test("renders the Questions page", () => {
  const { getByText } = render(<Questions />);
  const welcomeText = getByText(/Welcome to OYNB!!/i);
  expect(welcomeText).toBeInTheDocument();
});

test("renders the name box", () => {
  const { getByText } = render(<Questions />);
  const welcomeText = getByText(/What is your name/i);
  expect(welcomeText).toBeInTheDocument();
});

test("renders the loading page when next is clicked", () => {
  const { getByText } = render(<Questions />);

  userEvent.click(screen.getByRole("button"));

  const loading = getByText(/Loading.../i);
  expect(loading).toBeInTheDocument();
});
