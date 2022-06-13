import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      title="A First Meetup"
      address="Some Street 5, Some City"
      description="The meetup description"
    />
  );
};

/**
 * This method is used when you are in a dynamic page AND using the getStaticProps method
 * This method's role is to define all the dynamic page's identifiers to pre render them all on the server during the build process
 * This method returns an object which holds an array of paths which will be pre rendered on the server, and every path has a params key which holds all the values that this dynamic page can have
 * The fallback property is false when you are defining all your routes
 * The fallback property is true when you are not defining all your routes, it will try to generate a key for this meetupId dynamically on the server for the incoming request
 * The fallback feature is a nice feature that allows you to pre generate all the pages that you know that will be visited more frequently and let it generate dynamically the rest of the pages for any upcoming request
 */
export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
};

/**
 * In this method you will need the identifier of that meetup to pass it to the api to get the object you need
 * The problem is that we used to get that parameter using the useRouter hook
 * But hooks can't be used outside of the component functions
 * The solution for this problem is the context param that this method receives
 * The context param holds for example the value for that "meetupId" -> and it's called meetupId because that's how we named the file between the square brackets
 */
export const getStaticProps = async (context) => {
  // fetch single meetup from some api

  meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        title: "A First Meetup",
        address: "Some Street 5, Some City",
        description: "The meetup description",
      },
    },
  };
};

export default MeetupDetails;
