## Create a SPA using with CountryAPI - Remix - Typescript

- Files

## index.tsx

This file is the entry point of my application. It uses Apollo Client's **useQuery** hook to fetch data from a GraphQL server. The GraphQL query, defined using the gql template literal, fetches information about a specific country with the code "BR." The data is then displayed on the screen.

**_COUNTRIES_QUERY:_** The GraphQL query for fetching country data.

Index(): The main React component that fetches and displays the country data. It handles loading and error states using the useQuery hook.

## client.tsx

This file contains the **client-side** code for my application. It sets up Apollo Client, fetches data from a GraphQL server, and displays a list of countries. It also includes filtering and grouping functionality based on user input.

COUNTRIES_QUERY: The GraphQL query for fetching a list of countries.

applyFilterAndGroup(): A function for filtering and grouping country data based on user input.

Client(): The main React component that fetches and displays the list of countries. It handles loading, error states, filtering, and grouping.

client: An instance of Apollo Client configured to connect to the GraphQL server.

## server.tsx

This file is responsible for server-side rendering (SSR) using Remix. It renders the initial HTML markup for the application when a request is made to the server.

handleRequest(): The server request handler function that renders the initial HTML markup using Remix Server.
Getting Started
Provide instructions on how to run and set up your project locally. Include any prerequisites, installation steps, and configuration if necessary.

Usage
Explain how to use my application, including any features or functionality. Provide examples if applicable.

Dependencies
List the main dependencies and versions used in my project. You can generate a package.json file with npm list or yarn list to get this information.

License
Specify the license under which my project is released.

Contributing
Explain how others can contribute to my project, including information on how to report issues or submit pull requests.

Authors
List the authors or contributors to my project.

Acknowledgments
Include any acknowledgments or credits for third-party libraries, tools, or resources used in my project.

Feel free to customize the sections and content based on the specifics of my project. Providing clear documentation in my README.md helps other developers understand your project and get started with it.
