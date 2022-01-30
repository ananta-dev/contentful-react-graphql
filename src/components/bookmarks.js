function Bookmarks({ bookmarks, headline }) {
  bookmarks.map((bookmark) => console.log(bookmark.sys.id));

  return (
    <div>
      <h2 className='text-2xl font-bold tracking-tight text-gray-600 dark:text-white'>
        {headline}
      </h2>
      <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3'>
        {bookmarks.map((bookmark, index) => (
          <div
            key={index}
            className='w-full max-w-sm px-4 py-3 mx-auto bg-white rounded-md
            shadow-md dark:bg-gray-800'
          >
            <div>
              <h1 className='overflow-hidden truncate mt-2 text-lg font-semibold text-gray-800 dark:text-white'>
                {bookmark.title}
              </h1>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                {bookmark.comment}
              </p>
            </div>
            <div>
              <div className='content-center text-center items-center mt-4 text-gray-700 dark:text-gray-200'>
                <a
                  className='overflow-hidden content-center truncate text-center text-ellipsis text-blue-600 cursor-pointer dark:text-blue-400 hover:underline'
                  href={bookmark.url}
                >
                  Visit
                </a>
              </div>

              <div className='flex justify-end space-x-2 mt-4'>
                {bookmark.tagsCollection.items.map((tag) => (
                  <div className='flex items-center justify-between'>
                    <span className='px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900'>
                      {tag.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;
