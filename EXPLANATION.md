# Developer Notes

## Notes

- While developing, I decided to create component as close as possible to where
  it needed.

- For example, input and pagination component could be extracted to separate
  `component` folder. But since right now only 1 page that using those
  components, it's still inside `app` folder.

- Separate which one should be Client Component, which one could be Server
  Component. (Client component with `.client.tsx`)

## Page

This project contains 2 pages (so far): Anime list and anime detail page

### Anime List

- Fetch first 24 anime list
- Responsive view that display anime image and title

### Anime Detail

- Show information such as image, title, synopsis, genre, status, etc
- If the anime has episodes, it will show each episodes (title and image)

### Things that could be improved

- CSS naming could be better
- Add more page (genres, watch)
- Similar anime on detail page (sadly fields relations doesn't return image url)
- Show latest anime on page list
- Bookmark anime
