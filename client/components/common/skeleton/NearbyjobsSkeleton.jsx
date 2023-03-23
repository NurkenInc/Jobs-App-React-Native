import React from 'react'
import { View, Dimensions } from 'react-native'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

import styles from './nearbyjobsskeleton.style'

const NearbyJobCardSkeleton = ({ cardWidth }) => {
  return (
    <ContentLoader 
      speed={1}
      width={cardWidth - 50}
      height={50}
      viewBox={`0 0 ${cardWidth} 50`}
      backgroundColor="#f3f3f3"
      foregroundColor="#df2a2a"
    >
      <Rect x="48" y="8" rx="3" ry="3" width={cardWidth  - 50} height="6" /> 
      <Rect x="48" y="26" rx="3" ry="3" width={cardWidth - 50} height="6" /> 
      <Circle cx="20" cy="20" r="20" />
    </ContentLoader>
  )
}

const NearbyjobsSkeleton = ({ count = 15 }) => {
  const cardWidth = Dimensions.get('window').width
  
  const nearbyJobCardSkeletons = Array.from({ length: count }, (_, index) => (
    <React.Fragment key={index}>
      <NearbyJobCardSkeleton cardWidth={cardWidth} />
    </React.Fragment>
  ))
  
  return (
    <View style={styles.container}>
      {nearbyJobCardSkeletons}
    </View>
  )
}

export default NearbyjobsSkeleton