import { useState } from "react";
import Person from "./components/person.js";
import Bookmarks from "./components/bookmarks.js";
import "./App.css";
import useContentful from "./hooks/use-contentful";

const query = `
query($isPreview: Boolean=false) {
  # published person
  person(id: "4Trg2gpZmZrEM0WACn9mdL") {
		...personFields
  }
  
  # preview person
  personPreview: person(id: "4Trg2gpZmZrEM0WACn9mdL", preview: $isPreview) @include(if: $isPreview) {
		...personFields
  }
  
	allBookmarks: bookmarkCollection {
  	items {
  		...bookmarkFields
  	}
	}
  
  favoriteTagCollection: tagCollection(where: {
    title_contains: "favorite"
  }, limit: 1) {
    items {
      title
      linkedFrom {
        bookmarkCollection {
          items {
            ...bookmarkFields
          }
        }
      }
    }
  }
}

fragment bookmarkFields on Bookmark {
  sys {
    id
  }
  title
  url
  comment
  tagsCollection (limit: 10) {
    items {
      title
    }
  }
}

fragment personFields on Person {
  name
  dateOfBirth
  socialTwitter
  socialGithub
  socialLinkedin
	bio {
    json
  }
  image {
    title
    url 
  }
}
`;

// const IS_PREVIEW = false;

// const query = `
// query {
//   person(id: "4Trg2gpZmZrEM0WACn9mdL") {
//     name
//     bio {
//       json
//     }
//     socialTwitter
//     socialGithub
//     socialLinkedin
//     image {
//       title
//       url
//     }
//   }
// bookmarkCollection {
//     items {
//       sys {
//         id
//       }
//       title
//       url
//       comment
//       tagsCollection {
//         items {
//           title
//         }
//       }
//     }
//   }

// }
// `;

function App() {
  let [isPreview, setIsPreview] = useState(false);
  // let { data, errors } = useContentful(query, IS_PREVIEW);
  let { data, errors } = useContentful(query, isPreview);

  if (errors)
    return (
      <span style={{ color: "red" }}>
        {errors.map((error) => error.message).join(",")}
      </span>
    );
  if (!data) return <span>Loading...</span>;

  // console.log(data.person.name);

  const { person, personPreview, allBookmarks, favoriteTagCollection } = data;
  const favoriteTag = favoriteTagCollection.items[0];

  return (
    <div className='sm:text-center'>
      <div className='p-1'>
        <label>
          <input
            type='checkbox'
            className='mr-2'
            checked={isPreview}
            onChange={() => setIsPreview(!isPreview)}
          />
          Show preview
        </label>
      </div>
      <div className='relative'>
        {personPreview ? <Person person={personPreview} /> : ""}
        {personPreview ? "" : <Person person={person} />}
      </div>

      <br />
      <Bookmarks
        bookmarks={favoriteTag.linkedFrom.bookmarkCollection.items}
        headline='My Favorite Bookmarks'
      />
      <Bookmarks bookmarks={allBookmarks.items} headline='All My Bookmarks' />
    </div>
  );
}

export default App;
