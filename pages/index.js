// import { useEffect, useState } from "react";
import Head from "next/head"; // the head component allows you to add head tags to your page

import { MongoClient } from "mongodb"; // this import will never be a part of the client, this is something that NextJS does, it will never expose this import as it's not for the client to see!

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Secons Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10, 12345 Some City",
    description: "This is a second meetup!",
  },
];

const HomePage = (props) => {
  /**
   * Using the regular useEffect approach to fetch daa on page load will cause a problem with NextJS and the ssr feature
   * because the useEffect hook function runs AFTER the component is rendered
   * So typically what happens is that NextJS prerenders the page on the server and send back the html page
   * but that html page does not include the list rendered in the useEffect hook because it ran after the component was evaluated
   */
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   //send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  // return <MeetupList meetups={loadedMeetups} />;

  /**
   * After using the getStaticProps method, we now do not need the useEffect nor the state because our data is ready and sent through the props object
   */
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

/**
 * This method unlike the getStaticProps method runs on every request
 * no need to return the revalidate property along with the returned object because simply it automatically runs on every incoming request
 * it receives a context param
 * this context param holds the request and the response from the server
 * you can perform actions (secured actions) on request and response because this method is secured, it only runs on the server
 * only use it in 2 cases
 *    if your data is changed every second or frequently
 *    if you need access to that incoming request (for authentication for example)
 * Other than that, getStaticProps is better to use and is FASTER
 */
// export const getServerSideProps = (context) => {
//   req = context.req;
//   res = context.res;
//   // fetch an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

/**
 * This method is only allowed in the "pages" firectory, in other words, in a "page" component
 * The method has to be named "getStaticProps" -> reserved name
 * This method allows NextJS pre render the fetched data and includes it in the html file on the server
 * This method is called BEFORE the component method (in this case the HomePage method)
 * This approach is called "Static Generation"
 * This method is allowed to be asynchronous
 * This code is always executed during the build process
 *
 * Always returns an object
 * That object has to have a key named props (the props that component will receive as an argument)
 *
 * How it Works?
 *    It waits until your data is loaded, and then it returns the props that is then used in the rendered component
 *
 * A major problem with the getStaticProps method, is that it runs during the build process
 * What that means is that if there are changed data on the database, we will know nothing about it, "we have to run 'npm run build' again and deploy again in order for us to render the new data"
 * The Solutions for that is another key in the object that the getStaticProps method returns
 * That key is named "revalidate"
 *    When we add the revalidate property we unlock a feture called "Incremental Static Generation"
 *    The value of the revalidate key is an integer representing the number of seconds NextJS will wait to regenerate this page for an icoming request
 *    This means that with this number given, this page will not only be generated during the build process but it will also be generated every n seconds on the server if there are requests
 */
export const getStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://marcmedhat6211:marcmedhatdev@cluster0.rbkde.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray(); // the .find() will return all records

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
