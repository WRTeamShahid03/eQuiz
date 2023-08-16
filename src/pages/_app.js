// ** Next Imports
import Head from 'next/head'

// ** Store Imports
import { Provider } from 'react-redux'
import { store } from 'src/store/store'
import Layout from 'src/@core/components/layout/layout';

// CSS File Here
import "antd/dist/antd.min.css";
import "../assets/css/fonts/fonts.css";
import "../assets/css/vendor/animate.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import 'react-tooltip/dist/react-tooltip.css'
import "../assets/css/bootstrap.min.css";
import "../assets/scss/style.scss";
import axios from 'axios';

// ** Configure JSS & ClassName
const App = ({Component,pageProps,data}) => {
  return (
    <Provider store={store}>
        <Head>
          <title>{`Elite Quiz is a Web Quiz Application`}</title>
          <meta
            name='description'
            content={`${data && data.meta_description}`}
          />
          <meta name='keywords' content={`${data && data.meta_keywords}`} />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <link rel='shortcut icon' href={`${data && data.favicon}`} />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </Provider>
  )
}

export default App

// getServerSideProps to fetch data and pass as props to CustomDocument
App.getInitialProps = async () => {
  let data = {};
  try {
    const requestOptions = {
      access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };
    let response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "get_web_settings", requestOptions);
    data = response.data.data;
  } catch (error) {
    console.log(error);
  }
  return { data };
};



