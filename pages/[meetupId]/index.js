import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb"; // mongo db deals with the collection id as an object, so we have to use the mongo ObjectId method when comparing our id to mongo's
import { Fragment } from "react";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        // image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
        // title="A First Meetup"
        // address="Some Street 5, Some City"
        // description="The meetup description"
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
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
  const client = await MongoClient.connect(
    "mongodb+srv://marcmedhat6211:marcmedhatdev@cluster0.rbkde.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  /**
   * you can define a criteria to the find method if you want to filter somehow
   * the second argument is an object defining the fields i want to return
   * so here we're only fetching the ids
   */
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close(); // not required but recommended

  return {
    /**
     * There are 3 options for fallback here
     * true, false, and blocking
     *    false: means that you don't have any other paths you want to add (ids, or slugs)
     *    true: there are other paths that will be pre rendered dynamically on demand (the server will render a blank page to the user until the data is fetched and the page is rendered)
     *    blocking: there are other paths that will be pre rendered dynamically on demand (the server won't render anything to the user untill the page is pre rendered on the server successfully, a case that can be handled)
     */
    fallback: "blocking",
    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
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
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://marcmedhat6211:marcmedhatdev@cluster0.rbkde.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    // props: {
    //   meetupData: {
    //     id: meetupId,
    //     image:
    //       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    //     title: "A First Meetup",
    //     address: "Some Street 5, Some City",
    //     description: "The meetup description",
    //   },
    // },

    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
