
import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import Home from "./homepage";
import '@testing-library/jest-dom';

describe("Home page", () => {
  test("greetings ", () => {
    render(<Home />);

    expect(screen.getByTestId("welcome")).toBeInTheDocument();
    expect(screen.getByTestId("task-stats")).toBeInTheDocument();
    expect(screen.getByTestId("completed")).toBeInTheDocument();
    expect(screen.getByTestId("pending")).toBeInTheDocument();
    expect(screen.getByTestId("task-list")).toBeInTheDocument();
  });

  // test("shows an error if username is less than 6 characters", async () => {
  //   render(<Home />);
  //   const usernameInput = screen.getByTestId("username").querySelector("input");

  //   await act(async () => {
  //     fireEvent.input(usernameInput, { target: { value: "shor" } });
  //     fireEvent.blur(usernameInput);
  //   });

  //   await waitFor(() =>
  //     expect(screen.getByText("Username must be at least 5 characters")).toBeInTheDocument()
  //   );
  // });

  // test("shows an error if password is less than 8 characters", async () => {
  //   render(<Login />);

  //   const passwordInput = screen.getByTestId("password").querySelector("input"); // Get the actual input element

  //   await act(async () => {
  //     fireEvent.change(passwordInput, { target: { value: "1234567" } }); // Invalid password
  //     fireEvent.blur(passwordInput); // Trigger validation
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
  //   });
  // });

});




// import { render } from "@testing-library/react";
// import '@testing-library/jest-dom';
// import Home from "./homepage";
// import React from "react";
// import axios from "axios";
// jest.mock('axios');
// describe("Home page",()=> {
//     it("check the initial state",()=> {
//         render(<Home />);
//         const mockdata = axios.get.mockResolvedValue({
//             data:[{
//                 "id": 1,
//                 "task_name": "delectus aut autem",
//                 "iscompleted": false
//               },
//               {
//                 "id": 2,
//                 "task_name": "quis ut nam facilis et officia qui",
//                 "iscompleted": false
//               },
//               {
//                 "id": 3,
//                 "task_name": "fugiat veniam minus",
//                 "iscompleted": false
//               },
//               {
//                 "id": 4,
//                 "task_name": "et porro tempora",
//                 "iscompleted": true
//               },
//               {
//                 "id": 5,
//                 "task_name": "laboriosam mollitia et enim quasi adipisci quia provident illum",
//                 "iscompleted": true
//               },]
//         });
//         expect(mockdata).toHaveBeenCalledTimes(1);
//         expect(screen.getByText('Task 1')).toBeInTheDocument();
//     });
// });







// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import Home from "./Home";

// // Mocking localStorage
// beforeAll(() => {
//   Object.defineProperty(global, 'localStorage', {
//     value: {
//       getItem: jest.fn(),
//       setItem: jest.fn(),
//       removeItem: jest.fn(),
//       clear: jest.fn(),
//     },
//   });
// });

// describe("Home Component", () => {
//   it("should render the username and task stats", () => {
//     render(<Home />);

//     // Check if username is rendered
//     expect(screen.getByText(/Welcome, Chandra Shekhar/i)).toBeInTheDocument();

//     // Check if task stats are displayed
//     expect(screen.getByText(/Completed: 2/i)).toBeInTheDocument();
//     expect(screen.getByText(/Pending: 3/i)).toBeInTheDocument();
//   });

//   it("should toggle task completion when radio button is clicked", () => {
//     render(<Home />);

//     // Get the first task's radio button and click it
//     const task1Radio = screen.getAllByRole("radio")[0];
//     fireEvent.click(task1Radio);

//     // Verify if the task completion state has been toggled
//     expect(task1Radio).toBeChecked();
//   });

//   it("should delete a task when the delete button is clicked", () => {
//     render(<Home />);

//     // Get the first task's delete button
//     const deleteButton = screen.getAllByText("Delete")[0];
//     fireEvent.click(deleteButton);

//     // Verify if the task is removed from the list
//     expect(screen.queryByText("delectus aut autem")).not.toBeInTheDocument();
//   });

//   it("should add a new task when the add button is clicked", () => {
//     render(<Home />);

//     // Get the input field and add a new task
//     const input = screen.getByPlaceholderText(/Add a new task/i);
//     const addButton = screen.getByText(/Add Task/i);

//     // Simulate typing a new task and clicking the add button
//     fireEvent.change(input, { target: { value: "New Task" } });
//     fireEvent.click(addButton);

//     // Verify if the new task is added to the list
//     expect(screen.getByText("New Task")).toBeInTheDocument();
//   });
// });
