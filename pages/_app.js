/**
 * This file is very important
 * This is your root component
 */
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

/**
 * This is the root component NextJS will render
 * It receives props and used Object Destructuring
 * Compononet is a prop that holds all the actual page content that should be rendered (so it will be different whenever we switch a page)
 * pageProps are specific props our page might be getting
 */
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
