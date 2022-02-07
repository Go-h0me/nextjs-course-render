import { MongoClient } from 'mongodb'
import Head from 'next/head';
import { Fragment } from 'react';
// import { useEffect, useState } from 'react'
import Meetuplist from '../components/meetups/MeetupList'



function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);


  return (
    <Fragment>

    <Head>
      <title>React Meetups</title>
      <meta
      name='description'
      content='Browse a huge ist of highly active React meetups!'
      />
    </Head>
    <Meetuplist meetups={props.meetups} />
    </Fragment>
  )
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;


//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },

//   }
// }


export async function getStaticProps() {
  // fetch('api/meetups');
  //fetch data from an API

  const client = await MongoClient.connect('mongodb+srv://Gohome:MZ4QlSIMv5tCzqjY@cluster0.n5txx.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');


 const meetups = await meetupsCollection.find().toArray();

client.close();
  return {
    props:{
      meetups:meetups.map(meetup => ({
        title:meetup.title,
        address: meetup.address,
        image: meetup.image,
        id:meetup._id.toString(),

      }))
    },
    revalidate: 1
  }
}

export default HomePage
