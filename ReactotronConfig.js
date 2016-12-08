import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'

Reactotron
  .configure() // we can use plugins here -- more on this later
  .use(trackGlobalErrors())
  .connect() // let's connect!