import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import ContentLoader, { Facebook, Rect, Circle, Path } from 'react-content-loader/native'

const NearbyJobCardSkeleton = ({ cardWidth }) => {
  return (
    <ContentLoader 
      speed={1}
      width={cardWidth}
      height={124}
      viewBox={`0 0 476 124`}
      backgroundColor="#f3f3f3"
      foregroundColor="#df2a2a"
    >
      <Rect x="48" y="8" rx="3" ry="3" width={cardWidth} height="6" /> 
      <Rect x="48" y="26" rx="3" ry="3" width={cardWidth} height="6" /> 
      <Circle cx="20" cy="20" r="20" />
    </ContentLoader>
  )
}

const NearbyjobsSkeleton = ({ count = 10 }) => {
  const cardWidth = Dimensions.get('window').width
  
  const nearbyJobCardSkeletons = Array.from({ length: count }, (_, index) => (
    <React.Fragment key={index}>
      <NearbyJobCardSkeleton cardWidth={cardWidth} />
    </React.Fragment>
  ))
  
  return (
    <View>
      {nearbyJobCardSkeletons}
    </View>
  )
}

export default NearbyjobsSkeleton