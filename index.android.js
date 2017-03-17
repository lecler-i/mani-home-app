/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'

const instructions = 'Shake or press menu butto'

function Root() {
  return (
    <App instructions={instructions} />
  )
}

AppRegistry.registerComponent('ushiftapp', () => Root)
