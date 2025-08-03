## Technologies Used

- React 19
- Vite
- D3.js
- Tailwind CSS
- JSON Server
- ESLint

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd front-end-technical-test
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the URL for the mock API server.
    ```env
    VITE_API_BASE_URL="http://localhost:3000/data"
    ```

### Running the Application

You need to run two processes in separate terminal windows: the **mock API server** and the **Vite development server**.

1.  **Start the mock API server:**
    This will serve the `data.json` file on `http://localhost:3000`.

    ```bash
    npm run server
    ```

2.  **Start the Vite development server:**
    This will start the React application, which you can view at `http://localhost:5173` (or another port if 5173 is busy).
    ```bash
    npm run dev
    ```

---
