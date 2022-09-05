import { Helmet } from 'react-helmet';

import placeholder from '@/app/assets/images/placeholder.png';

function Head() {
  return (
    <Helmet>
      <title>Noshit</title>
      <meta name={'description'} content={'Noshit application'} />
      <meta property={'og:title'} content={'Noshit'} />
      <meta property={'og:description'} content={'Noshit application'} />
      <meta property={'og:image'} content={placeholder} />
    </Helmet>
  );
}

export default Head;
