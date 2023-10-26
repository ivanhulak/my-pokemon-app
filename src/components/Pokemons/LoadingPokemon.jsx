import React from "react"
import ContentLoader from "react-content-loader"

export const LoadingPokemon = (props) => (
  <ContentLoader 
    speed={2}
    width={700}
    height={800}
    viewBox="0 0 700 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#c3c8ee"
    {...props}
  >
    <rect x="5" y="35" rx="10" ry="10" width="250" height="57" /> 
    <rect x="6" y="116" rx="30" ry="30" width="564" height="559" /> 
    <rect x="7" y="715" rx="15" ry="15" width="251" height="86" /> 
    <rect x="312" y="716" rx="15" ry="15" width="253" height="85" /> 
    <rect x="466" y="43" rx="10" ry="10" width="96" height="36" />
  </ContentLoader>
)