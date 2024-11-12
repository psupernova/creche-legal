import React from 'react';
import { Helmet } from 'react-helmet-async';
import SearchSection from '../components/SearchSection';
import FeaturedCities from '../components/FeaturedCities';
import ProductSection from '../components/ProductSection';
import BlogSection from '../components/BlogSection';
import FaqSection from '../components/FaqSection';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Creche Legal de Cachorro - Encontre a melhor creche para seu pet</title>
        <meta name="description" content="Encontre as melhores creches para cachorro perto de você. Compare avaliações, preços e serviços." />
      </Helmet>

      <main className="flex-1">
        <SearchSection />
        <div className="container">
          <FeaturedCities />
          <ProductSection />
          <BlogSection />
          <FaqSection />
        </div>
      </main>
    </>
  );
}

export default HomePage;