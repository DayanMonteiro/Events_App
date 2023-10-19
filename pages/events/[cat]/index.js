import Image from "next/image";
import Link from "next/link";

/* eslint-disable @next/next/no-typos */
const EventsCatPage = ({ data, pageName }) => {
  const correctionInPageName = () => {
    return pageName
      .split("-")
      .map((pageName) => capitalizeFirstLetter(pageName))
      .join(" ");
  };

  function capitalizeFirstLetter(pageName) {
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  }

  const formattedString = correctionInPageName(pageName);

  return (
    <div>
      <h1>Events in {formattedString}</h1>
      <div>
        {data.map((ev) => (
          <Link
            key={ev?.id}
            href={`/events/${ev?.city}/${ev?.id}`}
            passHref={true}
          >
            <a>
              <Image src={ev?.image} alt={ev?.title} width={300} height={300} />
              <h2>{ev?.title}</h2>
              <p>{ev?.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");

  const data = allEvents.filter((ev) => ev.city === id);

  return { props: { data, pageName: id } };
}
