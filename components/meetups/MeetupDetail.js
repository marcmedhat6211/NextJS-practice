import classes from "./MeetupDetail.module.css";

/**
 * We can put the css file in the page directory but it is more clean to put it in a component and attach the css file along with it
 */
const MeetupDetail = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      {/* address is an html5 element */}
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
