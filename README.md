## Instructions

1. `npm install`
2. `npm start`
3. Navigate to `http://localhost:3000`

Some notes on things that can be improved and other considerations:

- Haven't had much time to add too many tests, otherwise would aim for better coverage
  - some things, like styled components that have conditions inside them I would test with snapshots
  - since there's no master-class that tracks the state of the game, testing is a bit easier (less setup)
  - mocking state with redux is also very straight forward for components
  - would use react-testing-library
- Opted for `redux-toolkit` because it allows me to stick to a more functional approach but also because I wanted to give it a shot
  - it uses ImmerJS so changes to the state would automatically generate safe copies (and it's less overhead than ImmutableJS or my initial basic approach of destructuring and reassigning `[...board]`, plus it comes included with the 'toolkit')
  - typescript support is very very good for how dynamic it is
  - I would improve the selectors
- `styled-componets` usage got a bit complex for certain dynamic scenarios. Adding and removing classes would have been more performant.
  - opted ot keep the styled components in the same file as the react component. This works for this exercise but isn't great for reusability.
