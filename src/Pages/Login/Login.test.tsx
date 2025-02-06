import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import Login from "./Login";
import '@testing-library/jest-dom';

describe("Login Form Validation", () => {
  test("renders input fields and login button", () => {
    render(<Login />);

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  test("shows an error if username is less than 6 characters", async () => {
    render(<Login />);
    const usernameInput = screen.getByTestId("username").querySelector("input");

    await act(async () => {
      fireEvent.input(usernameInput, { target: { value: "shor" } });
      fireEvent.blur(usernameInput);
    });

    await waitFor(() =>
      expect(screen.getByText("Username must be at least 5 characters")).toBeInTheDocument()
    );
  });

  test("shows an error if password is less than 8 characters", async () => {
    render(<Login />);

    const passwordInput = screen.getByTestId("password").querySelector("input"); // Get the actual input element

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "1234567" } }); // Invalid password
      fireEvent.blur(passwordInput); // Trigger validation
    });
    await waitFor(() => {
      expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
    });
  });

});
