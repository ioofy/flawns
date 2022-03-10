import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import settings from "./settings/settings";

const SEO = (props: any) => {
  const { title, description, image } = props;

  return (
    <Head>
      <link rel="icon" href="/logo.png" />
      <title>{title} - Flawnn 👩‍🎤👨‍🎤</title>
      <meta
        name="description"
        content={description}
        key="Flawn, Flawn.dev, social media app, media, ui"
        property="og:description"
      />
      <meta itemProp="name" content={title} />
      <meta itemProp="image" content={image} />
      <meta
        name="twitter:title"
        content="Flawn 👨‍🎤 | Create your stories, and share them into the world"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="twitter:description"
        content="Flawn 👨‍🎤 is a social media platforms apps for creator,
        developer, and more."
      />
    </Head>
  );
};

SEO.defaultProps = {
  title: settings && settings.meta && settings.meta.title,
  description: settings && settings.meta && settings.meta.description,
  image:
    settings &&
    settings.meta &&
    settings.meta.social &&
    settings.meta.social.graphic,
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
