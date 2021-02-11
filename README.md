## Instructions

1. `npm install`
2. `npm start`
3. Navigate to `http://localhost:3000`

Some notes on things that can be improved and other considerations:

- Haven't had much time to add too many tests, otherwise would aim for better coverage
- Opted for `redux-toolkit` because it allows me to stick to a more functional approach but also because I wanted to give it a try
  - it uses ImmerJS so changes to the state would automatically generate safe copies (and it's less overhead than ImmutableJS or my initial basic approach of destructuring and reassigning `[...board]`, plus it comes included with the 'toolkit')
  - I would improve the selectors
- `styled-componets` usage got a bit complex for certain dynamic scenarios. Adding and removing classes would have been more performant.
  - opted ot keep the styled components in the same file as the react component. This works for this exercise but isn't great for reusability.
