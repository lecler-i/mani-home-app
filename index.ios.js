/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'

const instructions = 'Press Cmd+R to reload,\nCmd+D or shake for dev menu'

function Root() {
  return (
    <App instructions={instructions} />
  )
}

AppRegistry.registerComponent('ushiftapp', () => Root)
