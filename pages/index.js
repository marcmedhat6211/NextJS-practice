// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

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
  return <MeetupList meetups={props.meetups} />;
};

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
 */
export const getStaticProps = async () => {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};

export default HomePage;
