import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image = "https://impactlink.demo/og-image.jpg" }) => {
  const siteTitle = "ImpactLink - Make an Impact Today";
  const fullTitle = title ? `${title} | ImpactLink` : siteTitle;
  const defaultDesc = "ImpactLink is a crowdfunding platform connecting passionate creators with supporters. Discover impactful campaigns or start your own today.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
