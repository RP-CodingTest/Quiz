import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Questions from "./questions";

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve([{Question: 'Test Question'}]) })
);

test("renders the Questions page", async () => {
  await act(async () => {
    const { getByText } = render(<Questions />);
    const welcomeText = getByText(/Welcome to OYNB!!/i);
    expect(welcomeText).toBeInTheDocument();
  });
});

test("renders the name box", async () => {
  await act(async () => {
    const { getByText } = render(<Questions />);
    const welcomeText = getByText(/What is your name/i);
    expect(welcomeText).toBeInTheDocument();
  });
});

test("renders the question data from the mocked API call", async () => {
  await act(async () => {
    render(<Questions />);
  });

  userEvent.click(screen.getByText("Next"));
  expect(screen.getByText('Test Question')).toBeInTheDocument();
});
