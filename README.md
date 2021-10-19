# React-OMDB

An application to search movies/series in The Open Movie Database that save search history and suggest names based on entered keywords.

Onlive Version: [React-OMDB](https://bit.ly/3mYGFzH)

## Features

- Search results suggestion
- Save search history with timestamps
- Delete a history / clear all histories
- Responsive to the changes of the viewport

### HTML5

- Image alt and title, meta title and meta description tags are provided for on-page SEO matters.
- Semantic html5 tags such as header, footer, main, section, figure, time and … are used in their proper places.
- HTML5 form validation is used such as required and min-length attributes.

### CSS3

- CSS modules, a great tool that React.js provides, are used to prevent class name interference.
- The whole elements are responsive to the changes of the viewport and root font size.
- All classes are in pure CSS, using complex solutions such as pseudo-selectors, transition animations and …
- BEM methodology is used for naming classes because it makes code cleaner and easy to read and maintain.

### JavaScript

- [React.js](https://reactjs.org/) is used as the main frontend library because it is easy to handle complex states and is maintainable.
- Search component will call the API after entering a minimum of 3 characters, and calling the API is debounced while user types not to stress the API.
- Along with UI-related components, 3 main components are provided, which are responsible for handling user input, displaying search history, and showing search results.
- Some complex functions and hooks are used; however, comments are provided where it is necessary.

### Overall Structure

- Hooks, utility functions and components are provided separately, and each component has its styling modules.
- The typical structure convention is used while the application is created with the [Create-React-App package](https://create-react-app.dev/).

### Accessibility

- All elements are responsive and change if the user changes its browser's default font size.
- Best practices are used to create the main form, label and input for keyboard-only, non-sighted users or users who disable styles.
- The primary form input is focused when the page is rendered.
- Keyword input has feedbacks while it is focused and proper label and placeholder to help users.
- After typing, the results are organized to easily navigate with assistive technology, like screen readers and keyboards.
- If a search could not be resolved, feedback (both in visual and text) is sent to the user in different situations. When the user enters a short-length keyword, the search has no results or communicating with API has issues.
- To navigate with a screen reader, the page has a hierarchy of elements and section headings.
- All images have alt and title tags so screen readers can easily access and read tags.
- All selectable elements have on-focus styling, which means that they respond on the selection with keyboard.
- All results have their own tab index, so the tab key is working correctly.
- Enter and Escape keys are defined to work correctly while typing or selecting a specific result.

## Tools and Technologies

### Backend

- [The OMDb API](http://www.omdbapi.com/)

### Frontend

- React.js
- Font Awesome
- CSS Modules
- Axios

## Usage

### Env Variables

Create a .env file in then root and add the following

```
REACT_APP_OMBDB_API_KEY = YOUR_KEY

```

### Install Dependencies

```
npm install
```

### Run

```
npm start
```

## Build & Deploy

```
npm run build
```

## License

The MIT License
Copyright (c) 2021 Pooyadhgh
