import logo from "./logo.svg";
import Person from "./components/person.js";
import Bookmarks from "./components/bookmarks.js";
import "./App.css";
import useContentful from "./hooks/use-contentful";

const query = `
query {
  person(id: "4Trg2gpZmZrEM0WACn9mdL") {
    name
    bio {
      json
    }
    socialTwitter
    socialGithub
    socialLinkedin
    image {
      title
      url
    }
  }
bookmarkCollection {
    items {
      sys {
        id
      }
      title
      url
      comment
      tagsCollection {
        items {
          title
        }
      }
    }
  }
  
}
`;

function App() {
  let { data, errors } = useContentful(query);

  if (errors)
    return (
      <span style={{ color: "red" }}>
        {errors.map((error) => error.message).join(",")}
      </span>
    );
  if (!data) return <span>Loading...</span>;

  // console.log(data.person.name);

  const { person, bookmarkCollection } = data;

  return (
    <div className='App'>
      <Person person={person} />
      <br />
      <Bookmarks bookmarks={bookmarkCollection.items} headline='My Bookmarks' />
    </div>
  );
}

export default App;
