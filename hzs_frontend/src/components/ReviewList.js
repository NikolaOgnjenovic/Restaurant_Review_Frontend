import Review from "./Review.js";

const reviews = [
    {
      id: 1,
      title: 'recenzija 1',
      description: 'opis recenzije ksjafghkjhsdgfkhjksdjhfg sg jsdfg kjs gfkjs gfkjsfgk\n ashdklashdklfhsadklfh klashdfl\n lol\n okay\n\n\n ashdflkhs kljash dflkahjsdfklhaslkdjfh iuqweri oqwheksajdfh klasd f skdfh klqweyr iouwyqer ksajdhf klqwyerioksahfd',
      likes: 3,
      dislikes: 2,
      foodCost: 50,
      userId: 123,
      likedBy: ['user1', 'user2', 'user3'],
      dislikedBy: ['user4', 'user5'],
      placeId: 60,
    },
    {
      id: 2,
      title: 'recenzija 2',
      description: 'opis recenzije ksjafghkjhsdgfkhjksdjhfg sg jsdfg kjs gfkjs gfkjsfgk\n ashdklashdklfhsadklfh klashdfl\n lol\n okay\n\n\n ashdflkhs kljash dflkahjsdfklhaslkdjfh iuqweri oqwheksajdfh klasd f skdfh klqweyr iouwyqer ksajdhf klqwyerioksahfd',
      likes: 3,
      dislikes: 2,
      foodCost: 50,
      userId: 123,
      likedBy: ['user1', 'user2', 'user3'],
      dislikedBy: ['user4', 'user5'],
      placeId: 60,
    },
    {
      id: 4,
      title: 'recenzija 4',
      description: 'opis recenzije ksjafghkjhsdgfkhjksdjhfg sg jsdfg kjs gfkjs gfkjsfgk\n ashdklashdklfhsadklfh klashdfl\n lol\n okay\n\n\n ashdflkhs kljash dflkahjsdfklhaslkdjfh iuqweri oqwheksajdfh klasd f skdfh klqweyr iouwyqer ksajdhf klqwyerioksahfd',
      likes: 3,
      dislikes: 2,
      foodCost: 50,
      userId: 123,
      likedBy: ['user1', 'user2', 'user3'],
      dislikedBy: ['user4', 'user5'],
      placeId: 60,
    },
    {
      id: 5,
      title: 'recenzija 5',
      description: 'opis recenzije ksjafghkjhsdgfkhjksdjhfg sg jsdfg kjs gfkjs gfkjsfgk\n ashdklashdklfhsadklfh klashdfl\n lol\n okay\n\n\n ashdflkhs kljash dflkahjsdfklhaslkdjfh iuqweri oqwheksajdfh klasd f skdfh klqweyr iouwyqer ksajdhf klqwyerioksahfd',
      likes: 3,
      dislikes: 2,
      foodCost: 50,
      userId: 123,
      likedBy: ['user1', 'user2', 'user3'],
      dislikedBy: ['user4', 'user5'],
      placeId: 60,
    },
  ]

const ReviewList = () => {
    return(
        <>
        {reviews.map((listItem) => (<Review item={listItem}/>))}
        </>
    )
}

export default ReviewList;