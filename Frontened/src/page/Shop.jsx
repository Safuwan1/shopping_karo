import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offer from '../components/Offer/Offer'
import NewCollection from '../components/NewCollections/NewCollection'
import NewsLetter from '../components/NewsLetter/NewsLetter'
export default function Shop() {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offer/>
      <NewCollection/>
      <NewsLetter/>
    </div>
  )
}
