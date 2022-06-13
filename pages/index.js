import { useEffect, useState } from "react";
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

const HomePage = () => {
  /**
   * Using the regular useEffect approach to fetch daa on page load will cause a problem with NextJS and the ssr feature
   * because the useEffect hook function runs AFTER the component is rendered
   * So typically what happens is that NextJS prerenders the page on the server and send back the html page
   * but that html page does not include the list rendered in the useEffect hook because it ran after the component was evaluated
   */
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    //send a http request and fetch data
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
};

export default HomePage;
