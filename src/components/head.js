import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image, article, keywords, author }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
            author
            keywords
            language
          }
        }
      }
    `,
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    author: defaultAuthor,
    keywords: defaultKeywords,
    language,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    author: author || defaultAuthor,
    keywords: keywords || defaultKeywords,
  };

  // Enhanced structured data for South African market - Security & Web Development Focus
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abo Baloyi',
    url: siteUrl,
    image: seo.image,
    jobTitle: 'IT Engineer, Penetration Tester & Security Consultant',
    description: seo.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Johannesburg',
      addressRegion: 'Gauteng',
      addressCountry: 'ZA',
    },
    nationality: {
      '@type': 'Country',
      name: 'South Africa',
    },
    knowsAbout: [
      'Penetration Testing',
      'Ethical Hacking',
      'Web Application Security',
      'Vulnerability Assessment',
      'Cybersecurity',
      'OWASP Top 10',
      'Security Auditing',
      'Web Development',
      'Full Stack Development',
      'React',
      'Node.js',
      'Python',
      'Secure Coding',
      'Cloud Security',
      'AWS',
      'IT Engineering',
      'Systems Engineering',
      'Network Security',
      'IT Infrastructure',
    ],
    sameAs: [
      'https://github.com/ABOBALOYI',
      'https://linkedin.com/in/abobaloyi',
      'https://twitter.com/abobaloyi',
    ],
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Abo Baloyi - Penetration Testing & Security Consulting',
    description: seo.description,
    url: siteUrl,
    image: seo.image,
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    serviceType: [
      'Penetration Testing',
      'Web Application Security Testing',
      'Vulnerability Assessment',
      'Security Auditing',
      'Ethical Hacking',
      'Cybersecurity Consulting',
      'Web Development',
      'Full Stack Development',
      'Secure Web Applications',
      'Security Code Review',
      'OWASP Testing',
      'Cloud Security',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Johannesburg',
      addressRegion: 'Gauteng',
      addressCountry: 'ZA',
    },
  };

  const schemaOrgJSONLD = article
    ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seo.title,
      description: seo.description,
      url: seo.url,
      image: seo.image,
      author: {
        '@type': 'Person',
        name: seo.author,
      },
      publisher: {
        '@type': 'Person',
        name: seo.author,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': seo.url,
      },
    }
    : {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: seo.title,
      description: seo.description,
      url: seo.url,
      image: seo.image,
    };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang={language} />

      {/* Basic Meta Tags */}
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      <meta name="image" content={seo.image} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#0a192f" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content="en_ZA" />

      {/* Geographic Meta Tags for South African Market */}
      <meta name="geo.region" content="ZA-GP" />
      <meta name="geo.placename" content="Johannesburg" />
      <meta name="geo.position" content="-26.2041;28.0473" />
      <meta name="ICBM" content="-26.2041, 28.0473" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.title} />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="320" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Professional Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Calibre:wght@300;400;500;600;700&family=SF+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Structured Data - Multiple schemas for better SEO */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(professionalServiceSchema)}</script>

      {/* Google Site Verification */}
      <meta name="google-site-verification" content="WgQkzJRZcJoWihY0r0dWtWsvIqFJFmEciSwM-Iy5nkQ" />
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
  keywords: PropTypes.string,
  author: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
  keywords: null,
  author: null,
};
