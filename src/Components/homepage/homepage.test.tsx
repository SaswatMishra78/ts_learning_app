import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./homepage";
import "@testing-library/jest-dom";
import axios from "axios";
jest.mock("axios");

describe("Home Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: "Task One", completed: false },
        { id: 2, title: "Task Two", completed: true },
      ],
    });
  });

  test("renders tasks correctly", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Task One")).toBeInTheDocument();
      expect(screen.getByText("Task Two")).toBeInTheDocument();
    });
  });

  test("toggles task completion", async () => {
    render(<Home />);
    await waitFor(() => {
      const checkbox = screen.getAllByRole("checkbox")[0];
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  // test("deletes a task", async () => {
  //   render(<Home />);
  //   await waitFor(() => {
  //     const deleteButton = screen.getAllByText("Delete")[0];
  //     fireEvent.click(deleteButton);
  //     expect(screen.queryByText("Task One")).not.toBeInTheDocument();
  //   });
  // });

  test("adds a new task", async () => {
    render(<Home />);
    await waitFor(() => {
      const input = screen.getByLabelText("Add a new task");
      const addButton = screen.getByText("Add Task");
      fireEvent.change(input, { target: { value: "New Task" } });
      fireEvent.click(addButton);
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });
});
