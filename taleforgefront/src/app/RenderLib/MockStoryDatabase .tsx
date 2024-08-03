// File: mockStoryDatabase.ts (place this in the same directory as your pages)

const mockStoryDatabase = [
  {
    id: 1,
    title: "The Enchanted Forest",
    coverImage: "/images/enchanted-forest-cover.jpg",
    pages: [
      {
        page: 1,
        story: "Once upon a time, in a lush green forest, there lived a curious young fox named Rusty. One day, he discovered a glowing mushroom that whispered secrets of the forest.",
        imageURL: "/images/enchanted-forest-page1.jpg"
      },
      {
        page: 2,
        story: "Rusty decided to touch the mushroom. Suddenly, the forest around him began to shimmer and change. The trees whispered ancient stories, and the flowers danced with vibrant colors.",
        imageURL: "/images/enchanted-forest-page2.jpg"
      },
      {
        page: 3,
        story: "As Rusty explored further, he encountered magical creatures hidden among the trees. Fairies fluttered by, leaving trails of sparkling dust, and wise old owls shared forgotten legends.",
        imageURL: "/images/enchanted-forest-page3.jpg"
      }
    ]
  },
  // Add more books as needed
];

export default mockStoryDatabase;