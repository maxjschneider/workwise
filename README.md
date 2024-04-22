# WorkWise

## Product Demo

Check out our live deployment of [WorkWise](https://workwise-frontend.onrender.com/)! This deployment is running on a free tier, so it may take a minute or so for the page to load. The web page goes dormant if it hasn't been opened recently; it takes time to spin up.

## Product Vision

WorkWise seeks to provide an all-encompassing software solution to workplace management. We aim to be the go-to platform for any business seeking a comprehensive, user-friendly, and efficient tool to manage their workplace.

Our primary focus is on employee scheduling. Businesses desire an intuitive and dynamic system that adapts to their needs, and is easy to use for both the employer and the employee, and that is what we intend to deliver.

Beyond just scheduling, WorkWise will also be designed to handle taxes, employee files, shift approvals, time-off requests, and much more.

## Initial Setup

Prerequisites:

- Node.js v20.11.1 LTS

Install Server Packages:

```
cd mern/server
npm install
```

Install Client Packages:

```
cd mern/client
npm install
```

## How To Run

Start Server:

```
cd mern/server
npm start
```

Start Frontend:

```
cd mern/client
npm start
```

## Testing

**Frontend Testing**
The frontend is tested through manual test scripts. These scripts are located in the [Wiki section](https://code.vt.edu/cs-3704-null/scheduler/-/wikis/home) of this repository. All of the test scripts we wrote are present in the sidebar located on the right side of the main Wiki page. Each script contains a series of steps and assertions to test the various frontend components.


**Backend Testing**
The backend tests are performed automatically. Automated testing can only be done locally.

To run the test suite, first start the server in test mode:

```
cd mern/server
npm start test
```

Then, in a seperate terminal, run the tests:

```
cd mern/server
npm test
```

## Formatting

This repository is formatted with Prettier.

To install on VSCode:

- Install the [Prettier VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Open VSCode settings, (COMMAND + ,) on macOS or (CTRL + ,) on Windows
- Set `Editor: Default Formatter` to Prettier
- (Optional) Enable `Editor: Format On Save`
