The app is temporarily hosted at "https://roamify-dhm4.vercel.app/"

To run your React app with the provided package.json configuration, follow these steps:

1. Install Dependencies: First, make sure you have Node.js installed. Then, navigate to your project directory in the terminal and install the necessary dependencies. If you haven't set up a package.json file with the dependencies yet, you'll need to add React and Vite. Run:

    npm install react react-dom vite
2. Run the Development Server: After installing the dependencies, you can start the development server. Use the following command in your terminal:
    npm run dev

    - This command will use Vite to start a development server, and you should see output in the terminal indicating that your app is running, typically at http://localhost:3000 or http://localhost:5173.
3. Build the App: When you're ready to build your app for production, you can run:
    npm run build
    - This will create an optimized build of your app in a dist directory.
4. Preview the Build: To preview the production build locally, use:
    - npm run preview

__Tests__

5. You should be able to run your tests using the command:
    Command: npm test

    ● Test the search logic
            ○ Test keyword search
            ○ Test distance filters
            ○ Test time filters
            ○ Test status filter (all trips, completed, canceled)
    ● Test your reusable components
    ● Test each page


---------------------------------Code Structure ---------------------------------
Node_modules/
public/
src/
  └── Assets/
  └── components/
      ├── Home/
          └── home.jsx
          └── home.css
      ├── Linechart/
          └── linechart.jsx
      ├── Sidebar/
          └── sidebar.jsx
          └── sidebar.css
      ├── Trips/
          └── trips.jsx
          └── trips.css
      ├── Tripdestination/
          └── tripdestination.jsx
          └── tripdestination.css
  └── App.css
  └── App.jsx
  └── main.jsx
  └── index.css
index.html
package-lock.json
package.json
vite.config.js
eslint.config.js