import type {StructureResolver} from 'sanity/structure'


export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Authors list item (keeping your existing one)
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(
          S.documentList()
            .title('Authors')
            .filter('_type == "author"')
        ),
      // New Startups list item
      S.listItem()
        .title('Startups')
        .schemaType('startup')
        .child(
          S.documentList()
            .title('Startups')
            .filter('_type == "startup"')
            // Optional: Sort by title
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        )
    ])